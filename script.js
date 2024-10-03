document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});

document.addEventListener('click', (event) => {
    const isClickInsideNav = navList.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInsideNav && navList.classList.contains('show')) {
        navList.classList.remove('show');
    }
});