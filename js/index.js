document.addEventListener('DOMContentLoaded', function () {
    initHeader();
});


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