function TyfyResponsiveTablesOn() {
  let ty_tables = Array.from(document.querySelectorAll('table.responsive'));
  ty_tables = ty_tables.filter(table => !table.classList.contains('tyfy-responsive-processed'));
  if (ty_tables.length === 0) { return; }
  ty_tables.forEach((ty_table) => {
    ty_table.classList.add('tyfy-responsive-processed');
    // if there is a head
    if (ty_table.getElementsByTagName('thead').length) {
      let ty_table_heading_cells = ty_table.getElementsByTagName('thead').item(0).getElementsByTagName('th');
      let ty_table_body_rows = ty_table.getElementsByTagName('tbody').item(0).getElementsByTagName('tr');
      let hc = 0;
      for (hc; hc < ty_table_heading_cells.length; hc++) {
        if (ty_table_heading_cells.item(hc).getAttribute('scope') !== 'col') { continue; }
        let hc_text = ty_table_heading_cells.item(hc).innerHTML;
        let r = 0;
        for (r; r < ty_table_body_rows.length; r++) {
          let cell = ty_table_body_rows.item(r).children.item(hc);
          if (cell.tagName == "TD") {
            cell.setAttribute('data-label', hc_text)
          }
        }
      }
    }
  });
}

TyfyResponsiveTablesOn();
