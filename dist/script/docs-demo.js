(function($) {
  $('#lists-demo input').change(function(){
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
})(jQuery);