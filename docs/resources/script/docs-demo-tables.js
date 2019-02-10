(function($) {
  baseclass = "tables-demo-table";
  demo = $("."+baseclass);
  
  $('#table-headers-cols').change(function(){
    if ($(this).is(':checked')) {
      if (demo.find('thead').length === 0) {
        demo.prepend(window.demo_head);
      }
      else {
        demo.find('thead').removeAttr('style');
      }
    }
    else {
      window.demo_head = demo.find('thead');
      demo.find('thead').remove();
    }
    $('#table-headers-rows').trigger('change');
    if (demo.hasClass('tyfy-responsive-processed')) {
      TYFY_ResponsiveTablesOff();
      TYFY_ResponsiveTablesOn();
    }
  });
  
  $('#table-headers-rows').change(function(){
    if ($(this).is(':checked')) {
      demo.find('tr > *:first-child').removeClass('row-hidden');
    }
    else {
      demo.find('tr > *:first-child').addClass('row-hidden');
    }
  });

  $('[name="table-class"]').change(function(){
    if ($(this).attr('value') == 'responsive') {
      if (!$(this).is(':checked')) {
        TYFY_ResponsiveTablesOff();
      }
    }
    SetClasses();
    // handle responsive tables
    if ($(this).attr('value') == 'responsive') {
      if ($(this).is(':checked')) {
        TYFY_ResponsiveTablesOn();
      }
    }
  });
  
  function SetClasses() {
    classes = baseclass;
    if (demo.hasClass('tyfy-responsive-processed')) {
      classes += " tyfy-responsive-processed";
    }
    $('#tables-demo input[type="checkbox"][name="table-class"]:checked').each(function(){
      classes += " " + $(this).attr('value');
    });
    demo.attr('class',classes);
  }
})(jQuery);