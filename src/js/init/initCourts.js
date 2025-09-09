import {fetchJson} from "s/js/utils/fetchJson.js";

const PHOTO_PATH = 'img/';
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
        const tile = createCourtTile(court);
        tileContainer.appendChild(tile);
    })
}

function createCourtTile(court) {
    const tile = document.createElement('div');
    tile.className = 'bc-tile';
    tile.innerHTML = `
        <div class="bc-img-container">
            <img src="${PHOTO_PATH}bc-1.jpg" alt="${court.title}">
    
            <div class="bc-img-content">
                ${court.type ? `
                <div class="tile-label">
                    ${court.type}
                </div>
                 ` : ''}
              
                <div class="tile-title">
                    ${court.title}
                </div>
            </div>
        </div>

        <a href="#" class="tile-button">Посмотреть на карте</a>
        ${court.cost ? `
          <span class="tile-type-text">
              <i class="fa fa-solid fa-check"></i>
              ${court.cost}
          </span>
        ` : ''}
    `
    tile.addEventListener('click', function () {
        window.location.href = `card_court.html?id=${court.id}`;
    });

    return tile;
}

document.addEventListener('DOMContentLoaded', () => {
    initCourtsJson();
})