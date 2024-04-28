
// script return back page 
document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('#back');

    backButton.addEventListener('click', function () {
        history.back();
    });
});

