// Затемнение хедера
function initScrollCheckAnimations() {
    const header = document.querySelector('.header__scroll-bg');
    const headerHeight = header.offsetHeight;

    const topMenu = document.querySelector('.top-menu');
    const topLogo = document.querySelector('.top-line__left');

    function checkScroll() {
        let scrollPosition = window.scrollY;
        let opacity = 0;

        // Затемнение хедера
        if (scrollPosition < headerHeight) {
            opacity = scrollPosition / headerHeight * 0.9;
        } else {
            opacity = 1;
        }

        // Устанавливаем прозрачность scroll-bg
        header.style.opacity = opacity;

        // Верхнее меню
        if (scrollPosition >= headerHeight * 0.2) {
            topMenu.classList.add('active');
            topMenu.classList.remove('hidden');

            topLogo.classList.add('hidden');
            topLogo.classList.remove('active');
        } else {
            topMenu.classList.add('hidden');
            topMenu.classList.remove('active');

            topLogo.classList.add('active');
            topLogo.classList.remove('hidden');
        }
    }

    // Привязываем функцию checkScroll к событию прокрутки
    window.addEventListener('scroll', checkScroll);

    // Вызываем checkScroll при загрузке, чтобы установить начальное состояние
    checkScroll();
}


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
        container.classList.add('animated'); // Активируем базовую анимацию

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

    // Параметры анимации
    const ease = 0.1; // Скорость движения
    const rotationSensitivity = 10 // Чувствительность поворота

    // Текущий поворот
    let currentX = 0
    let currentY = 0

    // Результат поворота
    let targetX = 0;
    let targetY= 0;

    function animate() {
        // Меняем координаты
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        // Применяем трансформацию
        element.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;

        // Повторяем каждый кадр
        requestAnimationFrame(animate);
    }

    // Мышка
    element.addEventListener('mousemove', (e) => {
        // Позиция мышки внутри карточки
        const rect = element.getBoundingClientRect();

        // Координаты мыши относительно верхнего левого угла карточки
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Центр карточки
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Наклон от центра
        targetX = (centerY - y) / rotationSensitivity;
        targetY = (x - centerX) / rotationSensitivity;

        animate();
    });

    element.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    // Запускаем анимацию
    animate();
}


// Загрузка страницы
document.addEventListener('DOMContentLoaded', function () {
    initScrollCheckAnimations();
    initObservingAnimations();
});

initRotationElementMouseMoving();