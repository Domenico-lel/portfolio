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
    strings: ['Junior IT Support', 'Tecnico Informatico', 'Junior Developer', 'Tech Enthusiast'],
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
document.querySelector('.about .my-skill').addEventListener('click', function (e) {
    e.preventDefault();
    let codice = prompt("Area Privata. Inserisci il codice di accesso:");
    if (codice === "080203") {
        window.location.href = "me.html";
    } else if (codice !== null) {
        alert("Codice errato! Accesso negato.");
    }
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

// --- CUSTOM CURSOR LOGIC ---
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-box, .services-box i, .services-box h3, span');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
    });
});

// ================= WELCOME MODAL GATEKEEPER =================
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("welcome-modal");
    if (!modal) return;
    
    // Controlla se ha già effettuato l'accesso
    if (sessionStorage.getItem("accessLogged")) {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-active");
    } else {
        document.body.classList.add("modal-active"); // Blocco scroll
    }

    const roleSelect = document.getElementById("w-role");
    const aziendaBox = document.getElementById("azienda-box");
    const wForm = document.getElementById("welcome-form");
    const wSubmitBtn = document.getElementById("w-submit");

    // Mostra input Azienda solo se Recruiter
    roleSelect.addEventListener("change", function() {
        if (this.value === "Recruiter") {
            aziendaBox.style.display = "block";
            document.getElementById("w-azienda").setAttribute("required", "true");
        } else {
            aziendaBox.style.display = "none";
            document.getElementById("w-azienda").removeAttribute("required");
            document.getElementById("w-azienda").value = "";
        }
    });

    wForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // VALIDAZIONE CUSTOM: Nome e Cognome
        const nomeCompleto = document.getElementById("w-name").value.trim();
        if (nomeCompleto.split(" ").length < 2) {
            alert("Per favore, inserisci sia il Nome che il Cognome separati da uno spazio.");
            return; // Blocca immediatamente l'esecuzione e l'invio dell'email
        }

        // Assicuriamoci che i campi HTML5 siano validi (es. select ruolo)
        if (!wForm.checkValidity()) {
            wForm.reportValidity();
            return;
        }

        wSubmitBtn.textContent = "Accesso in corso...";
        wSubmitBtn.disabled = true;

        const formData = new FormData(wForm);

        // API Fetch Web3Forms per inviare mail in background invisibile
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Sblocca pagina
                sessionStorage.setItem("accessLogged", "true");
                modal.classList.add("hidden");
                document.body.classList.remove("modal-active");
            } else {
                alert("Errore durante l'accesso. Riprova.");
                wSubmitBtn.textContent = "Entra nel Portfolio";
                wSubmitBtn.disabled = false;
            }
        })
        .catch(error => {
            alert("Errore di rete. Controlla la connessione!");
            wSubmitBtn.textContent = "Entra nel Portfolio";
            wSubmitBtn.disabled = false;
        });
    });
});