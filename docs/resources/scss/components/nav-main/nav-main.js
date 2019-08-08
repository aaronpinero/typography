// standard animation timing
var nav_animation_timing = 250;
// the nav element
var nav = $('nav.nav-main').eq(0);
// the nav header, used to show a mobile menu toggle
var navHead = nav.find('h1').eq(0);
// the top level ul of the menu
var navTop = nav.find('ul').eq(0);

// add classes to identify menu structure and function
if (!nav.hasClass('js-nav-active')) {
  // indicate that javascript is enabled
  nav.addClass('js-nav-active');
  // mark items that have a submenu as expandable
  nav.find('ul').prev('a').addClass('expandable');
}

// show/hide menu, mobile
navHead.click(function(){
  // if the nav is not open, open it
  if (!nav.hasClass('nav-opened')) {
    // know the height of the menu
    navTop.css('height','auto').addClass('nav-transition');
    var nav_height = navTop.outerHeight();
    // animate the menu from 0 to the known height
    navTop.css('height','0px').animate({
      'height':nav_height+'px'
    },nav_animation_timing,function(){
      // when the animation is done, set the correct state and remove attribute no longer needed
      navTop.removeAttr('style').removeClass('nav-transition');
      nav.addClass('nav-opened');
      // set an event handler that closes the menu if you click away from the navigation
      $('body').off('click.navclickout').on('click.navclickout',function(e){
        var isNav = false;
        if ($(e.target).is('nav.nav-main > ul') || $(e.target).parents('nav.nav-main > ul').length > 0) {
          isNav = true;
        }
        else {
          ClickOut();
          $('body').off('click.navclickout');
        }
      });
    });
  }
  /// otherwise, close it
  else {
    // know the height of the menu
    var nav_height = $('nav.nav-main > ul').outerHeight();
    // animate the menu from the known height to 0
    navTop.css('height',nav_height+'px').addClass('nav-transition').animate({
      'height':0 
    },nav_animation_timing,function(){
      // when the animation is done, set the correct state and remove attribute no longer needed
      navTop.removeAttr('style').removeClass('nav-transition');
      nav.removeClass('nav-opened');
      // remove the click event handler that is no longer needed
      $('body').off('click.navclickout');
    });
  }
});



function ClickOut() {
  // if this is the larger screen case, close any submenu
  if (!NavIsMobile()) {
    if ($('ul.ul-opened').length) {
      var opened_height = $('ul.ul-opened').outerHeight();
      $('a.ul-opened').removeClass('ul-opened');
      $('ul.ul-opened').css('height',opened_height+'px').addClass('ul-transition').animate({
        'height':0
      },nav_animation_timing,function(){
        $(this).removeAttr('style').removeClass('ul-transition').removeClass('ul-opened');
      });
    }
  }
  // otherwise, close the main menu if it's open
  else {
    if (nav.hasClass('nav-opened')) {
      var nav_height = navTop.outerHeight();
      navTop.css('height',nav_height+'px').addClass('nav-transition').animate({
        'height':0 
      },nav_animation_timing,function(){
        navTop.removeAttr('style').removeClass('nav-transition');
        nav.removeClass('nav-opened');
      });
    }
  }
}

function NavIsMobile() {
  // when the nav is mobile, the h1 in the nav is visible;
  // when the nav is desktop, the h1 has a height set to 0;
  // we are going to use that style to determine desktop vs mobile
  var isMobile = (parseInt(navHead.css('height')) === 0 ) ? false : true;
  return isMobile;
}