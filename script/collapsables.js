var animation_duration = 500;

(function($) {

  $('h2.collapsable, h3.collapsable, h4.collapsable, h5.collapsable, h6.collapsable').each(function(i){
    if (!$(this).hasClass('collapsable-processed')) {
  
      // wrap my "children" in a div
      var mytag = $(this)[0].tagName;
      var breakat;
      if (mytag == 'H2') { breakat = "H2, H1"; }
      else if (mytag == 'H3') { breakat = "H3, H2, H1"; }
      else if (mytag == 'H4') { breakat = "H4, H3, H2, H1"; }
      else if (mytag == 'H5') { breakat = "H5, H4, H3, H2, H1"; }
      else if (mytag == 'H6') { breakat = "H6, H5, H4, H3, H2, H1"; }
      var kids = $(this).nextUntil(breakat).wrapAll('<div class="collapsables"></div>');
    
      // set it to closed
      $(this).addClass('closed');
      $(this).next('.collapsables').addClass('closed');
    
      // create an event handler for clicking on me
      $(this).click(function(){
        if (!$(this).hasClass('transition')) {
          var kids = $(this).next('.collapsables');
          kids.removeClass('closed');
          kids_fullHeight = kids.outerHeight();
          kids_paddingTop = kids.css('padding-top');
          kids_paddingBottom = kids.css('padding-bottom');
          $(this).addClass('transition');
          kids.addClass('transition');
    
          if ($(this).hasClass('closed')) {
            grid_unit = parseInt(jQuery('p').eq(0).css('line-height'))/2;
            kids.css({'height':'0px','display':'block','padding-bottom':'0px','padding-top':'0px'}).animate({
              height:kids_fullHeight+'px',
              paddingBottom:kids_paddingBottom,
              paddingTop:kids_paddingTop,
            },animation_duration,function(){
              $('.transition').removeClass('transition').removeClass('closed').removeAttr('style');
            });
          }
          else {
            kids.css('height',kids_fullHeight+'px').animate({
              height:'0px',
              paddingBottom:'0px',
              paddingTop:'0px',
            },animation_duration,function(){
              $('.transition').removeClass('transition').addClass('closed').removeAttr('style');
            });
          }
        }
      });
      
      // mark as processed
      $(this).addClass('collapsable-processed');

    }
  
  });
  
  // if there is an anchor in a collapsable
  DetectAnchorLink();
  $(window).on('hashchange',function(){
    DetectAnchorLink();
  });
  
})(jQuery);

function DetectAnchorLink (){
  (function($) {
    
    if (window.location.hash != '') {
      selected_anchor_name = window.location.hash.substring(1);
      selected_anchor = $('a[name="'+selected_anchor_name+'"]');
    
      if (selected_anchor) {
        parent_collapsables = selected_anchor.parents('.collapsables');
        parent_collapsables.each(function(){
          $(this).removeClass('closed');
          $(this).prev('.collapsable').removeClass('closed');
        });
        // scroll to the anchor
        var s = selected_anchor.offset().top - 50; // console.log(s);
        $('body,html').animate({'scrollTop':s},animation_duration,'swing');
      }
    }
    
  })(jQuery);
}
