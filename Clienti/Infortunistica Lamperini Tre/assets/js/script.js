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

/**
 * SCRIPT UNICO - INFORTUNISTICA LAMPERINI TRE
 * Menu, carosello e gestione consenso cookie / servizi di terze parti.
 */

/* URL della mappa: sta SOLO qui, mai nell'HTML.
   Se cambi sede, modifichi questa riga e basta. */
const MAPPA_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.669601614838!2d10.60156941552554!3d44.66532437909941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47801cf906a29e2f%3A0x86bd7179ed487e87!2sVia%20Alcide%20De%20Gasperi%2C%2036c%2C%2042122%20Reggio%20Emilia%20RE!5e0!3m2!1sit!2sit!4v1680000000000!5m2!1sit!2sit";

const COOKIE_KEY = 'consensoCookie_L3';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initCarosello();
    initCookie();
});

/* ---------- 1. MENU ---------- */
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
        const aperto = mainNav.classList.toggle('open');
        menuToggle.classList.toggle('open', aperto);
        menuToggle.setAttribute('aria-expanded', aperto ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            mainNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ---------- 2. CAROSELLO MANUALE ---------- */
function initCarosello() {
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length === 0) return;

    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach(s => s.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
}

/* ---------- 3. COOKIE ---------- */
function initCookie() {
    const scelta = leggiConsenso();

    if (scelta === 'accettato') {
        sbloccaServizi();
    } else if (!scelta) {
        mostraBannerCookie();
    }
    // 'rifiutato' -> non si fa nulla: restano i segnaposto

    // I bottoni funzionano anche senza onclick inline nell'HTML
    document.querySelectorAll('[data-cookie="accetta"]')
        .forEach(b => b.addEventListener('click', accettaCookie));
    document.querySelectorAll('[data-cookie="rifiuta"]')
        .forEach(b => b.addEventListener('click', rifiutaCookie));
    document.querySelectorAll('[data-cookie="gestisci"]')
        .forEach(b => b.addEventListener('click', mostraBannerCookie));
}

function leggiConsenso() {
    try {
        return localStorage.getItem(COOKIE_KEY);
    } catch (e) {
        return null; // localStorage bloccato dal browser
    }
}

function salvaConsenso(valore) {
    try {
        localStorage.setItem(COOKIE_KEY, valore);
    } catch (e) { /* navigazione privata: la scelta vale solo per questa visita */ }
}

function accettaCookie() {
    salvaConsenso('accettato');
    nascondiBannerCookie();
    sbloccaServizi();
}

function rifiutaCookie() {
    salvaConsenso('rifiutato');
    nascondiBannerCookie();
    bloccaServizi();
}

function mostraBannerCookie() {
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.add('is-visible');
}

function nascondiBannerCookie() {
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.classList.remove('is-visible');
}

/* Carica le mappe: l'iframe riceve l'src solo ora.
   Finché non si accetta, Google non viene mai contattato. */
function sbloccaServizi() {
    document.querySelectorAll('.map-consent').forEach(box => {
        const iframe = box.querySelector('.map-frame');
        if (iframe && !iframe.src) iframe.src = MAPPA_URL;
        box.classList.add('is-unlocked');
    });
}

function bloccaServizi() {
    document.querySelectorAll('.map-consent').forEach(box => {
        const iframe = box.querySelector('.map-frame');
        if (iframe) iframe.removeAttribute('src');
        box.classList.remove('is-unlocked');
    });
}