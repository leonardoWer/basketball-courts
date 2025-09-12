import {createTopMenu} from "s/components/TopMenu/TopMenu.js";
import {createFooter} from "s/components/Footer/Footer.js";
import {initMap} from "s/js/init/initMap.js";
import {fetchJson} from "s/js/utils/fetchJson.js";

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

        if (jsonData && jsonData.spb_courts) {
            initMapPage(jsonData.spb_courts);
        }
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

function initMapPage(data) {
    ymaps.ready(initMap(data))
}

// Карта
document.addEventListener('DOMContentLoaded', initCourtsJson);
