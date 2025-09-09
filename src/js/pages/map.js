import {createTopMenu} from "s/components/TopMenu/TopMenu.js";
import {createFooter} from "s/components/Footer/Footer.js";
import {initMap} from "s/js/init/initMap.js";

// Элементы
const header = document.querySelector('header');
if (header) {
    header.appendChild(createTopMenu());
}

const footer = document.querySelector('footer');
if (footer) {
    footer.appendChild(createFooter());
}

// Карта
initMap();
