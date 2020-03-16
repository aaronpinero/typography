document.addEventListener("DOMContentLoaded", function() {
  if ("IntersectionObserver" in window) {
    var lazyImages = [].slice.call(document.querySelectorAll("img[data-lazyimage]")); // console.log({lazyImages});

    lazyImages.forEach(function(lazyImage) {
      lazyImage.classList.add("not-lazyLoaded");
    });

    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          let loadImage = new Image();
          let imgSrc = lazyImage.getAttribute('data-lazyimage'); // console.log({imgSrc});
          loadImage.onload = function(){
            lazyImage.setAttribute('src',imgSrc);
            lazyImage.classList.remove("not-lazyLoaded");
            lazyImage.classList.add("lazyLoaded");
          };
          loadImage.src = imgSrc;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});