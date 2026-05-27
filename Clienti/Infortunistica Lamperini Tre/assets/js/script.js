/**
 * SCRIPT DI NAVIGAZIONE - INFORTUNISTICA LAMPERINI TRE
 * Gestisce l'apertura del menu a tendina (hamburger menu) sui dispositivi mobili.
 */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Attiva/disattiva la classe per l'animazione delle linee del pulsante
            menuToggle.classList.toggle('open');
            
            // Attiva/disattiva la classe per mostrare/nascondere il menu a tendina
            mainNav.classList.toggle('open');
        });
        
        // Chiude il menu se si clicca su un link (utile in contesti a pagina singola o transizioni)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }
});
