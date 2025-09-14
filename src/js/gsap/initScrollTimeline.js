import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {TextPlugin} from "gsap/TextPlugin";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

export function initScrollTimeline() {

    // Всплывающие контейнеры
    const containers = document.querySelectorAll('.reveal-container');
    containers.forEach(container => {
        const tl = gsap.timeline({
            paused: true
        });

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
        
        ScrollTrigger.create({
            trigger: container,
            start: "top 90%",
            onEnter: () => {
                tl.play();
            },
            onLeaveBack: () => {
                tl.reverse();
            },
        });
    });

    // Заполняющийся текст
    const textEl = document.querySelector('.bcc-container__right-bc-text');
    document.fonts.ready.then(() => {
        const splitText = new SplitText(textEl, {type: "chars"});

        gsap.from(splitText.chars, {
            color: "var(--gray-text)",
            stagger: 0.1,
            scrollTrigger: {
                trigger: textEl,
                start: "top 100%",
                end: "bottom 60%",
                scrub: true,
            }
        });
    })

}