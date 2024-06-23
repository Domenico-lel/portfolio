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

// scroll reveal
document.addEventListener('DOMContentLoaded', function () {
    const sr = ScrollReveal({
        distance: '80px',
        duration: '2000',
        delay: '200',
    });

    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img, .services-container, .portfolio-box, .contact-form', { origin: 'top' });
    sr.reveal('.home-contact h1, .about-img', { origin: 'left' });
    sr.reveal('.home-contact p, .about-content', { origin: 'right' });
});

// typed js
const typed = new Typed('#multiple-text', {
    strings: ['Frontend Developer', 'Web Designer', 'UX/UI Designer', 'Full Stack Developer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 100,
    loop: true,
});

// "Read more" button action for the Home section
document.querySelector('.home .read-more').addEventListener('click', function () {
    // Show full text and hide "Read more" button
    document.querySelector('.home .full-text').style.display = 'block';
    this.style.display = 'none';
});

// "Read more" button action for the About section
document.querySelector('.about .read-more').addEventListener('click', function () {
    // Redirect to another HTML page when the button is clicked
    window.location.href = "about.html";
});

// Controllo se la pagina è stata aperta da un'altra pagina
if (document.referrer !== "") {
    // Creazione del pulsante "Torna Indietro"
    let backButton = document.createElement('button');
    backButton.textContent = 'Torna Indietro';
    backButton.addEventListener('click', function() {
        window.history.back();
    });
    
    // Aggiunta del pulsante al documento
    document.body.appendChild(backButton);
}

// "Me🙂" button action for the About section
document.querySelector('.about .my-skill').addEventListener('click', function () {
    // Redirect to another HTML page when the button is clicked
    window.location.href = "me.html";
});

// Validazione del form
document.querySelector('form').addEventListener('submit', function (e) {
    let inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    let errorMessage = '';

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            errorMessage = 'Compila tutti i campi.';
            input.style.border = '2px solid red';
        } else {
            input.style.border = '';
        }
    });

    if (!isValid) {
        e.preventDefault();
        // Mostra un messaggio di errore
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            // Aggiungi il messaggio di errore prima del form
            this.parentNode.insertBefore(errorDiv, this);
        }
        errorDiv.textContent = errorMessage;
    }
});