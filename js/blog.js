/**
 * WEBORA — Blog Search & Category Filter System
 */

document.addEventListener("DOMContentLoaded", () => {
  initBlogFilter();
  initTableOfContents();
});

function initBlogFilter() {
  const searchInput = document.querySelector("#blogSearchInput");
  const filterPills = document.querySelectorAll(".blog-filter-pill");
  const blogCards = document.querySelectorAll(".blog-card");
  const noResultsMsg = document.querySelector("#blogNoResults");

  if (!blogCards.length) return;

  let currentCategory = "all";
  let searchQuery = "";

  const applyFilters = () => {
    let visibleCount = 0;

    blogCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category") || "";
      const title = card.querySelector(".blog-card-title")?.textContent.toLowerCase() || "";
      const excerpt = card.querySelector(".blog-card-excerpt")?.textContent.toLowerCase() || "";
      const tags = card.getAttribute("data-tags")?.toLowerCase() || "";

      const matchesCategory = currentCategory === "all" || cardCategory.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = searchQuery === "" || title.includes(searchQuery) || excerpt.includes(searchQuery) || tags.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-category");
      applyFilters();
    });
  });
}

function initTableOfContents() {
  const tocList = document.querySelector("#articleTocList");
  const articleBody = document.querySelector(".article-content");

  if (!tocList || !articleBody) return;

  const headings = articleBody.querySelectorAll("h2, h3");
  if (!headings.length) return;

  tocList.innerHTML = "";
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `section-${index + 1}`;
    }

    const li = document.createElement("li");
    li.className = heading.tagName.toLowerCase() === "h3" ? "toc-sub-item" : "toc-item";
    
    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.className = "toc-link";
    a.textContent = heading.textContent;

    li.appendChild(a);
    tocList.appendChild(li);
  });
}
