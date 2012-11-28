
    define(function(require) {
        var $ = require('jquery');
        var Handlebars = require('handlebars');
        var registerTemplates = require('modules/registerTemplates');

        var ContentLoader = function(elements) {
            this.container = $(elements.container);
            this.links = elements.links;
            this.injectTarget = $(elements.injectTarget);

            registerTemplates();

            this.setInitialPage();
            this.attachEvents();
        };

        ContentLoader.prototype = {

            attachEvents: function() {
                var that = this;

                // Get JSON on each click and push it into history
                this.container.on('click', this.links, function(event) {
                    var $this = $(this);

                    $.getJSON($this.attr('href'), {ajax: true}, function(json) {
                        var tpl = that.getTemplate(json.template);
                        that.injectTarget.html(tpl(json));
                        history.pushState(json, null, $this.attr('href'));
                    });

                    event.preventDefault();
                });

                // Re-render content area when user back/forward
                window.addEventListener('popstate', function(event) {
                    if (!event.state) {
                        return;
                    }

                    var tpl = that.getTemplate(event.state.template);
                    that.injectTarget.html(tpl(event.state));

                    event.preventDefault();
                });
            },

            setInitialPage: function() {
                $.getJSON(location.href, {ajax: true}, function(json) {
                    history.replaceState(json, null, location.href);
                });
            },

            getTemplate: function(tpl) {
                return Handlebars.templates[tpl];
            }

        };

        return ContentLoader;
    });
