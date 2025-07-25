import {initHeaderAnimation} from "s/js/gsap/headerAnimation.js";
import {MouseTargetCard} from "s/components/MouseTargetCard/MouseTargetCard.js";
import {initScrollTimeline} from "s/js/gsap/initScrollTimeline.js";

// Анимации при скролле
function initObservingAnimations() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => handleIntersection(entry, observer));
    });

    const animationContainers = document.querySelectorAll('.animation-container');
    animationContainers.forEach(container => {
        observer.observe(container);
    });
}

function handleIntersection(entry, observer) {
    if (entry.isIntersecting) {
        const container = entry.target;
        // container.classList.add('animated'); // Активируем базовую анимацию

        const animationType = container.dataset.animation;

        if (animationType === 'number-counter') {
            const counter = container.querySelector('.number-counter');
            const target = +container.dataset.target;
            const duration = +container.dataset.duration || 2000;

            function animateCounter(counter, target, duration) {
                const increment = target / (duration / 16);
                let current = 0;

                function updateCounter() {
                    current += increment;
                    counter.textContent = Math.floor(current);

                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                }

                updateCounter();
            }

            animateCounter(counter, target, duration);
        }

        observer.unobserve(container);
    }
}


// Движение картинки за мышкой
function initRotationElementMouseMoving() {
    const element = document.querySelector('.bcd-container-center__left-bc-img');
    MouseTargetCard(element);
}

// Кнопка которая ведёт к площадкам
function initScrollButton() {
    const scrollButtons = document.querySelectorAll('.scroll-button');

    scrollButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение кнопки (если нужно)

            const targetSectionId = button.dataset.target; // Получаем ID целевой секции
            const targetElement = document.getElementById(targetSectionId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}


// Загрузка страницы
document.addEventListener('DOMContentLoaded', function () {
    initHeaderAnimation();
    initScrollTimeline();
    initObservingAnimations();
    initScrollButton();
});

initRotationElementMouseMoving();