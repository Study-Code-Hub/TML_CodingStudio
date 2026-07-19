/**
 * SCRIPT UNICO E PULITO - INFORTUNISTICA LAMPERINI TRE
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIONE MENU
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
        });
        
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }

    // 2. GESTIONE CAROSELLO
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length > 0) {
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            if (index >= slides.length) currentSlide = 0;
            if (index < 0) currentSlide = slides.length - 1;
            slides[currentSlide].classList.add('active');
        }

        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(++currentSlide));
        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(--currentSlide));
    }
});

// IL TUO LINK DI GOOGLE MAPS (Prendilo dall'iframe generato da Google in "Condividi > Incorpora mappa")
const mappaURL = "INSERISCI_QUI_IL_LINK_DI_GOOGLE_MAPS";

// Appena la pagina si carica, controlla se l'utente ha già scelto
document.addEventListener("DOMContentLoaded", function() {
    const consenso = localStorage.getItem('cookieConsent_MaiDomi');
    const banner = document.getElementById('cookieBanner');
    
    if (!consenso) {
        // Se non ha mai scelto, mostra il banner (il CSS di base lo nasconde, noi lo forziamo a flex)
        banner.style.display = 'flex';
    } else if (consenso === 'accettato') {
        // Se aveva già accettato in passato, sblocca tutto subito
        sbloccaServizi();
    }
});

// Funzione quando si clicca ACCETTA
function accettaCookie() {
    localStorage.setItem('cookieConsent_MaiDomi', 'accettato'); // Salva la scelta nel browser
    document.getElementById('cookieBanner').style.display = 'none'; // Nasconde il banner
    sbloccaServizi(); // Attiva la mappa
}

// Funzione quando si clicca RIFIUTA
function rifiutaCookie() {
    localStorage.setItem('cookieConsent_MaiDomi', 'rifiutato'); // Salva la scelta
    document.getElementById('cookieBanner').style.display = 'none'; // Nasconde il banner
    // La mappa resta nascosta e il placeholder resta visibile
}

// Funzione per riaprire il banner se l'utente cambia idea (cliccando sul placeholder)
function mostraBannerCookie() {
    document.getElementById('cookieBanner').style.display = 'flex';
}

// Funzione che inserisce fisicamente la mappa nella pagina
function sbloccaServizi() {
    const mapPlaceholder = document.getElementById('cookie-placeholder-map');
    const mapIframe = document.getElementById('googleMap');
    
    if (mapPlaceholder && mapIframe) {
        mapPlaceholder.style.display = 'none'; // Nasconde il box di avviso
        mapIframe.style.display = 'block'; // Mostra l'iframe
        mapIframe.src = mappaURL; // Carica il sito di Google Maps dentro l'iframe solo ora!
    }
}