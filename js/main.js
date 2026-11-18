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
