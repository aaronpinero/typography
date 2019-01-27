function ResponsiveTablesOn() {
  // get all tables
  var ty_tables = document.getElementsByTagName('table');
  // continue if there are tables
  if (ty_tables.length) {
    // array to store responsive tables
    var ty_tables_responsive = new Array();
    // find the responsive tables
    var x;
    for (x=0;x<ty_tables.length;x++) {
      if (ty_tables.item(x).classList.contains('responsive')) {
        ty_tables_responsive[ty_tables_responsive.length] = ty_tables.item(x);
      }
    }
    // continue if there are responsive tables
    if (ty_tables_responsive.length) {
      // process each responsive table
      var y;
      for (y=0;y<ty_tables_responsive.length;y++) {
        // get the table
        var ty_table = ty_tables_responsive[y];
        // get the head
        var ty_table_head = ty_table.getElementsByTagName('thead');
        // if there is a head
        if (ty_table_head.length) {
          // get the heading cells
          var ty_table_th = ty_table_head.item(0).getElementsByTagName('th');
          // get the table body rows
          var ty_table_tr = ty_table.getElementsByTagName('tbody').item(0).getElementsByTagName('tr');
          var z;
          // loop through all heading cells and apply the label to the corresponding table body cells
          for (z=0;z<ty_table_th.length;z++) {
            console.log(ty_table_th.item(z).getAttribute('scope'));
            if (ty_table_th.item(z).getAttribute('scope') == 'col') {
              var label_text = ty_table_th.item(z).innerHTML; console.log(label_text);
            }
          }
        }
      }
    }
  }
}
ResponsiveTablesOn();

(function($) {
  
  $('table.responsive').each(function(i){
    $(this).find('thead th').each(function(j){
      $(this).parents('table').eq(0).find('tbody tr td:nth-child('+(j+1)+')').prepend('<span class="td-label">'+$(this).text()+'</span>');
    });
    $(this).addClass('responsive-processed');
  });

})(jQuery);