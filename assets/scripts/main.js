
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

    require(['domready', 'prettyprint'], function(domReady, prettyPrint) {
        domReady(function() {
            prettyPrint();
        });
    });
