export async function fetchJson(url="data/data.json") {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} при загрузке ${url}`);
        }

        return await response.json(); // Возвращаем загруженные данные
    } catch (error) {
        console.error(`Ошибка загрузки JSON из ${url}:`, error);
        throw error; // Пробрасываем ошибку дальше, чтобы вызывающий код мог ее обработать
    }
}