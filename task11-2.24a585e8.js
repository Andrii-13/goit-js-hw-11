function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},o=r.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,r){a[e]=r},r.parcelRequired7c6=o);var n=o("1JxcI"),i=o("3huUq"),s=o("krGWQ"),l=o("7Y9D8"),f=o("fZKcF");s.refs.formEl.addEventListener("submit",(async function(r){if(window.scrollTo(0,0),r.preventDefault(),g=r.target.searchQuery.value,""===g||""===g.trim())return s.refs.galleryEl.innerHTML="",void e(l).Notify.info("Your query is empty. Please try again");try{const r=await(0,n.getFetch)(g,20);if(0===r.data.hits.length)return s.refs.galleryEl.innerHTML="",void e(l).Notify.info("Sorry, there are no images matching your search query. Please try again.");const{data:{hits:t}}=r,a=t.map((({webformatURL:e,largeImageURL:r,tags:t,likes:a,views:o,comments:n,downloads:s})=>(0,i.createMarkup)(e,r,t,a,o,n,s))).join("");s.refs.galleryEl.innerHTML=a,page=1,d.refresh(),e(l).Notify.success(`Hooray! We found ${r.data.totalHits} images.`),r.data.totalHits>=20&&c.observe(s.refs.guard),u=g}catch(r){e(l).Notify.failure("ERROR!!! Something went wrong!!!")}}));let d=new(e(f))(".gallery a",{captionDelay:250});const c=new IntersectionObserver((function(r){r.forEach((async r=>{if(r.isIntersecting){page+=1;try{const r=await(0,n.getFetch)(u,20,page),{data:{hits:t}}=r,a=t.map((({webformatURL:e,largeImageURL:r,tags:t,likes:a,views:o,comments:n,downloads:s})=>(0,i.createMarkup)(e,r,t,a,o,n,s))).join("");s.refs.galleryEl.insertAdjacentHTML("beforeend",a),d.refresh(),r.config.params.page>=r.data.totalHits/r.config.params.per_page&&(c.unobserve(s.refs.guard),e(l).Notify.info("We're sorry, but you've reached the end of search results."))}catch(r){s.refs.btnLoadMore.classList.add("visually-hidden"),e(l).Notify.info("We're sorry, but you've reached the end of search results.")}}}))}),{rootMargin:"300px"});let u,g;
//# sourceMappingURL=task11-2.24a585e8.js.map
