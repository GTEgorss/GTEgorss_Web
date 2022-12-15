(() => {
    let e = 0, t = window.innerWidth, n = 105, o = !1, d = !1;
    document.addEventListener("scroll", (i => {
        e = window.scrollY, t = window.innerWidth, o || (window.requestAnimationFrame((() => {
            !function (e, t) {
                if (n = t > 773 ? 105 : 164, e > n && !d) {
                    const e = document.querySelector(".layout-nav"), t = document.querySelector("main");
                    e.style.position = "fixed", e.style.padding = "23px 0 0", t.style.paddingTop = "70px", d = !0
                } else if (e <= n && d) {
                    const e = document.querySelector(".layout-nav"), t = document.querySelector("main");
                    e.style.position = "relative", e.style.padding = "10px 0 0", t.style.paddingTop = "0", d = !1
                }
            }(e, t), o = !1
        })), o = !0)
    }))
})(), (() => {
    let e = -1;
    (() => {
        const t = (new Date).getTime();
        document.addEventListener("DOMContentLoaded", (() => {
            window.addEventListener("load", (() => {
                e = ((new Date).getTime() - t) / 1e3, document.getElementById("load-time").innerHTML = e.toString()
            }))
        }))
    })()
})();