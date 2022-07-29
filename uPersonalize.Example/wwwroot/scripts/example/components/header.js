(new IntersectionObserver(function (e, o) {
    if (e[0].intersectionRatio > 0) {
        document.querySelector('nav.sticky-top').classList.remove('stuck');
    } else {
        document.querySelector('nav.sticky-top').classList.add('stuck');
    };
})).observe(document.querySelector('.trigger'));