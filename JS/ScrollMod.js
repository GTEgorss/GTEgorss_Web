let lastKnownScrollPosition = 0;
let ticking = false;
let fixed = false;

function modifyTitle(scrollPos) {

    if (scrollPos > 107 && !fixed) {
        const topNav = document.querySelector('.top-nav');
        const main = document.querySelector('main');

        topNav.style.position = "fixed";
        topNav.style.padding = "30px 0 20px";
        main.style.paddingTop = "40px";

        fixed = true;

    } else if (scrollPos <= 107 && fixed) {
        const topNav = document.querySelector('.top-nav');
        const main = document.querySelector('main');

        topNav.style.position = "relative";
        topNav.style.padding = "0 0 20px";
        main.style.paddingTop = "0";

        fixed = false;
    }
}

document.addEventListener('scroll', (e) => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            modifyTitle(lastKnownScrollPosition);
            ticking = false;
        });

        ticking = true;
    }
});