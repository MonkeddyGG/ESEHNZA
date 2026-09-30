document.addEventListener("DOMContentLoaded", () => {

    /* 1. Header que cambia al hacer scroll */
    const header = document.getElementById("header");
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    /* 2. Menú Móvil Full-Screen fluido */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    const toggleMenu = () => {
        mobileMenu.classList.toggle("active");
        navLinks.classList.toggle("active");
        // Prevenir scroll en el body cuando el menú móvil está abierto
        document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
    };

    mobileMenu.addEventListener("click", toggleMenu);

    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        });
    });

    /* 3. Lógica de Filtros en la Galería */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar clase activa de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar activa al que se dio click
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    // Animación suave al aparecer
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    // Animación suave al desaparecer
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    /* 4. Animaciones Suaves al hacer Scroll (Intersection Observer) */
    const reveals = document.querySelectorAll(".reveal");
    const revealOptions = {
        root: null,
        threshold: 0.1, // 10% del elemento visible para activar
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Dejar de observar para mejor rendimiento
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

});