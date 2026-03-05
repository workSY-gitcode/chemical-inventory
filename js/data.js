'use strict';

let chemicals = [];

fetch("chemical-inventory-data-final.json")
  .then(res => res.json())
  .then(data => {
    chemicals = data;
    buildLocationFilters();
    updateStats();
    // After loading data, run the filter routine so the page reflects the default view
    if (typeof applyFilters === 'function') applyFilters();
  });
