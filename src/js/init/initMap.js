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

const customPlacemarkLayout = ymaps.templateLayoutFactory.createClass(
    `
    <div class="custom-placemark">
        <div class="custom-placemark__image-container">
            <img src="{{ properties.iconSrc }}" class="custom-placemark__image" alt="placemark-icon">
        </div>
        
        <div class="custom-placemark__content">
            <h4 class="custom-placemark__title">{{ properties.title }}</h4>
        </div>
    </div>
    `,
    {
        build: function() {
            this.constructor.superclass.build.call(this);

            // Пример: навешиваем обработчик на сам макет
            // this.options.get('content').events.add('click', () => {
            //     alert('Клик по макету!');
            // });
        }
    }
);
function addPlacemark (object, map) {
    const placemark = new ymaps.Placemark(object.geolocation, {
        title: object.title,
        iconSrc: "img/" + object.cover_photo || 'img/bc-1.jpg',

        balloonContent: object.balloonContent || 'Информация отсутствует',
    }, {
        iconLayout: customPlacemarkLayout,
    });

    // Добавляем метку на карту
    map.geoObjects.add(placemark);
}
