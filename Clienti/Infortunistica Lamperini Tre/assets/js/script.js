document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestione Menu Hamburger
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
        });
        
        // Chiude il menu dopo il clic su un link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mainNav.classList.remove('open');
            });
        });
    }

    // 2. Gestione Carosello Manuale (solo se esistono i bottoni nella pagina)
    const slides = document.querySelectorAll('.carousel-item');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (slides.length > 0 && nextBtn && prevBtn) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            if (index >= slides.length) currentSlide = 0;
            if (index < 0) currentSlide = slides.length - 1;
            slides[currentSlide].classList.add('active');
        }

        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
    }
});