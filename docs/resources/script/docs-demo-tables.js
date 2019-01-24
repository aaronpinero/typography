(function($) {
  baseclass = "tables-demo-table";
  demo = $("."+baseclass);

  $('[name="table-class"]').change(function(){
    SetClasses();
  });
  
  function SetClasses() {
    classes = baseclass;
    $('#tables-demo input[type="checkbox"][name="table-class"]:checked').each(function(){
      classes += " " + $(this).attr('value');
    });
    demo.attr('class',classes);
  }
})(jQuery);