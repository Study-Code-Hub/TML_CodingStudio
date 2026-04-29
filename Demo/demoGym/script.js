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