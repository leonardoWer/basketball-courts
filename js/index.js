document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initAnimations()
});


// Затемнение хедера
function initHeader() {
    const header = document.querySelector('.header__scroll-bg');
    const headerHeight = header.offsetHeight;
    const topMenu = document.querySelector('.top-menu');

    function checkScroll() {
        let scrollPosition = window.scrollY;
        let opacity = 0;

        // Затемнение хедера
        if (scrollPosition < headerHeight) {
            opacity = scrollPosition / headerHeight * 0.8;
        } else {
            opacity = 1;
        }

        // Устанавливаем прозрачность scroll-bg
        header.style.opacity = opacity;

        // Верхнее меню
        if (scrollPosition >= headerHeight * 0.2) {
            topMenu.classList.add('active');
            topMenu.classList.remove('hidden');
        } else {
            topMenu.classList.add('hidden');
            topMenu.classList.remove('active');
        }
    }

    // Привязываем функцию checkScroll к событию прокрутки
    window.addEventListener('scroll', checkScroll);

    // Вызываем checkScroll при загрузке, чтобы установить начальное состояние
    checkScroll();
}


// Анимации при скролле
function initAnimations() {
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

            animateCounter(counter, target, duration);
        }

        observer.unobserve(container);
    }
}

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