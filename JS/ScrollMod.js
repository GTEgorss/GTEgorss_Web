let lastScrollY = 0;
let lastWidth = window.innerWidth;
let maxScrollPos = 105;
let ticking = false;
let fixed = false;

function modifyTitle(scrollPos, width) {


    if (width > 773) {
        maxScrollPos = 105;
    } else {
        maxScrollPos = 164;
    }

    console.log(scrollPos + " " + maxScrollPos + " " + width + "\n");

    if (scrollPos > maxScrollPos && !fixed) {
        const topNav = document.querySelector('.layout-nav');
        const main = document.querySelector('main');

        topNav.style.position = "fixed";
        topNav.style.padding = "23px 0 0";
        main.style.paddingTop = "70px";

        fixed = true;

    } else if (scrollPos <= maxScrollPos && fixed) {
        const topNav = document.querySelector('.layout-nav');
        const main = document.querySelector('main');

        topNav.style.position = "relative";
        topNav.style.padding = "10px 0 0";
        main.style.paddingTop = "0";

        fixed = false;
    }
}

document.addEventListener('scroll', (e) => {
    lastScrollY = window.scrollY;
    lastWidth = window.innerWidth;


    if (!ticking) {
        window.requestAnimationFrame(() => {
            modifyTitle(lastScrollY, lastWidth);
            ticking = false;
        });

        ticking = true;
    }
});