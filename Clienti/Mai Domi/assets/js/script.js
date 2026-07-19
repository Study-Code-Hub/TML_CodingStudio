document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GESTIONE NAVBAR ALLO SCROLL
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. SMOOTH SCROLL PER I LINK
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Se il link è solo "#", non fare nulla
            if (href === "#") return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. ANIMAZIONE CARD AL PASSAGGIO (Intersection Observer)
    const cardObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                cardObserver.unobserve(entry.target); // Ferma l'osservazione dopo l'animazione
            }
        });
    }, cardObserverOptions);

    document.querySelectorAll('.card').forEach(card => {
        // Setup iniziale per l'animazione
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        cardObserver.observe(card);
    });

    // 4. AZIONE CTA HERO
    const heroBtn = document.querySelector('.hero-btn');
    if(heroBtn) {
        heroBtn.addEventListener('click', () => {
            const contatti = document.querySelector('#contatti');
            if(contatti) contatti.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Funzione per scorrere la galleria con le frecce
function scrollGallery(direction) {
    const container = document.getElementById('galleryScroll');
    // Calcola quanto scorrere (circa la larghezza di un'immagine + lo spazio)
    // Su mobile scorre meno per adattarsi allo schermo
    const scrollAmount = window.innerWidth < 768 ? 300 : 420; 
    
    container.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const rejectBtn = document.getElementById("reject-cookies");
    const mapWrapper = document.getElementById("map-wrapper");
    const mapIframe = document.getElementById("google-map");
    const cookieWarning = document.getElementById("cookie-warning");

    // 1. Controlla la preferenza salvata
    const userConsent = localStorage.getItem("cookieConsent");

    // 2. COMPORTAMENTO AL CARICAMENTO DELLA PAGINA
    if (userConsent === "accepted") {
        // Ha già accettato: nascondi banner, mostra mappa
        if (cookieBanner) cookieBanner.style.display = "none";
        if (mapWrapper) mapWrapper.style.display = "block";
        loadGoogleMap();
    } else if (userConsent === "rejected") {
        // Ha già rifiutato: nascondi banner, nascondi l'intero blocco mappa
        if (cookieBanner) cookieBanner.style.display = "none";
        if (mapWrapper) mapWrapper.style.display = "none"; 
    } else {
        // Prima visita: mostra banner, mostra placeholder grigio (ma non carica Google)
        if (cookieBanner) cookieBanner.style.display = "flex";
        if (mapWrapper) mapWrapper.style.display = "block";
    }

    // 3. AZIONE: CLICK SU ACCETTA
    if (acceptBtn) {
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "accepted");
            if (cookieBanner) cookieBanner.style.display = "none";
            if (mapWrapper) mapWrapper.style.display = "block";
            loadGoogleMap(); // Carica fisicamente Google Maps
        });
    }

    // 4. AZIONE: CLICK SU RIFIUTA
    if (rejectBtn) {
        rejectBtn.addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "rejected");
            if (cookieBanner) cookieBanner.style.display = "none";
            if (mapWrapper) mapWrapper.style.display = "none"; // Fa sparire tutto all'istante
        });
    }

    // 5. FUNZIONE DI CARICAMENTO MAPPA
    function loadGoogleMap() {
        if (mapIframe && mapIframe.getAttribute("data-src")) {
            mapIframe.src = mapIframe.getAttribute("data-src"); // Inserisce il link reale
            mapIframe.style.display = "block";
            if (cookieWarning) cookieWarning.style.display = "none"; // Togle la scritta di avviso
            if (mapWrapper) mapWrapper.style.padding = "0"; // Toglie i bordi del placeholder
        }
    }
});