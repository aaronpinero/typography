var animation_duration = 500;

(function($) {
  // handle anchor links to or inside tabs
  GoToAnchor = function(){
    // find the anchor and any tab it might be in
    selected_anchor_name = encodeURIComponent(window.location.hash.substring(1));
    selected_anchor = $('a[name="'+selected_anchor_name+'"], a[id="'+selected_anchor_name+'"]');
    parent_tab = selected_anchor.parents('.tab-panel');
    // account for an anchor in a label
    parent_label = selected_anchor.parents('.tab-label');
    if (parent_label.length) {
      parent_tab = parent_label.next('.tab-panel');
    }
    // do the steps of this function only if we have an anchor link and a tab panel
    if (selected_anchor.length && parent_tab.length) {
      parent_tab_label = parent_tab.prev('.tab-label');
		  parent_tab_index = parent_tab_label.attr('data-tabindex');
      parent_tab.parent().find('ul.tabs li').eq(parent_tab_index).click();
      if (parent_tab.hasClass('collapsed')) {
        parent_tab.removeClass('collapsed');
        parent_tab_label.removeClass('collapsed');
      }
      // scroll to the anchor
      var s = selected_anchor.offset().top - 50; // console.log(s);
      $('body,html').animate({'scrollTop':s},500,'swing');
    }
  };
  // prepare HTML structure for each tab container
  $('.tabs-container').each(function(){
    if (!$(this).hasClass('tabs-processed')) {
      // find the headings that are tab labels
      my_tablabels = $(this).find('.tab-label');
      // create tabs
      if ($(this).find('ul.tabs').length === 0) {
        $(this).prepend('<ul class="tabs"></ul>');
        var x;
        for (x=0;x<my_tablabels.length;x++) {
          $(this).find('ul.tabs').append('<li data-tabindex="'+x+'">'+my_tablabels.eq(x).text()+'</li>');
        }
      }
      // structure all labels and wrap all tab panels
      if ($(this).find('.tab-panel').length === 0) {
        my_tablabels.each(function(i){
          $(this).attr('data-tabindex',i);
          $(this).wrapInner('<a id="'+encodeURIComponent($(this).text())+'"></a>');
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
    }  
  });
  // if there are tabs and someone has linked to an anchor inside a tab
  if (window.location.hash != '') {
    GoToAnchor();
  }
  // handle case when page is already loaded
  $(window).on('hashchange',function(){
    GoToAnchor();
  });
})(jQuery);