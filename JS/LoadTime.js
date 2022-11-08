/**
 * Contains load time of a page
 * @type {number}
 */
let loadTime = -1;

/**
 * Shows load time in a footer of a page
 * @function
 */
(() => {
    const start = new Date().getTime();

    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('load', () => {
            loadTime = (new Date().getTime() - start) / 1000;
            document.getElementById('load-time').innerHTML = loadTime.toString();
        })

    });
})();