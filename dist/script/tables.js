(function($) {
  
  $('table.responsive').each(function(i){
    $(this).find('thead th').each(function(j){
      $(this).parents('table').eq(0).find('tbody tr td:nth-child('+(j+1)+')').prepend('<span class="td-label">'+$(this).text()+'</span>');
    });
  });

})(jQuery);