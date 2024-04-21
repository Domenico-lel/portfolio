// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

// scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
            });
        };
    });

    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', function () {
    // Inizializza scrollReveal con le opzioni desiderate
    const sr = ScrollReveal({
        distance: '80px',
        duration: '2000',
        delay: '200',
    });

    // Applica le animazioni di scrollReveal a ciascun elemento desiderato
    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img, .services-container, .portfolio-box, .contact-form', { origin: 'top' });
    sr.reveal('.home-contact h1, .about-img', { origin: 'left' });
    sr.reveal('.home-contact p, .about-content', { origin: 'right' });
});
