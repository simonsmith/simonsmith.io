
    define(function(require) {
        var $ = require('jquery');
        var Handlebars = require('handlebars');
        var registerTemplates = require('modules/registerTemplates');
        var $content = $('#content');

        registerTemplates();

        // Set initial page data
        $.getJSON(location.href, {ajax: true}, function(json) {
            history.replaceState(json, null, location.href);
        });

        $('.container').on('click', '.ajax, .nav-ajax a', function(event) {
            var $this = $(this);

            $.getJSON($this.attr('href'), {ajax: true}, function(json) {
                var tpl = Handlebars.templates[json.template];
                $content.html(tpl(json));
                history.pushState(json, null, $this.attr('href'));
            });

            event.preventDefault();
        });

        window.addEventListener('popstate', function(event) {
            var tpl = Handlebars.templates[event.state.template];
            $content.html(tpl(event.state));
            event.preventDefault();
        });

    });
