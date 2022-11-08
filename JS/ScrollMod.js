/**
 * Contains last window scroll position
 * @type {number}
 */
let lastScrollY = 0;

/**
 * Contains last window width
 * @type {number}
 */
let lastWidth = window.innerWidth;

/**
 * Shows at which scroll position style needs to be changed
 * @type {number}
 */
let maxScrollPos = 105;

/**
 * Shows if scroll happened
 * @type {boolean}
 */
let ticking = false;

/**
 * Represents current style
 * @type {boolean}
 */
let fixed = false;

/**
 * Modifies style of the navigation menu based on current scroll position
 * @param scrollPos
 * @param width
 * @function
 */
function modifyTitle(scrollPos, width) {

    if (width > 773) {
        maxScrollPos = 105;
    } else {
        maxScrollPos = 164;
    }

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

/**
 * Adds event listener to the document to call function on scroll
 */
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