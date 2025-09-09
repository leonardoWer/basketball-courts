import {createTopMenu} from "s/components/TopMenu/TopMenu.js";
import {initMap} from "s/js/init/initMap.js";

// Верхнее меню
const header = document.querySelector('header');
if (header) {
    header.appendChild(createTopMenu());
}

// Карта
const objects =
initMap();
