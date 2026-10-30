// NAVEGAÇÃO

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navbar.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
        closeMenu();
    });
});

document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
    }
});


// ARQUITETURA
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const images = carousel.querySelectorAll(".arquitetura-slides img");
    const dots = carousel.querySelectorAll(".carrossel-dots button");

    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        images[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");

        currentIndex = index;

        images[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % images.length;
        showSlide(nextIndex);
    }

    function startCarousel() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 4000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startCarousel();
        });
    });

    startCarousel();
});

// FAQ
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const pergunta = item.querySelector(".faq-pergunta");

    pergunta.addEventListener("click", () => {
        const estaAberto = item.classList.contains("aberto");

        faqItems.forEach((outroItem) => {
            outroItem.classList.remove("aberto");
            outroItem.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
        });

        if (!estaAberto) {
            item.classList.add("aberto");
            pergunta.setAttribute("aria-expanded", "true");
        }
    });
});