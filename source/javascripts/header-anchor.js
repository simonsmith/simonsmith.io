$('.js-entry-body')
  .find('h2, h3, h4, h5, h6')
  .each(function() {
    var $header = $(this);
    var $anchor = $('<a></a>', {
      class: 'Entry-anchor',
      href: '#' + $header.attr('id')
    });
    var $icon = $('<span></span>', {
      class: 'Icon Icon--link Icon--lg'
    });

    $anchor.append($icon);
    $header.prepend($anchor);
  });