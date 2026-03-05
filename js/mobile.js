'use strict';

const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// on mobile, collapse sidebar after selecting a location

document.addEventListener("click", (e) => {
  if (sidebar && e.target.classList.contains("filter")) {
    sidebar.classList.remove("active");
  }
});
