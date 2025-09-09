import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    root: './',
    resolve: {
        alias: {
            's': resolve(__dirname, './src'),
            'p': resolve(__dirname, './public'),
        },
    },
    base: '/basketball-courts/',
    build: {
        input: {
            // Определяем точки входа
            main: resolve(__dirname, 'index.html'),
            map: resolve(__dirname, 'map.html'),
        },
    }
});