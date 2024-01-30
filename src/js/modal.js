import iziToast from "izitoast";
import { getExercise } from './api'


const backDrop = document.querySelector('.backdrop');



// RENDER //

export async function renderExercise(_id) {

  document.body.style.overflow = "hidden"

  backDrop.classList.remove('visually-hidden');

  const exerciseModalData = await getExercise(_id).then(res => res.data);

  backDrop.innerHTML = makeExerciseCard(exerciseModalData);

  // ADD TO FAVORITES //

  const addToFavoritesBtn = document.querySelector('.modal-btn-favorites');

  addToFavoritesBtn.addEventListener('click', addToFavoritesClickHandler);

  function addToFavoritesClickHandler(e) {
    e.preventDefault();

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const index = favorites.findIndex((exercise) => {
      return String(exercise._id) === String(exerciseModalData._id);
    });

    console.log(index);

    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      addToFavoritesBtn.innerHTML = checkExerciseIsFavorite(exerciseModalData._id);
      iziToast.show({
        message: 'The exercise has been removed from favorites',
        messageColor: '#f7f7fc',
        backgroundColor: '#3939db',
        position: 'topRight'
      });
    } else {
      favorites.push(exerciseModalData);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      addToFavoritesBtn.innerHTML = checkExerciseIsFavorite(exerciseModalData._id);
      iziToast.show({
        message: 'The exercise has been added to favorites',
        messageColor: '#f7f7fc',
        backgroundColor: '#219c2b',
        position: 'topRight'
      });
    }
  };


  // CLOSE MODAL //

  function closeModal() {
    backDrop.innerHTML = '';
    backDrop.classList.add('visually-hidden');
    addToFavoritesBtn.removeEventListener('click', addToFavoritesClickHandler);
    closeBtn.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', escapeKeyHandler);
    backDrop.removeEventListener('click', backdropClickHandler);
    document.body.style.overflow = 'visible';
  }

  const closeBtn = document.querySelector('.modal-btn-close');
  closeBtn.addEventListener('click', closeModal);

  function escapeKeyHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  document.addEventListener('keydown', escapeKeyHandler);

  function backdropClickHandler(e) {
    if (e.target === backDrop) {
      closeModal();
    }
  };

  backDrop.addEventListener('click', backdropClickHandler);
};

function makeExerciseCard({
  gifUrl, name, rating, target, bodyPart, equipment,
  popularity, burnedCalories, time, description, _id
}) {
  const parsedRating = Math.round(parseFloat(rating));

  const stars = Array.from({ length: 5 }, (_, starIndex) => `
        <li>
          <svg class="modal-rating-stars-svg" width="18" height="18">
            <use href="./images/icons.svg#icon-star"></use>
          </svg>
        </li>
      `).map((star, starIndex) => {
    if (starIndex < parsedRating) {
      return star.replace('<svg', '<svg class="modal-rating-stars-svg is-active"');
    }
    return star;
  }).join('');

  return `
        <div class="modal-window">
    <div>
      <button class="modal-btn-close" type="button">
        <svg class="modal-btn-close-svg" width="28" height="28">
          <use href="./images/icons.svg#icon-close" aria-label="icon-close"></use>
        </svg>
      </button>
    </div>
        <div class="modal-tablet-pc-ver">
          <div class="modal-video"><img src="${gifUrl}" alt="Animated GIF"></div>
          <div>
            <h1 class="modal-title">${name}</h1>
            <div class="modal-rating">
              <p class="modal-rating-numbers">${parsedRating}</p>
              <ul class="modal-rating-stars">
                ${stars}
              </ul>
            </div>
            <div class="modal-info">
              <ul class="modal-info-list">
                <li>
                  <h3 class="modal-info-list-title">Target</h3>
                  <p class="modal-info-list-title-value">${target}</p>
                </li>
                <li>
                  <h3 class="modal-info-list-title">Body Part</h3>
                  <p class="modal-info-list-title-value">${bodyPart}</p>
                </li>
                <li>
                  <h3 class="modal-info-list-title">Equipment</h3>
                  <p class="modal-info-list-title-value">${equipment}</p>
                </li>
                <li>
                  <h3 class="modal-info-list-title">Popular</h3>
                  <p class="modal-info-list-title-value">${popularity}</p>
                </li>
                <li>
                  <h3 class="modal-info-list-title">Burned Calories</h3>
                  <p class="modal-info-list-title-value">${burnedCalories}/${time} min</p>
                </li>
              </ul>
            </div>
            <p class="descr">${description}</p>
          </div>
        </div>
            <div class="modal-btns">
      <button class="modal-btn-favorites" type="button">
        ${checkExerciseIsFavorite(_id)}
      </button>
    </div>
  </div>
      `;
}

function checkExerciseIsFavorite(_id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const index = favorites.findIndex((exercise) => String(exercise._id) === String(_id));

  if (index === -1) {
    return `Add to favorites <div>
          <svg class="modal-btn-favorites-svg">
            <use href="./images/icons.svg#icon-heart" aria-label="icon-heart"></use>
          </svg>
        </div>`
  } else {
    return `Remove from <div>
          <svg class="modal-btn-favorites-svg">
            <use href="./images/icons.svg#icon-heart" aria-label="icon-heart"></use>
          </svg>
        </div>`
  }
}