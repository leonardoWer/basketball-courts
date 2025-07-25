document.addEventListener("DOMContentLoaded", function () {
    initCustomCursor();
});


function initCustomCursor() {
    // Создаем элемент кастомного курсора
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    // Наведение
    const interactiveElements = document.querySelectorAll('a, button, img, li');
    const addPointerHoverClass = () => {
        if (customCursor) {
            customCursor.classList.add('pointer-hover');
        }
    };
    const removePointerHoverClass = () => {
        if (customCursor) {
            customCursor.classList.remove('pointer-hover');
        }
    };

    let mouseMoving = false;
    let timeoutId;

    // Клик
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
    interactiveElements.forEach(element => {
        element.addEventListener('mouseover', addPointerHoverClass);
        element.addEventListener('mouseout', removePointerHoverClass);
    });
}


