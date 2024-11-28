window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(183, 95, 13, 0.8)';
    } else {
        navbar.style.backgroundColor = 'rgba(183, 95, 13, 0)';
    }
});
