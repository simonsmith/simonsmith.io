
    define(function(require) {
        var $ = require('jquery');
        var Handlebars = require('handlebars');
        var registerTemplates = require('modules/registerTemplates');
        var $content = $('#content');

        registerTemplates();

        $('.container').on('click', '.ajax', function(event) {
            var tpl = Handlebars.templates[$(this).data('template')];
            $.getJSON($(this).attr('href'), {ajax: true}, function(json) {
                $content.html(tpl(json));
            });
            event.preventDefault();
        });
    });
