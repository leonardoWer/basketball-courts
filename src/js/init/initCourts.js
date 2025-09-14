import {fetchJson} from "s/js/utils/fetchJson.js";
import {createBCTile} from "s/components/BCTile/BCTile.js";

const DATA_PATH = 'data/data.json';

async function initCourtsJson() {
    try {
        const jsonData = await fetchJson(DATA_PATH);

        if (jsonData && jsonData.spb_courts) {
            initCourts(jsonData.spb_courts);
        }
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
    }
}

function initCourts(courts) {
    const tileContainer = document.getElementById('tilesContainer');

    courts.forEach(court => {
        const tile = createBCTile(court);
        tileContainer.appendChild(tile);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initCourtsJson();
})