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