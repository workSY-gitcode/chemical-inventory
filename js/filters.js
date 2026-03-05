'use strict';

let activeLocation = "all";

// helper: canonicalize location strings for comparison
const normalizeLocation = s => (s || "").toString().trim().toLowerCase().replace(/^['"]|['"]$/g, "");

// wire up the search box to run filtering on input
const searchInputElem = document.getElementById("searchInput");
if (searchInputElem) searchInputElem.addEventListener("input", applyFilters);

function buildLocationFilters() {
  const box = document.getElementById("locationFilters");
  if (!box) return;
  box.innerHTML = "";

  // build buttons for each storage section (fixed list)
  const sections = [
    "Section 6 - Lower Rack",
    "Section 9 - Lower Rack",
    "Section 10 - Lower Rack",
    "Section 11 - Lower Rack",
    "Section 11 - Middle Rack",
    "Section 12 - Lower Rack",
    "Section 12 - Middle Rack",
    "Section 12 - Upper Rack",
    "Section 13 - Lower Rack",
    "Section 14 - Lower Rack",
    "Section 14 - Middle Rack",
    "Section 14 - Upper Rack",
    "Section 15",
    "Section 17 - Lower Rack",
    "Section 17 - Middle Rack",
    "Refrigerator 1"
  ];

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = "filter active";
  allBtn.onclick = () => {
    activeLocation = "all";
    document.getElementById("searchInput").value = "";
    setActiveLocation(allBtn);
    applyFilters();
  };
  box.appendChild(allBtn);

  sections.forEach(section => {
    const btn = document.createElement("button");
    btn.className = "filter";
    btn.textContent = section;

    btn.onclick = () => {
      activeLocation = section;
      document.getElementById("searchInput").value = "";
      setActiveLocation(btn);
      applyFilters();
    };

    box.appendChild(btn);
  });
}

function setActiveLocation(activeBtn) {
  document
    .querySelectorAll("#locationFilters .filter")
    .forEach(b => b.classList.remove("active"));
  activeBtn.classList.add("active");
}

function applyFilters(exactSearch = false) {
  const inputElem = document.getElementById("searchInput");
  const query = inputElem ? inputElem.value.trim().toLowerCase() : "";

  let filtered = [];

  if (exactSearch && query) {
    // exact match first, then prefix, then substring
    const exact = chemicals.filter(c => c.Chemical_Name.toLowerCase() === query);
    if (exact.length) filtered = exact;
    else {
      const starts = chemicals.filter(c => c.Chemical_Name.toLowerCase().startsWith(query));
      if (starts.length) filtered = starts;
      else filtered = chemicals.filter(c => c.Chemical_Name.toLowerCase().includes(query));
    }
  } else {
    filtered = chemicals.filter(c => {
      const name = (c.Chemical_Name || "").toString().toLowerCase();
      const composition = (c.Formula_Composition || "").toString().toLowerCase();
      return query === "" || name.includes(query) || composition.includes(query);
    });
  }

  // then apply the selected location constraint
  const beforeLocationFilter = filtered.length;
  filtered = filtered.filter(c => {
    if (activeLocation === "all") return true;
    const chemicalLoc = normalizeLocation(c.Location);
    const activeLoc = normalizeLocation(activeLocation);
    return chemicalLoc === activeLoc;
  });


  document.getElementById("resultCount").textContent = `${filtered.length} chemicals found`;
  renderChemicals(filtered);
}


