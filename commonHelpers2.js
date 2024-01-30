import"./assets/header-6bdb2dfd.js";import{a as y,i as b}from"./assets/vendor-0a7943b3.js";document.addEventListener("DOMContentLoaded",async function(){try{const t=localStorage.getItem("quote"),e=localStorage.getItem("quoteDate");if(t&&e&&new Date().toISOString().split("T")[0]===e)w(JSON.parse(t));else{const r=await k();w(r)}}catch(t){console.error("Error:",t)}});async function k(){try{const{author:t,quote:e}=await q();return localStorage.setItem("quote",JSON.stringify({author:t,quote:e})),localStorage.setItem("quoteDate",new Date().toISOString().split("T")[0]),{author:t,quote:e}}catch(t){throw t}}function w(t){const e=document.querySelector(".quot-text"),r=document.querySelector(".quot-author");e.textContent=t.quote,r.textContent=t.author}async function q(){try{const t=await fetch("https://energyflow.b.goit.study/api/quote");if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return await t.json()}catch(t){throw console.error("Error fetching quote:",t),t}}const T="/goit-energy-flow/assets/icon-star-e7c78166.svg",E="/goit-energy-flow/assets/icon-arrow-f3785760.svg",$="/goit-energy-flow/assets/icon-man-121a017f.svg",v="https://energyflow.b.goit.study/api/";async function C(t,e,r,n){return await y(`${v}exercises`,{method:"get",params:{[t]:e,keyword:n,totalPages:r,limit:9}})}async function h(t){return await y(`${v}filters`,{method:"get",params:{filter:t,limit:12}})}const B=document.querySelector(".btn-wrapper"),H=document.querySelectorAll(".exercises-btn-filter"),l=document.querySelector(".exercises-form"),o=document.querySelector(".exercises-list"),a=document.querySelector(".exercises-pagination");let S=document.querySelector(".span");const j=document.querySelector(".second-span"),L=document.querySelector(".exercises-header");let c="Muscles";h(c).then(({data:{results:t,totalPages:e}})=>{H[0].classList.add("is-active"),o.insertAdjacentHTML("beforeend",u(t)),d(e)});B.addEventListener("click",M);function M(t){S.classList.add("visually-hidden");const e=t.target;if(e.nodeName!=="BUTTON")return;const r=document.querySelector(".is-active");r&&r.classList.remove("is-active"),innerWidth>=768&&innerWidth<1440&&(L.style.marginBottom="32px"),e.classList.add("is-active"),c=e.textContent,h(c).then(({data:{results:n,totalPages:s}})=>{o.innerHTML="",o.insertAdjacentHTML("beforeend",u(n)),d(s),l.classList.add("visually-hidden")})}o.addEventListener("click",A);function A(t){let e=t.target.dataset.name,r=t.target.dataset.filter;r==="bodyparts"&&(r="bodypart"),t.target.nodeName!=="UL"&&(l.classList.remove("visually-hidden"),S.classList.remove("visually-hidden"),j.textContent=e,o.innerHTML="",a.innerHTML="",C(r,e).then(({data:{results:n,totalPages:s}})=>{o.insertAdjacentHTML("beforeend",F(n)),d(s),a.firstChild.classList.add("active-pag-btn")}),innerWidth>=768&&innerWidth<1440&&(L.style.marginBottom="55px"))}a.addEventListener("click",I);function I(t){let e=t.target.textContent;if(t.target.nodeName!=="BUTTON")return;const r=document.querySelector(".active-pag-btn");r&&r.classList.remove("active-pag-btn"),t.target.classList.add("active-pag-btn"),N(c,e)}function u(t){return t.sort((e,r)=>e.name.localeCompare(r.name)).map(({name:e,filter:r,imgUrl:n})=>`<li
          class="exercises-item"
          style="
          background:linear-gradient(0deg, rgba(16, 16, 16, 0.70) 0%, rgba(16, 16, 16, 0.70) 100%), url(${n});
          background-size: cover;
  background-repeat: no-repeat; 
          "
          data-name = "${e}"
          data-filter = "${r.toLowerCase().split(" ").join("")}"
        >
        
          <p class="exercises-name" >${e}</p>
          <p class="exercises-text">${r}</p>
          
        </li>`).join("")}function d(t){const e=Array(t).fill().map((r,n)=>`<button class = "exercises-pagination-btn" type = "button">${n+1}</button>`).join("");a.innerHTML="",a.insertAdjacentHTML("beforeend",e),a.firstChild.classList.add("active-pag-btn")}function F(t){return t.map(({name:e,rating:r,burnedCalories:n,target:s,bodyPart:f,time:x})=>`<li
          class="workout-item"
          <div class="workout-card">    
      <div class="workout-header">
          <div class="workout-header-wrapper">
            <p class="workout-title">workout</p>
            <p class="workout-rating">${r}</p>
              <svg
              class="workout-rating-icon"
              width="18"
              height="18"
            >
              <use href="${T}"></use>
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
              <use href="${E}"></use>
            </svg>
          </button>
        </div>
        <div class="workout-name-wrapper">
          <svg
            class="workout-icon-man"
            width="24"
            height="24"
          >
            <use href="${$}"></use>
          </svg>
          <p class="workout-name">${e}</p>
        </div>
        
        <div class="workout-inform-wrapper">

        <p class="workout-calories">
            Burned calories:
            <span class="number-calories">${n} / ${x} min</span>
          </p>

        <p class="workout-body-part">
            Body part:
            <span class="body-part">${f}</span>
          </p>
        
          <p class="workout-target">
            Target: <span class="target">${s}</span>
          </p>
        
          </div>
          </div>
            
      `).join("")}function O(){return y.get("filterInfo").then(t=>({filter:t.data.filter,subtype:t.data.subtype})).catch(t=>{console.error("Error fetching filter and subtype info:",t)})}function P(t){t.preventDefault(),O().then(({filter:e,subtype:r})=>{const n=searchInput.value.trim();D(n)})}l.addEventListener("submit",P);function D(t,e,r,n){h(t).then(({data:{results:s,totalPages:f}})=>{o.innerHTML="",o.insertAdjacentHTML("beforeend",u(s)),d(f),l.classList.add("visually-hidden")})}function N(t,e){return fetch(`https://energyflow.b.goit.study/api/filters?filter=${t}&page=${e}&limit=12`).then(r=>{if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);return r.json()}).then(({results:r})=>{o.innerHTML="",o.insertAdjacentHTML("beforeend",u(r))}).catch(r=>{console.error("Error fetching exercises:",r)})}const p=document.querySelector(".footer-form"),W=document.querySelector(".footer-form-input"),Y=/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;p.addEventListener("submit",async function(t){t.preventDefault();const e=W.value.trim();if(!Y.test(e)){m(),p.reset();return}try{(await fetch("https://energyflow.b.goit.study/api/subscription",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})})).ok?(p.reset(),U()):m()}catch{m()}});function U(){b.info({title:"Info",message:"We're excited to have you on board! 🎉 Thank you for subscribing to new exercises on Energy Flow. You've just taken a significant step towards improving your fitness and well-being."})}function m(){b.error({title:"Error",message:"Sorry, there was an error sending your address. Please try again!"})}const i=document.querySelector(".scroll-container"),Q=document.querySelector(".scroll-btn");addEventListener("scroll",g,{once:!0});Q.addEventListener("click",z);function g(){window.scrollY>0?i.style.transform="translateY(0)":window.innerWidth<768?i.style.transform="translateY(60px)":i.style.transform="translateY(120px)"}function z(){window.scroll({top:0,behavior:"smooth"}),window.innerWidth<768?i.style.transform="translateY(60px)":i.style.transform="translateY(120px)",removeEventListener("scroll",g),setTimeout(()=>{addEventListener("scroll",g,{once:!0})},1e3)}document.querySelector(".backdrop");
//# sourceMappingURL=commonHelpers2.js.map
