const menu = document.querySelector('.mobile-backdrop');
const openBtn = document.querySelector('.open-mobile-menu-btn');
const closeBtn = document.querySelector('.mobile-menu-close-btn');

  openBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  document.body.style.overflow = "hidden";
  closeBtn.addEventListener("click", closeModal);
});



const closeModal = () => {
  menu.classList.toggle("hidden");
  document.body.style.overflow = "scroll";
  removeEventListener('click', closeBtn);
}
