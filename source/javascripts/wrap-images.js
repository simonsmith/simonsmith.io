!function() {
  var imgs = $('.js-entry-body p img');
  if (!imgs.length) return;

  imgs.forEach(function(img) {
    img.classList.add('Entry-img');
    var figure = '<figure class="Entry-wrapImg">' + img.outerHTML + '</figure>';
    img.outerHTML = figure;
  });
}();
