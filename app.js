window.addEventListener('scroll', () => {
    const navbar = document.getElementsByClassName('navBar')[0];
    if (window.scrollY > 500) {
        navbar.style.backgroundColor = 'rgba(183, 95, 13, 0.8)';
    } else {
        navbar.style.backgroundColor = 'rgba(183, 95, 13, 0)';
    }
});
