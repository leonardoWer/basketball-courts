import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {TextPlugin} from "gsap/TextPlugin";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(SplitText);

export function initScrollTimeline() {

    // Всплывающие контейнеры
    const containers = document.querySelectorAll('.reveal-container');
    containers.forEach(container => {
        // Создаем timeline для каждой анимации
        const tl = gsap.timeline({
            paused: true // Изначально ставим timeline на паузу
        });

        // Определяем анимацию "всплытия" (появление)
        tl.fromTo(
            container,
            {
                opacity: 0.2,
                y: 100
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
            }
        );

        // Создаем ScrollTrigger для запуска анимации при входе в область видимости
        ScrollTrigger.create({
            trigger: container,
            start: "top 90%",
            onEnter: () => {
                tl.play(); // Запускаем анимацию при входе
            },
            onLeaveBack: () => {
                tl.reverse(); // Запускаем анимацию в обратном направлении при выходе
            },
        });
    });

    // Заполняющийся текст
    const textEl = document.querySelector('.bcc-container__right-bc-text');
    const splitText = new SplitText(textEl, { type: "chars" }); // Разбиваем текст на символы
    const chars = splitText.chars; // Получаем массив символов

    gsap.from(chars, {
        color: "var(--gray-text)", // Конечный цвет
        stagger: 0.1, // Задержка между символами
        scrollTrigger: {
            trigger: textEl,
            start: "top 100%",
            end: "bottom 60%",
            scrub: true,
        }
    });

    // Футер
    gsap.from('.footer-bg', {
        borderRadius: 200,
        duration: 2,
        scrollTrigger: {
            trigger: "footer",
            start: "top 90%",
            end: "bottom 20%",
            scrub: true,
        }
    })

    gsap.fromTo(".footer-bg-text", {
        yPercent: -200, // Двигаем текст вверх на 100% его высоты
        opacity: 0.8,
    }, {
        yPercent: 120,
        opacity: 1,
        scrollTrigger: {
            trigger: ".footer-bg-text",
            start: "bottom bottom",
            end: "bottom 20%",
            scrub: true,
        },
    });
}