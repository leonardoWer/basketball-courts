import {createTopMenu} from "s/components/TopMenu/TopMenu.js";
import {createFooter} from "s/components/Footer/Footer.js";

import {fetchJson} from "s/js/utils/fetchJson.js";
import {initMap} from "s/js/init/initMap.js";
import {getQueryParam} from "s/js/utils/getQueryParams.js";

// Элементы
const header = document.querySelector('header');
if (header) {
    header.appendChild(createTopMenu());
}

const footer = document.querySelector('footer');
if (footer) {
    footer.appendChild(createFooter());
}

// Площадки
async function initCourtsJson() {
    try {
        const jsonData = await fetchJson();
        const spbCourtsData = jsonData.spb_courts;

        if (!jsonData || !spbCourtsData || spbCourtsData.length === 0) {
            console.warn("Список объектов пуст или не найден");
            return;
        }

        // Получаем координаты центра карты, если нужно приблизить
        let centerObjCoords = null;
        let centerObjMapZoom = null;
        const centerObjId = getQueryParam("id");
        if (centerObjId) {
            // Получаем координаты
            const centerObj = spbCourtsData.find(court => court.id === parseInt(centerObjId));
            centerObjCoords = centerObj.geolocation;

            // Приближаем карту
            centerObjMapZoom = 18;
        }

        initMapPage({
            placemarkData: spbCourtsData,
            mapCenter: centerObjCoords,
            mapZoom: centerObjMapZoom
        });
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

function initMapPage(data) {
    ymaps.ready(initMap(data))
}

// Карта
document.addEventListener('DOMContentLoaded', initCourtsJson);
