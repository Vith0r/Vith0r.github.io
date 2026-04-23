function initHome() {
    (() => {
        const PAGE_SIZE = 3;
        const root = document.querySelector("[data-home-posts]");
        const paginator = document.querySelector("[data-home-posts] ~ .page__actions .np");
        if (!root || !paginator) return;
        const paginatorEl = /** @type {HTMLElement} */ (paginator);

        const postList = root.querySelector(".post-preview__list--col");
        /** @type {HTMLElement[]} */
        // @ts-ignore
        const items = postList ? Array.from(postList.children) : [];
        if (!items.length) return;

        const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
        let currentPage = 1;

        // Mark container as JS-controlled so CSS nth-child rule is overridden
        root.setAttribute("data-js-pagination", "true");

        function showPage(page) {
            currentPage = Math.min(Math.max(1, page), totalPages);
            const start = (currentPage - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;

            items.forEach((node, idx) => {
                const show = idx >= start && idx < end;
                /** @type {HTMLElement} */ (node).style.display = show ? "flex" : "none";
            });

            paginatorEl.querySelectorAll("[data-page]").forEach((btn) => {
                const n = Number(btn.getAttribute("data-page"));
                const active = n === currentPage;
                btn.classList.toggle("np__link--active", active);
                if (active) btn.setAttribute("aria-current", "page");
                else btn.removeAttribute("aria-current");
            });
        }

        paginatorEl.addEventListener("click", (e) => {
            const t = e.target instanceof Element ? e.target.closest("[data-page]") : null;
            if (!t) return;
            e.preventDefault();
            const n = Number(t.getAttribute("data-page"));
            if (!Number.isFinite(n)) return;
            showPage(n);
        });

        showPage(1);
    })();
}

// Initialize on first load
initHome();

// Re-initialize when navigating with View Transitions
document.addEventListener("astro:page-load", initHome);
