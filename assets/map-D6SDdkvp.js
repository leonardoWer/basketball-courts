import{c as m,a as p,f as h}from"./fetchJson-B8zx-ge5.js";const g="_orangeLink_x3qqt_1",f={orangeLink:g};function _({title:t,href:o}){return`
        <a class=${f.orangeLink} href="${o}">${t}</a>
    `}const i={spbCenter:[59.939,30.315],defaultZoom:12,controls:["zoomControl","fullscreenControl"]};function b({placemarkData:t,mapCenter:o,mapZoom:a}){const e=document.getElementById("map");e||console.error("Элемент с ID 'map' не найден. Невозможно инициализировать карту."),(!t||t.length===0)&&console.warn("Список объектов пуст или не найден. Объекты не будут загружены");const n=new ymaps.Map(e,{center:o??i.spbCenter,zoom:a??i.defaultZoom,controls:i.controls});return t&&t.length>0&&t.forEach(s=>{y(s,n)}),n}function y(t,o){const a=ymaps.templateLayoutFactory.createClass(`
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
                    ${_({title:"Как добраться",href:"https://yandex.ru/maps/?rtext=~{{ properties.latitude }},{{ properties.longitude }}"})}
                 </div>
            </div>
            <div class="custom-balloon__close" id="closeBalloon">
                <i class="fa fa-close custom-balloon__close-button"></i>
            </div>
         </div>
    `,{build:function(){this.constructor.superclass.build.call(this),this._closeButton=this.getElement().querySelector("#closeBalloon"),this._closeButton&&this._closeButton.addEventListener("click",this.onCloseClick.bind(this))},clear:function(){this.constructor.superclass.clear.call(this),this._closeButton&&(this._closeButton.removeEventListener("click",this.onCloseClick.bind(this)),this._closeButton=null)},onCloseClick:function(s){s.preventDefault(),this.events.fire("userclose")}}),n=new ymaps.Placemark(t.geolocation,{title:t.title,latitude:t.geolocation[0]??"",longitude:t.geolocation[1]??"",iconSrc:"img/"+t.cover_photo||"img/bc-1.jpg"},{iconLayout:a,iconShape:{type:"Rectangle",coordinates:[[0,0],[90,120]]},cursor:"pointer",hideIconOnBalloonOpen:!1,balloonLayout:e,balloonOffset:[100,0]});n.events.add("click",async function(s){const c=s.get("target"),l=await v(t.geolocation);c.properties.set("balloonContentBody",l)}),o.geoObjects.add(n)}async function v(t){return new Promise((o,a)=>{ymaps.geocode(t).then(e=>{let n="";e.geoObjects.getLength()>0?(n=e.geoObjects.get(0).getAddressLine()||"Адрес не найден",ymaps.geocode(t,{kind:"metro",results:3}).then(s=>{const c=[];for(let l=0;l<s.geoObjects.getLength();l++){const u=s.geoObjects.get(l);c.push({name:u.getPremise().replace("метро ","")||"Неизвестная станция"})}o({address:n,metroStations:c})}).catch(s=>{console.error("Ошибка при поиске метро:",s),o({address:"Не удалось определить метро",metroStations:[]})})):o({address:"Адрес не найден",metroStations:[]})}).catch(e=>{console.error("Ошибка при геокодировании координат:",e),a(e)})})}function C(t){return new URLSearchParams(window.location.search).get(t)}const r=document.querySelector("header");r&&r.appendChild(m());const d=document.querySelector("footer");d&&d.appendChild(p());async function k(){try{const t=await h(),o=t.spb_courts;if(!t||!o||o.length===0){console.warn("Список объектов пуст или не найден");return}let a=null,e=null;const n=C("id");n&&(a=o.find(c=>c.id===parseInt(n)).geolocation,e=18),L({placemarkData:o,mapCenter:a,mapZoom:e})}catch(t){console.error("Ошибка загрузки JSON:",t)}}function L(t){ymaps.ready(b(t))}document.addEventListener("DOMContentLoaded",k);
