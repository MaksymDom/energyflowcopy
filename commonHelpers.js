import"./assets/header-6bdb2dfd.js";let e;window.location.pathname==="/src/favorites.html"&&(e=document.querySelector(".favorites-list"),t());function t(){const s=JSON.parse(localStorage.getItem("favorites"))||[];s.length===0?e.innerHTML=`
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
    `:e.innerHTML=s.map(a=>`
      <li class="favorites-item">
        <span>${a.name}</span>
      </li>
    `).join("")}
//# sourceMappingURL=commonHelpers.js.map
