import styles from "./Footer.module.css"

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

export function createFooter() {
    const footer = document.createElement("div")

    footer.innerHTML = `
        <div class="${styles['footer-bg']}">

          <div class="${styles['footer-top-line']}">

            <div class="${styles['footer-top-line__left']}">
              <a href="#" class="${styles['bottom-line-logo']}">
                <img class="${styles['footer-logo-img']}" src="img/logo/basketball-courts-logo.png" alt="logo">
              </a>
              <span class="logo-text">basket-courts</span>
            </div>

            <div class="${styles['footer-top-line__explore']}">
              <h4 class="${styles['footer-top-line-title-text']}">Места</h4>
              <ul class="${styles['footer-top-line-list']}">
                <li><a class="${styles.link}" href="map.html">Карта</a></li>
              </ul>
            </div>

            <div class="${styles['footer-top-line__socials']}">
              <h4 class="${styles['footer-top-line-title-text']}">Контакты</h4>
              <ul class="${styles['footer-top-line-list']}">
                <li><a class="${styles.link}" href="https://t.me/leonardo_Wer" target="_blank" title="Visit my tg">Телеграм</a></li>
                <li><a class="${styles.link}" href="https://vk.com/leonardo_Wer" target="_blank" title="Visit my vk">Вконтакте</a></li>
                <li><a class="${styles.link}" href="https://github.com/leonardoWer" target="_blank" title="Visit my git">Гитхаб</a></li>
                <li><a class="${styles.link}" href="https://github.com/leonardoWer/Portfolio_Levakhin_Lev" target="_blank" title="Check out my portfolio">Портфолио</a></li>
              </ul>
            </div>

            <div class="${styles['footer-top-line__contact']}">
              <h4 class="${styles['footer-top-line-title-text']}">Помощь</h4>
              <ul class="${styles['footer-top-line-list']}">
                <li><a class="${styles.link}" href="https://t.me/leonardo_Wer" target="_blank" title="Help us to become better">Предложить площадку</a></li>
              </ul>
            </div>

          </div>

          <span class="${styles['footer-bg-text']} background-text">Баскетбольные площадки</span>

        </div>
    `;

    const footerBg = footer.querySelector(`.${styles['footer-bg']}`);
    const footerText = footer.querySelector(`.${styles['footer-bg-text']}`);

    // gsap anim
    gsap.fromTo(footerBg, {
        borderRadius: "180px",
        duration: 2,
    }, {
        borderRadius: "32px",
        scrollTrigger: {
            trigger: footerBg,
            start: "top 90%",
            end: "bottom 95%",
            scrub: 1,
        }
    })

    gsap.fromTo(footerText, {
        yPercent: -200, // Двигаем текст вверх на 100% его высоты
        opacity: 0.8,
    }, {
        yPercent: 120,
        opacity: 1,
        scrollTrigger: {
            trigger: footerText,
            start: "bottom bottom",
            end: "bottom 20%",
            scrub: 0.8,
        },
    });

    return footer;
}