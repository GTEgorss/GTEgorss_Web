let loadTime = -1;

(() => {
    const start = new Date().getTime();

    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('load', () => {
            loadTime = (new Date().getTime() - start) / 1000;
            document.getElementById('load-time').innerHTML = loadTime.toString();
        })

    });
})();