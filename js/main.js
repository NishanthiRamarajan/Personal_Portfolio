/* =====================================================
   MAIN.JS — all interactions for the single-page site.
   Every feature checks that its elements exist first.
   ===================================================== */
(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Navigation: mobile menu ---------- */
    const header = $(".site-header");
    const toggle = $("#navToggle");
    const menu = $("#navLinks");

    const setMenu = (open) => {
        if (!menu || !toggle) return;
        menu.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    };

    if (menu && toggle) {
        toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
        $$(".navbar__link").forEach((link) => link.addEventListener("click", () => setMenu(false)));
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("is-open")) {
                setMenu(false);
                toggle.focus();
            }
        });
    }

    /* ---------- Navigation: transparent, adaptive colour ---------- */
    const toneZones = $$("[data-tone]").filter((el) => el !== header);
    let scrollTicking = false;

    const updateHeader = () => {
        scrollTicking = false;
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 20);
        const probe = header.offsetHeight / 2;
        const zone = toneZones.find((el) => {
            const box = el.getBoundingClientRect();
            return box.top <= probe && box.bottom > probe;
        });
        if (zone) header.dataset.tone = zone.dataset.tone;
    };

    if (header) {
        window.addEventListener("scroll", () => {
            if (!scrollTicking) {
                scrollTicking = true;
                window.requestAnimationFrame(updateHeader);
            }
        }, { passive: true });
        window.addEventListener("resize", updateHeader);
        updateHeader();
    }

    /* ---------- Active navigation link ---------- */
    const navLinks = $$(".navbar__link");
    const sections = navLinks.map((link) => $(link.getAttribute("href"))).filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${entry.target.id}`;
                    link.classList.toggle("active", isActive);
                    if (isActive) link.setAttribute("aria-current", "true");
                    else link.removeAttribute("aria-current");
                });
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach((section) => sectionObserver.observe(section));
    }

    /* ---------- Scroll-triggered reveal ---------- */
    const revealItems = $$(".reveal");

    if (revealItems.length) {
        if ("IntersectionObserver" in window && !reduceMotion) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12 });
            revealItems.forEach((item) => revealObserver.observe(item));
        } else {
            revealItems.forEach((item) => item.classList.add("is-visible"));
        }
    }

    /* ---------- Hero: floating designations ---------- */
    const designationToggle = $("#designationToggle");
    const personArea = $(".hero__person-area");

    if (designationToggle && personArea) {
        designationToggle.addEventListener("click", () => {
            const active = personArea.classList.toggle("is-active");
            designationToggle.setAttribute("aria-expanded", String(active));
            designationToggle.setAttribute("aria-label", active ? "Hide my designations" : "Reveal my designations");
        });
    }

    /* ---------- Journey: show more / show less ---------- */
    $$(".journey__toggle").forEach((button) => {
        const extra = button.previousElementSibling;
        const label = $(".journey__toggle-text", button);
        if (!extra || !label) return;
        button.addEventListener("click", () => {
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            extra.hidden = expanded;
            label.textContent = expanded ? "Show more" : "Show less";
        });
    });

    /* ---------- Family: flip cards ---------- */
    $$(".flip").forEach((card) => {
        card.addEventListener("click", () => {
            const flipped = card.classList.toggle("is-flipped");
            card.setAttribute("aria-pressed", String(flipped));
        });
    });

    /* ---------- Shared photo lightbox (Interests + Hobbies) ---------- */
    const lightbox = $("#lightbox");
    const lightboxImage = $(".lightbox__image");
    const lightboxCaption = $(".lightbox__caption");
    const lightboxClose = $(".lightbox__close");

    if (lightbox && lightboxImage && lightboxCaption && lightboxClose && typeof lightbox.showModal === "function") {
        $$("[data-image]").forEach((button) => {
            button.addEventListener("click", () => {
                const thumb = $("img", button);
                lightboxImage.src = button.dataset.image;
                lightboxImage.alt = thumb ? thumb.alt : button.dataset.caption || "";
                lightboxCaption.textContent = button.dataset.caption || "";
                lightbox.showModal();
            });
        });
        lightboxClose.addEventListener("click", () => lightbox.close());
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) lightbox.close();
        });
        lightbox.addEventListener("close", () => {
            lightboxImage.removeAttribute("src");
            lightboxImage.alt = "";
            lightboxCaption.textContent = "";
        });
    }

    /* ---------- Footer: year and back to top ---------- */
    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    const backToTop = $("#backToTop");
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        });
    }
})();