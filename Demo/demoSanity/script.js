document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNavbar');

    // 1. Gestione dello scroll per cambiare stile alla Navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Effetto Parallasse leggero sulla Hero
    window.addEventListener('scroll', function() {
        const scrollValue = window.scrollY;
        const hero = document.querySelector('.hero');
        // Verifichiamo che la hero esista nella pagina per evitare errori
        if (hero) {
            hero.style.backgroundPositionY = (scrollValue * 0.5) + 'px';
        }
    });

    // 3. Effetto scroll fluido per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

