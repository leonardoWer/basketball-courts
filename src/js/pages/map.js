import {createTopMenu} from "s/components/TopMenu/TopMenu.js";

// Верхнее меню
const header = document.querySelector('header');
if (header) {
    header.appendChild(createTopMenu());
}
