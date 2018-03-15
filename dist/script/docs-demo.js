(function($) {
  $('#lists-demo input[type="radio"][name="list-type"]').change(function(){
    demo = $('.lists-demo-list');
    classes = demo.attr('class');
    type = $('#lists-demo input[type="radio"][name="list-type"]:checked').val();
    if (type == 'unordered') {
      demo.replaceWith('<ul class="'+classes+'">' + demo.html() + '</ul>');
    }
    else if (type == 'ordered') {
      demo.replaceWith('<ol class="'+classes+'">' + demo.html() + '</ol>');
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
      $("#list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-icons").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-icons").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-cols3").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-icons").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-grid2, #list-class-grid3, #list-class-grid4, #list-class-icons").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });
  
  $("#list-class-nobullet").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-icons, #list-class-grid2, #list-class-grid3, #list-class-grid4").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-icons, #list-class-grid2, #list-class-grid3, #list-class-grid4").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-grid2").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid3, #list-class-grid4, #list-class-nobullet").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid3, #list-class-grid4, #list-class-nobullet").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-grid3").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid4, #list-class-nobullet").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid4, #list-class-nobullet").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-grid4").change(function(){
    if ($(this).is(':checked')) {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-nobullet").removeAttr('checked').attr('disabled','disabled').parent().addClass('disabled');
    }
    else {
      $("#list-class-cols2, #list-class-cols3, #list-class-grid2, #list-class-grid3, #list-class-nobullet").removeAttr('disabled').parent().removeClass('disabled');
    }
    SetClasses();
  });

  $("#list-class-indented").change(function(){
    SetClasses();
  });

  $("#list-class-marginsoff").change(function(){
    SetClasses();
  });
  
  function SetClasses() {
    demo = $('.lists-demo-list');
    classes = "lists-demo-list";
    $('#lists-demo input[type="checkbox"][name="list-class"]:checked').each(function(){
      classes += " " + $(this).attr('value');
    });
    demo.attr('class',classes);
    if (classes.indexOf('grid') != -1 || classes.indexOf('cols') != -1) {
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