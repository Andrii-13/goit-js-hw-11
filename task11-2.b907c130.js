!function(){function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequired7c6=a);var o=a("bpxeT"),s=a("2TvXO"),i=a("dOjMq"),u=a("1KhuP"),c=a("4Nugj"),f=a("6JpON"),l=a("5IjG7");c.refs.formEl.addEventListener("submit",(function(e){return v.apply(this,arguments)}));var d,p,y,h=new(e(l))(".gallery a",{captionDelay:250}),g=new IntersectionObserver((function(r){r.forEach((t=e(o)(e(s).mark((function r(t){var n,a;return e(s).wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t.isIntersecting){r.next=16;break}return y+=1,r.prev=2,r.next=5,(0,i.getFetch)(d,20,y);case 5:n=r.sent,a=n.data.hits,c.refs.galleryEl.insertAdjacentHTML("beforeend",(0,u.createMarkup)(a)),h.refresh(),n.config.params.page>=n.data.totalHits/n.config.params.per_page&&(g.unobserve(c.refs.guard),e(f).Notify.info("We're sorry, but you've reached the end of search results.")),r.next=16;break;case 12:r.prev=12,r.t0=r.catch(2),c.refs.btnLoadMore.classList.add("visually-hidden"),e(f).Notify.info("We're sorry, but you've reached the end of search results.");case 16:case"end":return r.stop()}}),r,null,[[2,12]])}))),function(e){return t.apply(this,arguments)}));var t}),{rootMargin:"300px"});function v(){return(v=e(o)(e(s).mark((function r(t){var n,a;return e(s).wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(window.scrollTo(0,0),t.preventDefault(),""!==(p=t.target.searchQuery.value)&&""!==p.trim()){r.next=7;break}return c.refs.galleryEl.innerHTML="",e(f).Notify.info("Your query is empty. Please try again"),r.abrupt("return");case 7:return r.prev=7,r.next=10,(0,i.getFetch)(p,20);case 10:if(0!==(n=r.sent).data.hits.length){r.next=15;break}return c.refs.galleryEl.innerHTML="",e(f).Notify.info("Sorry, there are no images matching your search query. Please try again."),r.abrupt("return");case 15:a=n.data.hits,c.refs.galleryEl.innerHTML=(0,u.createMarkup)(a),y=1,h.refresh(),e(f).Notify.success("Hooray! We found ".concat(n.data.totalHits," images.")),n.data.totalHits>=20&&g.observe(c.refs.guard),d=p,r.next=28;break;case 24:r.prev=24,r.t0=r.catch(7),console.log(r.t0),e(f).Notify.failure("ERROR!!! Something went wrong!!!");case 28:case"end":return r.stop()}}),r,null,[[7,24]])})))).apply(this,arguments)}}();
//# sourceMappingURL=task11-2.b907c130.js.map
