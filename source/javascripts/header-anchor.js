$('.js-entry-body')
  .find('h2, h3, h4, h5, h6')
  .each(function() {
    var $header = $(this);
    var $anchor = $('<a></a>', {
      class: 'Entry-anchor',
      href: '#' + $header.attr('id')
    });
    var $icon = $('<svg class="Icon Icon--lg"><use xlink:href="#icon-link"></use></svg>');

    $anchor.append($icon);
    $header.prepend($anchor);
  });
