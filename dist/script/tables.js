function ResponsiveTables() {
  jQuery('table.responsive th').each(function(i){
    console.log(i);
    parent_table = jQuery(this).parents('table').eq(0);
    if (jQuery(this).next().is('td')) {
      jQuery(this).nextAll('td').prepend('<span class="td-label">'+$(this).text()+'</span>');
    }
    else if (jQuery(this).next().is('th') || jQuery(this).prev().is('th')) {
      parent_table.find('tbody tr td:nth-child('+(i+1)+')').prepend('<span class="td-label">'+jQuery(this).text()+'</span>');
    }
  });
}
ResponsiveTables();