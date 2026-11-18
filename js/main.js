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