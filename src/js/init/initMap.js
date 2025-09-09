const mapConfig = {
    center: [59.939, 30.315],
    zoom: 12,
    controls: ['zoomControl', 'fullscreenControl'],
}

export function initMap(objects) {
    const mapContainer = document.getElementById('map');

    // errors
    if (!mapContainer) {
        console.error("Элемент с ID 'map' не найден. Невозможно инициализировать карту.");
    }
    if (!objects || objects.length === 0) {
        console.warn("Список объектов пуст или не найден. Объекты не будут загружены");
    }

    // init
    const map = new ymaps.Map(mapContainer, {
        center: mapConfig.center,
        zoom: mapConfig.zoom,
        controls: mapConfig.controls,
    })

    // objects
    if (objects && objects.length > 0) {
        objects.forEach(object => {addPlacemark(object, map)})
    }

    return map;
}

function addPlacemark (object, map) {

}