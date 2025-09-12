import {OrangeLink} from "s/components/links/OrangeLink/OrangeLink.js";

const mapConfig = {
    center: [59.939, 30.315],
    zoom: 12,
    controls: ['zoomControl', 'fullscreenControl'],
}

export function initMap(objects) {
    const mapContainer = document.getElementById('map');

    // errors
    if (!mapContainer) {
        console.error("Элемент с ID 'map' не найден. Невозможно инициализировать карту.");
    }
    if (!objects || objects.length === 0) {
        console.warn("Список объектов пуст или не найден. Объекты не будут загружены");
    }

    // init
    const map = new ymaps.Map(mapContainer, {
        center: mapConfig.center,
        zoom: mapConfig.zoom,
        controls: mapConfig.controls,
    })

    // objects
    if (objects && objects.length > 0) {
        objects.forEach(object => {addPlacemark(object, map)})
    }

    return map;
}

function addPlacemark (object, map) {

    // Кастомные модели
    const customPlacemarkLayout = ymaps.templateLayoutFactory.createClass(`
        <div class="custom-placemark">
            <div class="custom-placemark__image-container">
                <img src="{{ properties.iconSrc }}" class="custom-placemark__image" alt="placemark-icon">
            </div>
            
            <div class="custom-placemark__content">
                <h4 class="custom-placemark__title">{{ properties.title }}</h4>
            </div>
            
            <div class="custom-placemark__balloon" style="display: none;">
                <div class="custom-placemark__balloon-content">
                    {{ properties.balloonContent }}
                </div>
            </div>
        </div>
    `);

    const customBalloonLayout = ymaps.templateLayoutFactory.createClass(`
         <div class="custom-balloon">
            <div class="custom-balloon__content">
                 <div class="custom-balloon__header">
                    <h2 class="cb-header__title">{{ properties.title }}</h2>
                    <p class="cb-header__type">Баскетбольная площадка</p>
                 </div>
                 <div class="custom-balloon__body">
                    {% if properties.balloonContentBody.address %}
                    <h4 class="cb-body__title">{{ properties.balloonContentBody.address }}</h4>
                    <ul class="cb-body__metro-list">
                        {% for station in properties.balloonContentBody.metroStations %}
                            <li class="cb-body-metro-list__item">
                                <i class="metro-icon"></i>
                                {{ station.name }}
                            </li>
                        {% endfor %}
                    </ul>
                    {% else %}
                        <h4 class="cb-body__title">Рядом нет станций метро</h4>
                    {% endif %}
                 </div>
                 <div class="custom-balloon__footer">
                    ${OrangeLink({title: "Как добраться", href: "https://yandex.ru/maps/?rtext=~" + `{{ properties.latitude }}` + "," + `{{ properties.longitude }}` })}
                 </div>
            </div>
            <div class="custom-balloon__close" id="closeBalloon">
                <i class="fa fa-close custom-balloon__close-button"></i>
            </div>
         </div>
    `, {
        build: function () {
            this.constructor.superclass.build.call(this);
            this._closeButton = this.getElement().querySelector('#closeBalloon');
            if (this._closeButton) {
                this._closeButton.addEventListener('click', this.onCloseClick.bind(this));
            }
        },
        clear: function () {
            this.constructor.superclass.clear.call(this);
            if (this._closeButton) {
                this._closeButton.removeEventListener('click', this.onCloseClick.bind(this));
                this._closeButton = null; // Важно: очищаем ссылку
            }
        },
        onCloseClick: function (e) {
            e.preventDefault();
            this.events.fire('userclose');
        }
    });

    const placemark = new ymaps.Placemark(object.geolocation, {
        title: object.title,
        latitude: object.geolocation[0] ?? "",
        longitude: object.geolocation[1] ?? "",
        iconSrc: "img/" + object.cover_photo || 'img/bc-1.jpg',
    }, {
        iconLayout: customPlacemarkLayout,
        iconShape: {type: 'Rectangle', coordinates: [[0, 0], [90, 120]]},
        cursor: "pointer",
        hideIconOnBalloonOpen: false,
        balloonLayout: customBalloonLayout,
        balloonOffset: [100, 0]
    });

    placemark.events.add("click", async function (e) {
        const target = e.get("target");

        // Получаем данные об адресе и метро
        const balloonContentBody = await getNearestMetro(object.geolocation);
        target.properties.set("balloonContentBody", balloonContentBody);
    });

    // Добавляем метку на карту
    map.geoObjects.add(placemark);
}

// Функция для получения ближайшего метро
async function getNearestMetro(coords) {
    return new Promise((resolve, reject) => {
        // Получаем адрес
        ymaps.geocode(coords)
            .then((res) => {
                let address = "";
                if (res.geoObjects.getLength() > 0) {
                    address = res.geoObjects.get(0).getAddressLine() || "Адрес не найден";

                    // Затем ищем ближайшие станции метро, используя полученный адрес
                    ymaps.geocode(coords, {
                        kind: "metro",
                        results: 3,
                    })
                        .then((res) => {
                            const metroStations = [];
                            for (let i = 0; i < res.geoObjects.getLength(); i++) {
                                const geoObject = res.geoObjects.get(i);

                                metroStations.push({
                                    name: geoObject.getPremise().replace("метро ", "") || "Неизвестная станция",
                                });
                            }
                            resolve({ address, metroStations });
                        })
                        .catch((err) => {
                            console.error("Ошибка при поиске метро:", err);
                            resolve({ address: "Не удалось определить метро", metroStations: [] }); // Return found address even if getting metro fails
                        });
                } else {
                    // Если не удалось определить адрес по координатам
                    resolve({ address: "Адрес не найден", metroStations: [] });
                }
            })
            .catch((err) => {
                console.error("Ошибка при геокодировании координат:", err);
                reject(err);
            });
    });
}
