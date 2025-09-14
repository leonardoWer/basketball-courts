import styles from "./BCTile.module.css"

const PHOTO_PATH = 'img/';

export function createBCTile(court) {
    const tile = document.createElement('div');
    tile.className = `${styles['bc-tile']}`;
    tile.innerHTML = `
        <div class=${styles["bc-img-container"]}>
            <img src="${PHOTO_PATH}${court.cover_photo}" alt="${court.title}">
    
            <div class=${styles["bc-img-content"]}>
                ${court.type ? `
                <div class=${styles["tile-label"]}>
                    ${court.type}
                </div>
                 ` : ''}
              
                <div class=${styles["tile-title"]}>
                    ${court.title}
                </div>
            </div>
        </div>

        <a href="map.html?id=${court.id}"
            class=${styles["tile-button"]}>
            Посмотреть на карте
        </a>
        ${court.cost ? `
          <span class=${styles["tile-type-text"]}>
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