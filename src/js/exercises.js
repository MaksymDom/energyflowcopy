import star from '../images/svg/icon-star.svg';
import arrow from '../images/svg/icon-arrow.svg'
import man from '../images/svg/icon-man.svg'
import { filterExercises, getExercisesCards } from './api';
import axios from 'axios';
const btnFilterList = document.querySelector('.btn-wrapper');
const exFilterBtn = document.querySelectorAll('.exercises-btn-filter');
const exForm = document.querySelector('.exercises-form');
const exList = document.querySelector('.exercises-list');
const exPagination = document.querySelector('.exercises-pagination');
let span = document.querySelector('.span');
const secondSpan = document.querySelector('.second-span');
const exHeader = document.querySelector('.exercises-header');

let query = 'Muscles';

filterExercises(query).then(({ data: { results, totalPages } }) => {
  exFilterBtn[0].classList.add('is-active');
  exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
  renderPagBtn(totalPages);
});

btnFilterList.addEventListener('click', onFiltersBtnClick);

function onFiltersBtnClick(e) {
  span.classList.add('visually-hidden');
  const button = e.target;
  if (button.nodeName !== 'BUTTON') {
    return;
  }
  const activeFilterBtn = document.querySelector('.is-active');
  if (activeFilterBtn) {
    activeFilterBtn.classList.remove('is-active');
  }

  if (innerWidth >= 768 && innerWidth < 1440) {
    exHeader.style.marginBottom = '32px';
  }

  button.classList.add('is-active');
  query = button.textContent;

  filterExercises(query).then(({ data: { results, totalPages } }) => {
    exList.innerHTML = '';
    exList.insertAdjacentHTML('beforeend', renderFilterItems(results));

    renderPagBtn(totalPages);

    exForm.classList.add('visually-hidden');
  });
}

exList.addEventListener('click', onCardClick);

function onCardClick(e) {
  let exSubtype = e.target.dataset.name;
  let exFilter = e.target.dataset.filter;

  if (exFilter === 'bodyparts') {
    exFilter = 'bodypart';
  }

  if (e.target.nodeName === 'UL') {
    return;
  }

  exForm.classList.remove('visually-hidden');
  span.classList.remove('visually-hidden');
  secondSpan.textContent = exSubtype;

  exList.innerHTML = '';
  exPagination.innerHTML = '';

  getExercisesCards(exFilter, exSubtype).then(
    ({ data: { results, totalPages } }) => {
      exList.insertAdjacentHTML('beforeend', renderCards(results));
      renderPagBtn(totalPages);
      exPagination.firstChild.classList.add('active-pag-btn');
    }
  );
  if (innerWidth >= 768 && innerWidth < 1440) {
    exHeader.style.marginBottom = '55px';
  }
}

exPagination.addEventListener('click', onPagBtnClick);

function onPagBtnClick(e) {
  let page = e.target.textContent;
  //   let name = span.textContent;
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const activePagBtn = document.querySelector('.active-pag-btn');
  if (activePagBtn) {
    activePagBtn.classList.remove('active-pag-btn');
  }
  e.target.classList.add('active-pag-btn');

  fetchEx(query, page);
}

function renderFilterItems(data) {
  return data
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      ({ name, filter, imgUrl }) => `<li
          class="exercises-item"
          style="
          background:linear-gradient(0deg, rgba(16, 16, 16, 0.70) 0%, rgba(16, 16, 16, 0.70) 100%), url(${imgUrl});
          background-size: cover;
  background-repeat: no-repeat; 
          "
          data-name = "${name}"
          data-filter = "${filter.toLowerCase().split(' ').join('')}"
        >
        
          <p class="exercises-name" >${name}</p>
          <p class="exercises-text">${filter}</p>
          
        </li>`
    )
    .join('');
}

function renderPagBtn(totalPages) {
  const buttons = Array(totalPages)
    .fill()
    .map(
      (_, idx) =>
        `<button class = "exercises-pagination-btn" type = "button">${idx + 1
        }</button>`
    )
    .join('');
  exPagination.innerHTML = '';
  exPagination.insertAdjacentHTML('beforeend', buttons);
  exPagination.firstChild.classList.add('active-pag-btn');
}

/*
function fetchEx(name, page) {
  return fetch(
    `https://energyflow.b.goit.study/api/filters?filter=${name}&page=${page}&limit=12`
  )
    .then(res => res.json())
    .then(({ results }) => {
      exList.innerHTML = '';
      exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
    });
}
*/
function renderCards(card) {
  return card
    .map(
      ({ name, rating, burnedCalories, target, bodyPart, time }) => `<li
          class="workout-item"
          <div class="workout-card">    
      <div class="workout-header">
          <div class="workout-header-wrapper">
            <p class="workout-title">workout</p>
            <p class="workout-rating">${rating}</p>
              <svg
              class="workout-rating-icon"
              width="18"
              height="18"
            >
              <use href="${star}"></use>
            </svg>
          </div>
          <button
            class="workout-start-button"
            type="button"
          >
            Start
            <svg
              class="workout-icon-start"
              width="14"
              height="14"
            >
              <use href="${arrow}"></use>
            </svg>
          </button>
        </div>
        <div class="workout-name-wrapper">
          <svg
            class="workout-icon-man"
            width="24"
            height="24"
          >
            <use href="${man}"></use>
          </svg>
          <p class="workout-name">${name}</p>
        </div>
        
        <div class="workout-inform-wrapper">

        <p class="workout-calories">
            Burned calories:
            <span class="number-calories">${burnedCalories} / ${time} min</span>
          </p>

        <p class="workout-body-part">
            Body part:
            <span class="body-part">${bodyPart}</span>
          </p>
        
          <p class="workout-target">
            Target: <span class="target">${target}</span>
          </p>
        
          </div>
          </div>
            
      `
    )
    .join('');
} 

// Отримання значень фільтру та підвиду з API
function getFilterAndSubtypeInfo() {
  return axios.get('filterInfo')
    .then(response => {
      return {
        filter: response.data.filter,
        subtype: response.data.subtype
      };
    })
    .catch(error => {
      console.error('Error fetching filter and subtype info:', error);
    });
}

// Обробник події відправки форми пошуку
function onexFormSubmit(e) {
  e.preventDefault();

  // Отримання значень фільтру та підвиду з API
  getFilterAndSubtypeInfo().then(({ filter, subtype }) => {
    const keyword = searchInput.value.trim();
    const page = 1; // Починаємо з першої сторінки

    // Викликаємо функцію для виконання пошуку з урахуванням усіх параметрів
    performSearch(keyword, filter, subtype, page);
  });
}

// Додавання обробника події відправки форми
exForm.addEventListener('submit', onexFormSubmit);

// Оновлення функції пошуку для використання всіх параметрів
function performSearch(keyword, filter, subtype, page) {
  // Викликаємо функцію для виконання пошуку
  filterExercises(keyword, filter, subtype, page).then(({ data: { results, totalPages } }) => {
    // Виводимо результати на сторінці
    exList.innerHTML = '';
    exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
    renderPagBtn(totalPages);
    exForm.classList.add('visually-hidden');
  });
}

// Оновлення функції отримання вправ по сторінках
function fetchEx(name, page) {
  return fetch(`https://energyflow.b.goit.study/api/filters?filter=${name}&page=${page}&limit=12`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(({ results }) => {
      exList.innerHTML = '';
      exList.insertAdjacentHTML('beforeend', renderFilterItems(results));
    })
    .catch(error => {
      console.error('Error fetching exercises:', error);
    });
}