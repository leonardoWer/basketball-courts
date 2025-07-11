document.addEventListener("DOMContentLoaded", function () {
    initCustomCursor();
    initFadeInText();
});


function initCustomCursor() {
    // Создаем элемент кастомного курсора
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    let mouseMoving = false;
    let timeoutId;

    // Функции для мыши
    function moveCursor(event) {
        customCursor.style.left = event.clientX + 'px';
        customCursor.style.top = event.clientY + 'px';

        // Если мышь не двигалась в течение некоторого времени, добавляем класс "idle"
        if (!mouseMoving) {
            customCursor.classList.remove('idle');
        }
        mouseMoving = true;
        clearTimeout(timeoutId);

        // Запускаем таймер, чтобы через некоторое время добавить класс "idle"
        timeoutId = setTimeout(function () {
            mouseMoving = false;
            customCursor.classList.add('idle');
        }, 100);
    }

    function addClickEffect() {
        customCursor.classList.remove('idle');
        customCursor.classList.add('clicked');
    }

    function removeClickEffect() {
        customCursor.classList.remove('clicked');
        // Если мышь не движется, добавим класс idle сразу после отпускания кнопки
        if (!mouseMoving) {
            customCursor.classList.add('idle');
        }
    }

    // Отслеживание мыши
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', addClickEffect);
    document.addEventListener('mouseup', removeClickEffect);
}

function initFadeInText() {
    const elements = document.querySelectorAll('.fade-in-text');

    // Для каждого элемента добавляем класс 'active' после небольшой задержки
    elements.forEach(function (element, index) {
        setTimeout(function () {
            element.classList.add('active');
        }, index * 200);
    });
}


