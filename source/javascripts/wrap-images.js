!function() {
  var $img = $('.js-entry-body p img');
  if (!$img.length) return;

  $img.each(function(img) {
    var $this = $(this).addClass('Entry-img');
    $this.wrap('<figure class="Entry-wrapImg"></figure>');
  });
}();
