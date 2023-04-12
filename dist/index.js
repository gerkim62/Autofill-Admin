const hamburger = document.querySelector("#hamburger");
const mobileNav = document.querySelector("#mobile-nav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

mobileNav.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
});
