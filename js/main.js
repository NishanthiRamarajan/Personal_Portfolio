// Mobile navigation

const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".navbar__link");

function setMenu(open) {

    if (!toggle || !menu) return;

    menu.classList.toggle("is-open", open);

    toggle.setAttribute("aria-expanded", String(open));

    toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
    );
}

// Open and close hamburger menu

if (toggle && menu) {

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("is-open");

        setMenu(!isOpen);
    });

    // Close menu after clicking a navigation link

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            setMenu(false);
        });

    });

    // Close menu using Escape key

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            setMenu(false);
        }

    });

}


/* =========================================
   FEATURE 02 - HERO DESIGNATIONS
========================================= */

const designationToggle = document.getElementById("designationToggle");
const personArea = document.querySelector(".hero__person-area");

if (designationToggle && personArea) {

    designationToggle.addEventListener("click", () => {

        const active = personArea.classList.toggle("is-active");

        designationToggle.setAttribute(
            "aria-expanded",
            String(active)
        );

        designationToggle.setAttribute(
            "aria-label",
            active ? "Hide my designations" : "Reveal my designations"
        );

    });

}

/* =========================================
   FEATURE 03 - SCROLL REVEAL
========================================= */

// Enable JavaScript-specific reveal styles
document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });

}

/* =========================================
   FEATURE 04 - JOURNEY SHOW MORE / LESS
========================================= */

const journeyButtons = document.querySelectorAll(".journey__toggle");

journeyButtons.forEach((button) => {

    const extraContent = button.previousElementSibling;

    const label = button.querySelector(".journey__toggle-text");

    if (!extraContent || !label) return;

    button.addEventListener("click", () => {

        const expanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

        extraContent.hidden = expanded;

        label.textContent = expanded
            ? "Show more"
            : "Show less";

    });

});


/* =========================================
   FEATURE 05 - SHARED PHOTO LIGHTBOX
========================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCaption = document.querySelector(".lightbox__caption");
const lightboxClose = document.querySelector(".lightbox__close");

// Open the photo viewer when a gallery image is clicked

document.addEventListener("click", (event) => {

    const photoButton = event.target.closest("[data-image]");

    if (!photoButton || !lightbox || !lightboxImage) {
        return;
    }

    lightboxImage.src = photoButton.dataset.image;

    const thumbnail = photoButton.querySelector("img");

    lightboxImage.alt = thumbnail
        ? thumbnail.alt
        : photoButton.dataset.caption || "Gallery photograph";

    if (lightboxCaption) {
        lightboxCaption.textContent =
            photoButton.dataset.caption || "";
    }

    if (!lightbox.open) {
        lightbox.showModal();
    }

});

// Close using the close button

if (lightbox && lightboxClose) {

    lightboxClose.addEventListener("click", () => {
        lightbox.close();
    });

    // Close when clicking outside the photograph

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            lightbox.close();
        }

    });

    // Clear the old image after closing

    lightbox.addEventListener("close", () => {

        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";

        if (lightboxCaption) {
            lightboxCaption.textContent = "";
        }

    });

}

/* =========================================
   FEATURE 06 - FAMILY FLIP CARDS
========================================= */

const familyCards = document.querySelectorAll(".flip");

familyCards.forEach((card) => {

    card.addEventListener("click", () => {

        const flipped = card.classList.toggle("is-flipped");

        card.setAttribute(
            "aria-pressed",
            String(flipped)
        );

    });

});
