!function() {
  var entryBody = document.querySelector('.js-entry-body');
  var headers = entryBody.querySelectorAll('h2, h3, h4, h5, h6');
  headers.forEach(function(header) {
    var anchor = document.createElement('a');
    anchor.setAttribute('class', 'Entry-anchor');
    anchor.setAttribute('href', '#' + header.getAttribute('id'));
    anchor.innerHTML = '<svg class="Icon Icon--lg"><use xlink:href="#icon-link"></use></svg>';

    header.insertBefore(anchor, header.firstChild);
  });
}();
