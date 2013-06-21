<?
    global $tpl_name;
    $script_path = new ScriptPath('simonsmith.io');
?>
<!doctype html>
<html lang="en" class="no-js">
    <head>
        <title>
            <? page_title(); ?>
      	</title>
        <meta charset="utf-8">
        <meta name="description" content="<?= get_bloginfo('description', 'display') ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/assets/css/blinkdesign.css">
        <script>document.cookie='resolution='+screen.width+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-6798894-3']);
            _gaq.push(['_trackPageview']);
            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
        <script src="<?= $script_path->getPath() ?>/lib/modernizr.js"></script>
        <script>
            var require = {
                baseUrl: '<?= $script_path->getPath() ?>/',
                config: {
                    'app': {
                        templateDir: '<?= get_template_directory_uri(); ?>/'
                    }
                }
            }
        </script>
        <script src="<?= $script_path->getPath() ?>/components/requirejs/require.js" data-main="<?= $script_path->getPath() ?>/main.js"></script>
    </head>
    <body <? body_class(); ?>>
        <!--[if lt IE 8]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <nav class="visuallyhidden">
            <ul>
                <li><a href="#content">Skip to content</a></li>
                <li><a href="#nav">Skip to nav</a></li>
            </ul>
        </nav>

        <div class="layout-container js-container cf">

            <header role="banner" class="layout-header">
                <a class="logo ajax" href="<?= home_url(); ?>/">
                    <h1 class="logo-title">Simon Smith</h1>
                    <p class="logo-description">$ Front-end developer</p>
                </a>

                <nav class="nav" id="nav" role="navigation">
                    <h1 class="visuallyhidden">Site navigation</h1>
                    <div class="js-nav-container">
                        <?
                            global $nav_options;
                            wp_nav_menu($nav_options);
                        ?>
                    </div>
                </nav>
            </header>

            <div class="layout-content" id="content">
                <main role="main">
