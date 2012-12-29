
    require.config({
        paths: {
            'jquery': 'lib/jquery',
            'handlebars': 'lib/handlebars',
            'prettyprint': 'lib/prettify',
            'domready': 'lib/domready',
            'highslide': 'lib/highslide'
        },
        shim: {
            'handlebars': {
                'exports': 'Handlebars'
            },
            'prettyprint': {
                'exports': 'prettyPrint'
            },
            'highslide': {
                'exports': 'hs'
            }
        }
    });

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

    if (Modernizr.mq('(max-width: 48em)')) {
        require(['mobile']);
    }

    if (Modernizr.mq('(min-width: 48em)')) {
        require(['settings', 'jquery', 'highslide', 'domready'], function(settings, $, hs, domReady) {
            hs.graphicsDir = settings.templateDir + 'assets/images/hs/';
            hs.showCredits = false;
            hs.outlineType = null;
            hs.align = 'center';
            hs.dimmingOpacity = 0.85;
            hs.dimmingDuration = 100;

            domReady(function() {
                $('.container').on('click', 'a.highslide', function(event) {
                    hs.expand(this);
                    event.preventDefault();
                });
            })
        });
    }
