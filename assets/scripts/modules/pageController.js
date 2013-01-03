
define(function(require) {
    var $ = require('jquery');
    var spinner = require('modules/spinner');
    var pageUpdater = require('modules/pageUpdater');
    var scroller = require('modules/scroller');

    return {
        init: function(elements) {
            var that = this;
            $.each(elements, function(key, value) {
                that[key] = $(value);
            });

            spinner.init(this.container);
            pageUpdater.init(this.nav, this.injectTarget);

            this.setInitialPage();
            this.attachEvents();
        },

        setInitialPage: function() {
            $.getJSON(location.href, {ajax: true}, function(json) {
                history.replaceState(json, json.page_meta.page_title, location.href);
            });
        },

        attachEvents: function() {
            this.container.on('click', this.links.selector, this.loadPageContent.bind(this));

            window.addEventListener('popstate', function(event) {
                var json = event.state;

                if (!json) {
                    return;
                }

                pageUpdater.renderTemplate(json.template, json);
                pageUpdater.bodyClass(json.page_meta.body_class);
                pageUpdater.navigation(json.page_meta.nav_menu);
                pageUpdater.title(json.page_meta.page_title);

                event.preventDefault();
            }.bind(this));
        },

        loadPageContent: function(event) {
            var $elem = $(event.currentTarget);
            var url = $elem.attr('href');
            var req = $.ajax({
                dataType: 'json',
                context: this,
                timeout: 6000,
                beforeSend: function() {
                    spinner.show();
                },
                url: url,
                type: 'get',
                data: {
                    ajax: true
                }
            });

            req.always(function() {
                spinner.hide();
            });

            req.fail(function() {
                location.href = url;
            });

            req.done(function(json) {
                pageUpdater.content($elem, json);
                pageUpdater.bodyClass(json.page_meta.body_class);
                pageUpdater.navigation(json.page_meta.nav_menu);
                pageUpdater.title(json.page_meta.page_title);
                scroller.scrollToTop();
            });

            // Code highlight if it's a blog post, hacky but does the job
            req.done(function() {
                if (document.body.className.match(/single-post/)) {
                    require(['prettyprint'], function(prettyPrint) {
                        prettyPrint();
                    });
                }
            });

            event.preventDefault();
        }
    }
});
