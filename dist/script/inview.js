document.addEventListener("DOMContentLoaded",(function(){if("IntersectionObserver"in window){var e=[].slice.call(document.querySelectorAll(".make-inview"));let n=new IntersectionObserver((function(e,t){e.forEach((function(e){if(e.isIntersecting){let t=e.target;t.classList.remove("not-inview"),t.classList.add("inview"),n.unobserve(t)}}))}),{root:null,rootMargin:"0px",threshold:.25});e.forEach((function(e){e.classList.add("not-inview")})),e.forEach((function(e){n.observe(e)}))}else console.log("Warning: intersection observer not available")}));