<?

require('kint/Kint.class.php');
require('Mustache/Autoloader.php');
Mustache_Autoloader::register();

$mustache = new Mustache_Engine([
    'template_class_prefix' => '__blinkdesign_',
    'cache' => dirname(__FILE__).'/templates/cache',
    'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/templates'),
    'partials_loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/templates/partials')
]);

// Nav options here for re-use
$nav_options = [
    'theme_location' => 'main-nav',
    'container' => false,
    'menu_class' => 'nav-list',
    'menu_id' => false
];

// Render as normal or return JSON if parameter is present
function page_output($tpl, $data) {
    if (isset($_GET['ajax'])) {
        global $nav_options;
        $nav_options['echo'] = false;

        $data['page_meta'] = [
            'body_class' => implode(' ', get_body_class()),
            'page_title' => (is_front_page() ? 'Home' : html_entity_decode(trim(wp_title('', false)))), // ew
            'nav_menu' => wp_nav_menu($nav_options)
        ];

        header('Content-Type: application/json');

        echo json_encode($data);
    } else {
        get_header();
        echo $tpl->render($data);
        get_footer();
    }
}

function get_nav_items_by_name($menu_name) {
    $locations = get_nav_menu_locations();

    if (!isset($locations[$menu_name])) {
        return null;
    }

    $menu = wp_get_nav_menu_object($locations[$menu_name]);
    return wp_get_nav_menu_items($menu->term_id);
}

function get_permalink_by_title($title) {
    return get_permalink(get_page_by_title($title)->ID);
}

function load_mustache_template($template) {
    global $mustache;
    return $mustache->loadTemplate($template);
}

function page_title() {
    global $page, $paged;
    wp_title('', true, 'right');

    if (is_page('Blog')) {
        echo "Blog";
    }
    echo " | ";

    bloginfo('name');

    $site_description = get_bloginfo('description', 'display');

    if ($site_description) {
        echo " - $site_description";
    }

    if ($paged >= 2 || $page >= 2) {
        echo ' | ' . sprintf( __( 'Page %s' ), max($paged, $page));
    }
}

function create_post_type() {
    register_post_type('project',
        [
            'labels' => [
                'name' => __('Projects'),
                'singular_name' => __('Projects')
            ],
            'public' => true,
            'has_archive' => true,
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'comments', 'revisions', 'custom-fields'],
            'taxonomies' => ['category', 'post_tag'],
            'menu_position' => 5,
            'rewrite' => true
        ]
    );
}

function register_menus() {
    register_nav_menus(
        ['main-nav' => __('Main Nav')]
    );
}

function new_excerpt_length() {
    return 50;
}

function new_excerpt_more() {
    return '...';
}

add_filter('excerpt_more', 'new_excerpt_more');
add_filter('excerpt_length', 'new_excerpt_length');
add_action('init', 'create_post_type');
add_action('init', 'register_menus');
add_theme_support('post-thumbnails', ['post', 'work', 'project']);
