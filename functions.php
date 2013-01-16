<?

require_once('Mustache/Autoloader.php');
require_once('ScriptPath.php');
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
            'page_title' => (is_front_page() ? 'Blog' : html_entity_decode(trim(wp_title('', false)))), // ew
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

/**
 * Attach a class to linked images' parent anchors
 * e.g. a img => a.img img
 *
 * @param $html
 * @param $id
 * @param $caption
 * @param $title
 * @param $align
 * @param $url
 * @param $size
 * @param string $alt
 * @return mixed
 */
function give_linked_images_class($html, $id, $caption, $title, $align, $url, $size, $alt = '') {
    // separated by spaces, e.g. 'img image-link'
    $classes = 'highslide';

    // check if there are already classes assigned to the anchor
    if (preg_match('/<a.*? class=".*?">/', $html)) {
        $html = preg_replace('/(<a.*? class=".*?)(".*?>)/', '$1 ' . $classes . '$2', $html);
    } else {
        $html = preg_replace('/(<a.*?)>/', '$1 class="' . $classes . '" >', $html);
    }
    return $html;
}

function my_attachments( $attachments ) {
  $args = array(

    // title of the meta box (string)
    'label'         => 'My Attachments',
    // all post types to utilize (string|array)
    'post_type'     => array('project'),
    // allowed file type(s) (array) (image|video|text|audio|application)
    'filetype'      => null,  // no filetype limit
    // include a note within the meta box (string)
    'note'          => 'Attach files here!',
    // text for 'Attach' button in meta box (string)
    'button_text'   => __( 'Attach Files', 'attachments' ),
    // text for modal 'Attach' button (string)
    'modal_text'    => __( 'Attach', 'attachments' ),
    /**
     * Fields for the instance are stored in an array. Each field consists of
     * an array with three keys: name, type, label.
     *
     * name  - (string) The field name used. No special characters.
     * type  - (string) The registered field type.
     *                  Fields available: text, textarea
     * label - (string) The label displayed for the field.
     */
    'fields'        => array(
      array(
        'name'  => 'alt',                          // unique field name
        'type'  => 'text',                           // registered field type
        'label' => __( 'Alt', 'attachments' ),     // label to display
      )
    ),

  );
  $attachments->register( 'project_attachments', $args ); // unique instance name
}

add_action( 'attachments_register', 'my_attachments' );
add_filter('image_send_to_editor','give_linked_images_class',10,8);
add_filter('excerpt_more', 'new_excerpt_more');
add_filter('excerpt_length', 'new_excerpt_length');
add_action('init', 'create_post_type');
add_action('init', 'register_menus');
add_theme_support('post-thumbnails', ['post', 'work', 'project']);
