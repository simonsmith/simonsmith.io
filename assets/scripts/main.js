
    if (Modernizr.history) {
        require(['modules/ContentLoader'], function(ContentLoader) {
            new ContentLoader({
                container: '.container',
                links: '.ajax, .nav-ajax a',
                injectTarget: '#content',
                nav: '.nav-list-container'
            });
        });
    }

    require(['domready'], function(domReady) {
        domReady(function() {
            if (document.body.className.match(/single-post/)) {
                require(['prettyprint'], function(prettyPrint) {
                    prettyPrint();
                });
            }
        });
    });
