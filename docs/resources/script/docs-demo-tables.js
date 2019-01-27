(function($) {
  baseclass = "tables-demo-table";
  demo = $("."+baseclass);
  
  $('#table-headers-cols').change(function(){
    if ($(this).is(':checked')) {
      demo.find('thead').removeAttr('style');
    }
    else {
      demo.find('thead').hide();
    }
  });
  
  $('#table-headers-rows').change(function(){
    if ($(this).is(':checked')) {
      demo.find('tr > *:first-child').removeAttr('style');
    }
    else {
      demo.find('tr > *:first-child').hide();
    }
  });

  $('[name="table-class"]').change(function(){
    SetClasses();
    // handle responsive tables
    if ($(this).attr('value') == 'responsive') {
      if ($(this).is(':checked')) {
        ResponsiveTables();
      }
      else {
        $('.td-label').remove();
      }
    }
  });
  
  function SetClasses() {
    classes = baseclass;
    $('#tables-demo input[type="checkbox"][name="table-class"]:checked').each(function(){
      classes += " " + $(this).attr('value');
    });
    demo.attr('class',classes);
  }
})(jQuery);