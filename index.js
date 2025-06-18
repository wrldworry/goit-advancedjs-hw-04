import{a as v,S as E,i as g}from"./assets/vendor-C2BD4WGs.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const H="50806139-f783558adc167f8e9c7c3d5e1",M="https://pixabay.com/api/";async function y(e,r=1){var o;const s={key:H,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await v.get(M,{params:s})).data}catch(t){throw new Error(`HTTP error! status: ${((o=t.response)==null?void 0:o.status)||t.message}`)}}function L(e){return e.map(({webformatURL:r,largeImageURL:s,tags:o,likes:t,views:n,comments:i,downloads:q})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${o}"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${t}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${n}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${i}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${q}
          </p>
        </div>
      </a>
    </li>
  `).join("")}function T(e){e.innerHTML=""}function b(e,r){e.insertAdjacentHTML("beforeend",r)}function $(e){e.classList.remove("hidden")}function h(e){e.classList.add("hidden")}function B(e){const r=e.querySelector(".gallery-item");return r?r.getBoundingClientRect().height:0}function D(e){window.scrollBy({top:e*2,behavior:"smooth"})}const O=document.querySelector("#search-form"),u=document.querySelector(".gallery"),d=document.querySelector(".loader"),l=document.querySelector(".load-more-btn");let w=new E(".gallery a",{captionsData:"alt",captionDelay:250}),S="",a=1,c=0;h(l);function P(){d.innerHTML='<span class="lds-ring"><span></span><span></span><span></span><span></span></span>',d.classList.remove("hidden")}function f(){d.classList.add("hidden"),d.innerHTML=""}function p(e){g.error({title:"Error",message:e,position:"topRight"})}function m(e){g.info({title:"Info",message:e,position:"topRight"})}O.addEventListener("submit",I);l.addEventListener("click",x);async function I(e){e.preventDefault();const s=new FormData(e.target).get("searchQuery").trim();if(!s){p("Please enter a search query!");return}S=s,a=1,T(u),h(l),P();try{const o=await y(s,a);if(f(),c=o.totalHits,o.hits.length===0){m("Sorry, there are no images matching your search query. Please try again!");return}const t=L(o.hits);b(u,t),w.refresh(),m(`Hooray! We found ${c} images.`),setTimeout(()=>{o.hits.length>0&&c>15&&a*15<c&&$(l)},100)}catch(o){f(),p("Something went wrong. Please try again!"),console.error("Error:",o)}}async function x(){a+=1,P();try{const e=await y(S,a);f();const r=L(e.hits);b(u,r),w.refresh();const s=B(u);D(s),a*15>=c&&(h(l),m("We're sorry, but you've reached the end of search results."))}catch(e){f(),p("Something went wrong. Please try again!"),console.error("Error:",e)}}
//# sourceMappingURL=index.js.map
