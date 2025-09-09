import styles from "./TopMenu.module.css";

export function createTopMenu() {

    const topMenu = document.createElement('div');
    topMenu.className = styles['top-menu'];

    topMenu.innerHTML = `
        <div class="${styles['top-line']}">
            <div class="${styles['top-line__left']}">
                <a href="index.html" class="${styles['top-line-logo']}">
                    <img class="${styles['top-line-logo-img']}" src="img/logo/basketball-courts-logo.png" alt="logo">
                </a>
                <span class="logo-text">basket-courts</span>
            </div>

            <div class="${styles['top-line__center']}">
                <nav class="${styles['top-menu-navigation']}">
                    <ul>
                        <li>
                            <a href="index.html">
                                <i class="left-i fa-solid fa-house"></i>
                                Главная
                            </a>
                        </li>
                        <li>
                            <a href="map.html">
                                <i class="left-i fa-solid fa-location-dot"></i>
                                Карта
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;

    return topMenu;
}