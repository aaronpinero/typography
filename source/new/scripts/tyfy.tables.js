function TYFY_ResponsiveTablesOn() {
  // get all tables
  let all_tables = Array.from(document.getElementsByTagName('table'));
  let ty_tables = new Array();

  // continue if there are tables
  if (all_tables.length) {
    // we want to filter this list down to any HTML heading
    // that doesn't already have the 'tyfy-collapsable-processed' class
    ty_tables = all_tables.filter(table => table.classList.contains('responsive'));
    ty_tables = ty_tables.filter(table => !table.classList.contains('tyfy-responsive-processed'));
  
    // continue if there are responsive tables
    if (ty_tables.length) {
      // process each responsive table
      let y = 0;
      for (y;y<ty_tables.length;y++) {
        // get the table
        let ty_table = ty_tables[y];
        
        // indicate processing        
        ty_table.classList.add('tyfy-responsive-processed');
        
        // if there is a head
        if (ty_table.getElementsByTagName('thead').length) {
          // get the heading cells
          let ty_table_th = ty_table.getElementsByTagName('thead').item(0).getElementsByTagName('th');
          
          // get the table body rows
          let ty_table_tr = ty_table.getElementsByTagName('tbody').item(0).getElementsByTagName('tr');
          
          // loop through all heading cells and apply the label to the corresponding table body cells
          let z = 0;
          for (z;z<ty_table_th.length;z++) {
            // we only do this for table heading cells where the scope attribute is "col"
            if (ty_table_th.item(z).getAttribute('scope') == 'col') {
              // get the table heading text
              let th_text = ty_table_th.item(z).innerHTML;
              let a = 0;
              // loop through all the table body rows
              for (a;a<ty_table_tr.length;a++) {
                // get the cell that is in the same column as our current heading cell
                let cell = ty_table_tr.item(a).children.item(z);
                
                // add a label only if the cell is td, not th; we might have row headings
                if (cell.tagName == "TD") {
                  let label = document.createElement("span");
                  let label_text = document.createTextNode(th_text);
                  label.className = "tyfy-td-label";
                  label.appendChild(label_text);
                  if (cell.firstChild !== null) {
                    cell.insertBefore(label,cell.firstChild);
                  }
                  else {
                    cell.appendChild(label);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function TYFY_ResponsiveTablesOff() {
  // get all tables processed as responsive
  let tables = document.getElementsByClassName('tyfy-responsive-processed');
  let x;
  for (x=(tables.length - 1);x>=0;x--) { // iterate in reverse because HTML collections are live
    // get all of the generated labels
    let labels = tables.item(x).getElementsByClassName('tyfy-td-label');
    if (labels.length > 0) {
      let y;
      for (y=(labels.length - 1);y>=0;y--) { // iterate in reverse because HTML collections are live
        labels.item(y).remove();
      }
    }
    tables.item(x).classList.remove('tyfy-responsive-processed');
  }
}

TYFY_ResponsiveTablesOn();
