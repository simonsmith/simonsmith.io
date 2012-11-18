<?

require('kint/Kint.class.php');
require('Mustache/Autoloader.php');
Mustache_Autoloader::register();

$mustache = new Mustache_Engine(array(
    'template_class_prefix' => '__PEWordpress_',
    'cache' => dirname(__FILE__).'/templates/cache',
    'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/templates'),
    'partials_loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__).'/templates/partials')
));

add_theme_support('post-thumbnails', ['post', 'work']);

function page_output($tpl, $data) {
    if (!isset($_POST['ajax'])) {
        echo json_encode($data);
    } else {
        get_header();
        echo $tpl->render($data);
        get_footer();
    }
}

function get_permalink_by_title($title) {
    return get_permalink(get_page_by_title($title)->ID);
}

function load_mustache_template($template) {
    global $mustache;
    return $mustache->loadTemplate($template);
}

function create_post_type() {
    register_post_type('work',
        [
            'labels' => [
                'name' => __('Work'),
                'singular_name' => __('Work')
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

function new_excerpt_length() {
    return 20;
}

function new_excerpt_more() {
    return '...';
}

add_filter('excerpt_more', 'new_excerpt_more');
add_filter('excerpt_length', 'new_excerpt_length');
add_action('init', 'create_post_type');

function commentLayout($comment, $args, $depth) {

    $GLOBALS['comment'] = $comment;
    switch ($comment->comment_type) :
        case 'pingback' :
        case 'trackback' :
            ?>
        <li class="post pingback">
            <p><?php _e('Pingback:'); ?> <?php comment_author_link(); ?><?php edit_comment_link(__('Edit'), '<span class="edit-link">', '</span>'); ?></p>
            <?php
            break;
        default :
            ?>
        <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
            <article id="comment-<?php comment_ID(); ?>" class="comment">
                <footer class="comment-meta">
                    <?php
                    $avatar_size = 40;
                    if ('0' != $comment->comment_parent) $avatar_size = 40;

                    echo get_avatar($comment, $avatar_size);
                    ?>

                    <div class="comment-author vcard">
                        <?php
                        /* translators: 1: comment author, 2: date and time */
                        printf(__('%1$s %2$s'),
                            sprintf('<span class="fn">%s</span>', get_comment_author_link()),
                            sprintf('<a href="%1$s"><time datetime="%2$s">%3$s</time></a>',
                                esc_url(get_comment_link($comment->comment_ID)),
                                get_comment_time('c'),
                                /* translators: 1: date, 2: time */
                                sprintf(__('%1$s at %2$s', 'twentyeleven'), get_comment_date(), get_comment_time())
                            )
                        );
                        ?>

                        <?php edit_comment_link(__('Edit', 'twentyeleven'), '<span class="edit-link">', '</span>'); ?>
                    </div>
                    <!-- .comment-author .vcard -->

                    <?php if ($comment->comment_approved == '0') : ?>
                    <p><em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.'); ?></em></p>
                    <?php endif; ?>

                </footer>

                <div class="comment-content"><?php comment_text(); ?></div>

                <div class="reply">
                    <?php comment_reply_link(array_merge($args, array('reply_text' => __('Reply'), 'depth' => $depth, 'max_depth' => $args['max_depth']))); ?>
                </div>
                <!-- .reply -->
            </article><!-- #comment-## -->

                <?php
            break;
    endswitch;
}

?>
