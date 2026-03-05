'use strict';

function renderChemicals(list) {
  const box = document.getElementById("results");
  if (!box) return;
  box.innerHTML = "";

  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "chemical";
    div.innerHTML = `
      <h3>${c.Chemical_Name}</h3>
      <p><b>Formula:</b> ${c.Formula_Composition}</p>
      <p><b>Location:</b> ${c.Location}</p>
      <p><b>Stock:</b> ${c.Stock_Status}</p>
      <p><b>Hazard:</b> ${c.Hazard_Status}</p>
      <small>${c.Description}</small>
    `;
    box.appendChild(div);
  });
}
