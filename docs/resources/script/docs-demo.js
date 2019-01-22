(function($) {
  $('#lists-demo input[type="radio"][name="list-type"]').change(function(){
    demo = $('.lists-demo-list');
    classes = demo.attr('class');
    type = $('#lists-demo input[type="radio"][name="list-type"]:checked').val();
    if (type == 'unordered') {
      demo.replaceWith('<ul class="'+classes+'">' + demo.html() + '</ul>');
      $("#list-class-flex").removeAttr('disabled').parent().removeClass('disabled');
    }
    else if (type == 'ordered') {
      demo.replaceWith('<ol class="'+classes+'">' + demo.html() + '</ol>');
      $("#list-class-flex, #list-class-flexcenter, #list-class-flexright").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
      $("#list-class-flex").trigger('change');
    }
  });
  
  $("#list-class-icons").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-nobullet").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-nobullet").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-cols2").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-flex").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-flex").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-cols3").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-flex").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-flex").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });
  
  $("#list-class-nobullet").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-icons").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
      $("#list-class-indented").removeAttr('disabled').parent().removeClass('disabled');
    }
    else {
      $("#list-class-icons").removeAttr('disabled').parent().removeClass('disabled');
      $("#list-class-indented").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-flexcenter").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-flexright").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-flexright").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-flexright").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-flexcenter").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-flexcenter").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-grid2").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid3, #list-class-grid4, #list-class-flex").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid3, #list-class-grid4, #list-class-flex").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-grid3").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid4, #list-class-flex").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid4, #list-class-flex").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-grid4").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-flex").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-flex").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-flex").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-grid4").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
      $("#list-class-flexcenter, #list-class-flexright").removeAttr('disabled').parent().removeClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-grid4").removeAttr('disabled').parent().removeClass('disabled');
      $("#list-class-flexcenter, #list-class-flexright").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-indented, #list-class-marginsoff").change(function(){
    SetClasses();
  });
  
  function SetClasses() {
    demo = $('.lists-demo-list');
    classes = "lists-demo-list";
    $('#lists-demo input[type="checkbox"][name="list-class"]:checked').each(function(){
      classes += " " + $(this).attr('value');
    });
    demo.attr('class',classes);
    if (classes.indexOf('grid') != -1 || classes.indexOf('cols') != -1 || classes.indexOf('flex') != -1) {
      demo.find('ul, ol').hide();
    }
    else {
      demo.find('ul, ol').removeAttr('style');
    }
    if (demo.hasClass('list-icons')) {
      demo.addClass('list-icons-angle');
    }
    else {
      demo.removeClass('list-icons-angle');
    }
  }
})(jQuery);