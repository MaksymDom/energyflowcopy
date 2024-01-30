/*let favoritesList;
let paginationButtons;

const itemsPerPage = 6;
if (window.location.pathname === './src/favorites.html') {
  favoritesList = document.querySelector('.workout-item');
  paginationButtons = document.querySelectorAll(
    '.favorites-pagination-block button'
  );
  showPage(1);
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const pageNumber = parseInt(button.textContent);
      showPage(pageNumber);
    });
  });
}

function showPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const items = favoritesList.querySelectorAll('.workout-list');
  items.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  paginationButtons.forEach(button => {
    if (parseInt(button.textContent) === pageNumber) {
      button.classList.add('active-btn');
    } else {
      button.classList.remove('active-btn');
    }
  });
}*/

let favoritesList;

if (window.location.pathname === '/src/favorites.html') {
  favoritesList = document.querySelector('.favorites-list');
  displayFavorites();
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <div class="message-info">
        <div class="message-info-block">
          <img class="message-info-svg" src="./images/favorites/dumbbell.jpg" alt="dumbbell" />
          <p class="message-info-text">
            It appears that you haven't added any exercises to your favorites yet. To get
            started, you can add exercises that you like to your favorites for easier
            access in the future.
          </p>
        </div>
      </div>
    `;
  } else {

    favoritesList.innerHTML = favorites.map(exercise => `
      <li class="favorites-item">
        <span>${exercise.name}</span>
      </li>
    `).join('');
  }
}