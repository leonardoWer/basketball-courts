const PHOTO_PATH = 'img/';
const DATA_PATH = 'src/js/data.json';


document.addEventListener('DOMContentLoaded', () => {
    initCourtsJson();
})


function initCourtsJson() {
    fetch(DATA_PATH)
        .then(response => response.json())
        .then(data => {
            console.log("data.json успешно загружен: всего", data.spb_courts.length)

            initCourts(data.spb_courts);
        })
        .catch(error => console.log('Ошибка загрузки JSON:', error));
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
            <img src="${PHOTO_PATH}bc-1.jpg" alt="${court.address}">
    
            <div class="bc-img-content">
                ${court.type ? `
                <div class="tile-label">
                    ${court.type}
                </div>
                 ` : ''}
              
                <div class="tile-title">
                    ${court.address}
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