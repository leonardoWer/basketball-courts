import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeaderAnimation() {
    const header = document.querySelector('.header__scroll-bg');
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
}