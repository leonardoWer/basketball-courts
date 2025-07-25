export function MouseTargetCard(element) {
    // Параметры анимации
    const ease = 0.1; // Скорость движения
    const rotationSensitivity = 10 // Чувствительность поворота

    // Текущий поворот
    let currentX = 0
    let currentY = 0

    // Результат поворота
    let targetX = 0;
    let targetY = 0;

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