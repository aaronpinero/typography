// apply an intersection observer to all elements with the class .make-inview
document.addEventListener("DOMContentLoaded", function() {
  if ("IntersectionObserver" in window) { // if available

    // collect items that will be observed
    var inview_items = [].slice.call(document.querySelectorAll(".make-inview"));

    // options for the observer
    var inview_options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    }

    // callback for the observer
    var inview_observer_callback = function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let inview_item = entry.target;
          inview_item.classList.remove("not-inview");
          inview_item.classList.add("inview");
          inview_observer.unobserve(inview_item);
        }
      });
    };
  
    // define the observer
    let inview_observer = new IntersectionObserver(inview_observer_callback,inview_options);

    // set default "not-inview" state on the items
    inview_items.forEach(function(inview_item) {
      inview_item.classList.add("not-inview");
    });

    // apply the observer to the items
    inview_items.forEach(function(inview_item) {
      inview_observer.observe(inview_item);
    });
  }
  else {
    console.log("Warning: intersection observer not available")
  }
});
