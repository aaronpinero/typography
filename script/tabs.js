var animation_duration = 500;

(function($) {
  
  // prepare HTML structure for each tab container
  $('.tabs-container').each(function(){
    // find the headings that are tab labels
    my_tablabels = $(this).find('.tab-label');
    // create tabs
    if ($(this).find('ul.tabs').length === 0) {
      $(this).prepend('<ul class="tabs"></ul>');
      var x;
      for (x=0;x<my_tablabels.length;x++) {
        $(this).find('ul.tabs').append('<li>'+my_tablabels.eq(x).text()+'</li>');
      }
    }
    //wrap all tab panels
    if ($(this).find('.tab-panel').length === 0) {
		  my_tablabels.each(function(){
        kids = $(this).nextUntil('.tab-label').wrapAll('<div class="tab-panel"></div>');
        // default state class for when tabs are collapsable sections
        $(this).addClass('collapsed').next('.tab-panel').addClass('collapsed');
      });    
    }
    // open initial tab
    $(this).find('ul.tabs li').eq(0).addClass('open');
    my_tablabels.eq(0).addClass('open').next('.tab-panel').addClass('open');
    // tab click events
    $('.tabs-container ul.tabs li').each(function(i){
      $(this).attr('data-tabindex',i);
      $(this).click(function(){
        if (!$(this).hasClass('open')) {
          $('.tabs-container .open').removeClass('open');
          my_tabindex = $(this).attr('data-tabindex');
          $(this).addClass('open');
          $('.tabs-container .tab-label').eq(my_tabindex).addClass('open');
          $('.tabs-container .tab-panel').eq(my_tabindex).addClass('open');
        }
      });
    });
    // collapsable header click event
    $('.tabs-container .tab-label').click(function(){
      if (!$(this).hasClass('transition')) {
        kids = $(this).next('.tab-panel');
        kids.removeClass('collapsed');
        kids_fullHeight = kids.outerHeight();
        kids_paddingTop = kids.css('padding-top');
        kids_paddingBottom = kids.css('padding-bottom');
        $(this).addClass('transition');
        kids.addClass('transition');
      
        if ($(this).hasClass('collapsed')) {
          kids.css({'height':'0px','padding-bottom':'0px','padding-top':'0px'}).animate({
            height:kids_fullHeight+'px',
            paddingBottom:kids_paddingBottom,
            paddingTop:kids_paddingTop,
          },animation_duration,function(){
            $('.tabs-container .transition').removeClass('collapsed').removeClass('transition').removeAttr('style');
          });
        }
        else {
          kids.css('height',kids_fullHeight+'px').animate({
            height:'0px',
            paddingBottom:'0px',
            paddingTop:'0px',
          },animation_duration,function(){
            $('.tabs-container .transition').addClass('collapsed').removeClass('transition').removeAttr('style');
          });
        }
      }
    }); 
    // indicate state of readiness
    $(this).addClass('tabs-processed');
  });
  
})(jQuery);