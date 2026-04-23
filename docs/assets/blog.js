function initBlogPagination() {
  const PAGE_SIZE = 10;
  const root = document.querySelector("[data-blog-posts]");
  const paginator = document.querySelector("[data-blog-posts] ~ .page__actions .np");

  if (!root || !paginator) return;

  const paginatorEl = /** @type {HTMLElement} */ (paginator);
  const rowContainer = root.querySelector("tbody");
  // @ts-ignore
  const rows = rowContainer ? Array.from(rowContainer.children) : [];

  if (!rows.length) return;

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  let currentPage = 1;

  function showPage(page) {
    currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    rows.forEach((node, idx) => {
      const show = idx >= start && idx < end;
      /** @type {HTMLElement} */ (node).style.display = show ? "table-row" : "none";
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
    const target = e.target instanceof Element ? e.target.closest("[data-page]") : null;
    if (!target) return;
    e.preventDefault();
    const page = Number(target.getAttribute("data-page"));
    if (!Number.isFinite(page)) return;
    showPage(page);
  });

  showPage(1);
}

initBlogPagination();
document.addEventListener("astro:page-load", initBlogPagination);
