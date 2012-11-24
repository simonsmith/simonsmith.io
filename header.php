<!doctype html>
<html lang="en" class="no-js">
    <head>
        <meta charset="utf-8">
        <title>
            <? page_title(); ?>
      	</title>
        <meta name="description" content="<?= get_bloginfo('description', 'display') ?>">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="<?= get_template_directory_uri(); ?>/assets/css/blinkdesign.css">
        <script src="<?= get_template_directory_uri(); ?>/assets/scripts/lib/modernizr.js"></script>
        <script>
            var require = {
                baseUrl: '<?= get_template_directory_uri(); ?>/assets/scripts/',
                paths: {
                    'jquery': 'lib/jquery'
                }
            }
        </script>
        <script src="<?= get_template_directory_uri(); ?>/assets/scripts/lib/require.js" data-main="main"></script>
    </head>
    <body class="<? body_class(); ?>">

        <!--[if lt IE 8]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <nav class="visuallyhidden">
            <ul>
                <li><a href="#content">Skip to content</a></li>
                <li><a href="#nav">Skip to nav</a></li>
            </ul>
        </nav>

        <div class="container">

            <header role="banner" class="header">
                <a class="logo" href="<?= home_url(); ?>">
                    <h1 class="logo-title">Simon Smith</h1>
                    <p class="logo-description">Front-end developer</p>
                </a>

                <nav class="nav" id="nav" role="navigation">
                    <h1 class="visuallyhidden">Site navigation</h1>
                    <div class="nav-list-container">
                        <?
                            global $nav_options;
                            wp_nav_menu($nav_options);
                        ?>
                    </div>
                </nav>
            </header>

            <div class="content" id="content" role="main">
