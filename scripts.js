// 1. Efecto Glassmorphism en el Menú al hacer Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Animaciones de revelado al hacer Scroll (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal, .reveal-right');

const revealOptions = {
    threshold: 0.15, // El elemento aparece cuando el 15% es visible
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return; // Si no está en pantalla, no hace nada
        } else {
            entry.target.classList.add('active'); // Añade la clase que activa el CSS
            observer.unobserve(entry.target); // Deja de observar una vez que ya apareció
        }
    });
}, revealOptions);

// Aplicar el observador a todos los elementos seleccionados
revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// 3. Efecto Parallax súper suave en la imagen principal con el movimiento del ratón
document.addEventListener("mousemove", (e) => {
    const shoe = document.querySelector('.floating-shoe');
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    
    // Si la pantalla es grande, aplicamos el efecto
    if(window.innerWidth > 900) {
        shoe.style.transform = `rotate(-15deg) translate(${x}px, ${y}px)`;
    }
});