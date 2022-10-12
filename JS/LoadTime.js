let loadTime = -1;

(() => {

    const start = new Date().getTime();

    document.addEventListener('DOMContentLoaded', () => {

        loadTime = (new Date().getTime() - start) / 1000;

        window.addEventListener('load', () => {
            document.getElementById('load-time').innerHTML = loadTime.toString();
        })

    });

})();