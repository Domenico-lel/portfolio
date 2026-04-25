
document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('#back');

    backButton.addEventListener('click', function () {
        history.back();
    });

    // Calcolo automatico dell'età
    // Assumo 2003 dato il typo "20023" e l'età riportata di "22"
    const birthDate = new Date('2003-02-08'); 
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    const ageElement = document.querySelector('#user-age');
    if (ageElement) {
        ageElement.textContent = age;
    }
});

// --- CUSTOM CURSOR LOGIC ---
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const interactiveElements = document.querySelectorAll('button, #back i, .btn, .skill');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
    });
});
