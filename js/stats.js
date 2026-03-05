'use strict';

function updateStats() {
  const totalElem = document.getElementById("totalCount");
  const carcinogenElem = document.getElementById("carcinogenCount");
  const flammableElem = document.getElementById("flammableCount");
  const inflammableElem = document.getElementById("inflammableCount");

  if (totalElem) totalElem.textContent = chemicals.length;
  // compare Hazard_Status in lowercase to avoid case/spacing differences
  if (carcinogenElem)
    carcinogenElem.textContent =
      chemicals.filter(c => {
        const st = (c.Hazard_Status || "").toString().trim().toLowerCase();
        return st === "carcinogen";
      }).length;
  if (flammableElem)
    flammableElem.textContent =
      chemicals.filter(c => {
        const st = (c.Hazard_Status || "").toString().trim().toLowerCase();
        return st === "flammable";
      }).length;
  if (inflammableElem)
    inflammableElem.textContent =
      chemicals.filter(c => {
        const st = (c.Hazard_Status || "").toString().trim().toLowerCase();
        return st === "inflammable";
      }).length;
}
