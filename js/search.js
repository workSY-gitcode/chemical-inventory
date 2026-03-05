'use strict';

let selectedChemical = null;

// cached DOM elements for search UI
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
const searchBtn = document.getElementById("searchBtn");

// typing updates suggestions and refreshes the filtered list
if (searchInput) {
  searchInput.addEventListener("input", () => {
    selectedChemical = null;
    handleSuggestions();
    applyFilters();
  });

  // pressing Enter performs a precise match search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      selectedChemical = searchInput.value.trim().toLowerCase();
      if (suggestionsBox) suggestionsBox.style.display = "none";
      applyFilters(true);
    }
  });
}

// clicking the button also triggers exact-match filtering
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    if (searchInput) {
      selectedChemical = searchInput.value.trim().toLowerCase();
    }
    if (suggestionsBox) suggestionsBox.style.display = "none";
    applyFilters(true);
  });
}

// close dropdown when user clicks elsewhere
document.addEventListener("click", (e) => {
  if (!e.target.closest('.search-wrapper')) {
    suggestionsBox.style.display = 'none';
  }
});

function handleSuggestions() {
  if (!searchInput || !suggestionsBox) return;

  const query = searchInput.value.trim().toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = chemicals
    .filter(c => c.Chemical_Name.toLowerCase().includes(query))
    .slice(0, 5);

  matches.forEach(c => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = c.Chemical_Name;

    div.onclick = () => {
      searchInput.value = c.Chemical_Name;
      selectedChemical = c.Chemical_Name.toLowerCase();
      suggestionsBox.style.display = "none";
      applyFilters(true);
    };

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = matches.length ? "block" : "none";
}
