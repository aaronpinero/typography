(function($) {

  $('table.responsive th').each(function(i){
    parent_table = $(this).parents('table').eq(0);
    if ($(this).next().is('td')) {
      $(this).nextAll('td').prepend('<span class="td-label">'+$(this).text()+'</span>');
    }
    else if ($(this).next().is('th') || $(this).prev().is('th')) {
      parent_table.find('tbody tr td:nth-child('+(i+1)+')').prepend('<span class="td-label">'+$(this).text()+'</span>');
    }
  });

})(jQuery);