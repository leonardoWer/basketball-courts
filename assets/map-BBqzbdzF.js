import{c as u,a as p,f as h}from"./fetchJson-B8zx-ge5.js";const _="_orangeLink_x3qqt_1",g={orangeLink:_};function f({title:o,href:t}){return`
        <a class=${g.orangeLink} href="${t}">${o}</a>
    `}const i={center:[59.939,30.315],zoom:12,controls:["zoomControl","fullscreenControl"]};function y(o){const t=document.getElementById("map");t||console.error("Элемент с ID 'map' не найден. Невозможно инициализировать карту."),(!o||o.length===0)&&console.warn("Список объектов пуст или не найден. Объекты не будут загружены");const n=new ymaps.Map(t,{center:i.center,zoom:i.zoom,controls:i.controls});return o&&o.length>0&&o.forEach(e=>{b(e,n)}),n}function b(o,t){const n=ymaps.templateLayoutFactory.createClass(`
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
    `),e=ymaps.templateLayoutFactory.createClass(`
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
                    ${f({title:"Как добраться",href:"https://yandex.ru/maps/?rtext=~{{ properties.latitude }},{{ properties.longitude }}"})}
                 </div>
            </div>
            <div class="custom-balloon__close" id="closeBalloon">
                <i class="fa fa-close custom-balloon__close-button"></i>
            </div>
         </div>
    `,{build:function(){this.constructor.superclass.build.call(this),this._closeButton=this.getElement().querySelector("#closeBalloon"),this._closeButton&&this._closeButton.addEventListener("click",this.onCloseClick.bind(this))},clear:function(){this.constructor.superclass.clear.call(this),this._closeButton&&(this._closeButton.removeEventListener("click",this.onCloseClick.bind(this)),this._closeButton=null)},onCloseClick:function(s){s.preventDefault(),this.events.fire("userclose")}}),a=new ymaps.Placemark(o.geolocation,{title:o.title,latitude:o.geolocation[0]??"",longitude:o.geolocation[1]??"",iconSrc:"img/"+o.cover_photo||"img/bc-1.jpg"},{iconLayout:n,iconShape:{type:"Rectangle",coordinates:[[0,0],[90,120]]},cursor:"pointer",hideIconOnBalloonOpen:!1,balloonLayout:e,balloonOffset:[100,0]});a.events.add("click",async function(s){const l=s.get("target"),c=await v(o.geolocation);l.properties.set("balloonContentBody",c)}),t.geoObjects.add(a)}async function v(o){return new Promise((t,n)=>{ymaps.geocode(o).then(e=>{let a="";e.geoObjects.getLength()>0?(a=e.geoObjects.get(0).getAddressLine()||"Адрес не найден",ymaps.geocode(o,{kind:"metro",results:3}).then(s=>{const l=[];for(let c=0;c<s.geoObjects.getLength();c++){const m=s.geoObjects.get(c);l.push({name:m.getPremise().replace("метро ","")||"Неизвестная станция"})}t({address:a,metroStations:l})}).catch(s=>{console.error("Ошибка при поиске метро:",s),t({address:"Не удалось определить метро",metroStations:[]})})):t({address:"Адрес не найден",metroStations:[]})}).catch(e=>{console.error("Ошибка при геокодировании координат:",e),n(e)})})}const r=document.querySelector("header");r&&r.appendChild(u());const d=document.querySelector("footer");d&&d.appendChild(p());async function k(){try{const o=await h();o&&o.spb_courts&&C(o.spb_courts)}catch(o){console.error("Ошибка загрузки JSON:",o)}}function C(o){ymaps.ready(y(o))}document.addEventListener("DOMContentLoaded",k);
