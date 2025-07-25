import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// scrollTrigger: {
//     trigger: ".header-container",
//         start: trigger-position viewport position
// },

export function initHeaderAnimation() {
    const header = document.querySelector('.header__scroll-bg');
    const topMenu = document.querySelector('.top-menu');
    const headerHeight = header.offsetHeight;

    gsap.to(header, {
        opacity: 0.9,
        scrollTrigger: {
            trigger: ".header-container", // Можно указать любой элемент для начала триггера
            start: "top top", // Когда верх триггера коснется верха окна
            end: `+=${headerHeight}`, // Длительность анимации равна высоте хедера
            scrub: true,
        }
    });

    // Анимация появления верхнего меню
    gsap.fromTo(topMenu, {
        yPercent: -100,
        opacity: 0,
    }, {
        yPercent: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".header-container",
            start: `top+=${headerHeight * 0.2} top`, // Начинаем анимацию после прокрутки 20% высоты хедера
            end: `top+=${headerHeight * 0.5} top`, // Заканчиваем анимацию после прокрутки 50% высоты хедера (можно настроить)
        },
    });
}