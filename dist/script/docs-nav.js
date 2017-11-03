(function($) {
	nav = $('header.brand nav');
  if (!nav.hasClass('nav-processed')) {
	  nav_btn = nav.find('h2');
	  nav_btn.click(function(){
		  $(this).parent().toggleClass('nav-open');
	  });
    nav.addClass('nav-processed');
  }  
})(jQuery);