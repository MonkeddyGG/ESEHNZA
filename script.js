document.addEventListener("DOMContentLoaded", () => {

    /* 1. Header Transparente -> Sólido al hacer scroll */
    const header = document.getElementById("header");

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Revisar al cargar la página por si ya está scrolleada

    /* 2. Menú Móvil Full-Screen fluido */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    const toggleMenu = () => {
        mobileMenu.classList.toggle("active");
        navLinks.classList.toggle("active");

        // Bloquear/Desbloquear el scroll del fondo
        if (navLinks.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    mobileMenu.addEventListener("click", toggleMenu);

    // Cerrar menú móvil al hacer clic en cualquier link
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    });

    /* 3. Animaciones Suaves al hacer Scroll (Intersection Observer) */
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        root: null,
        threshold: 0.1, // Elemento visible al 10%
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optimización: Dejar de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

});