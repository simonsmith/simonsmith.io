<?
    /**
        Template name: Blog
    */

    $tpl_name = 'home.mustache';
    $tpl_data = [
        'template' => $tpl_name,
        'blog_posts' => []
    ];
    $tpl = load_mustache_template($tpl_name);

    $blog_posts = new WP_Query([
        'category_name' => 'blog',
        'posts_per_page' => 8
    ]);

    while ($blog_posts->have_posts()) : $blog_posts->the_post();
        array_push($tpl_data['blog_posts'], [
            'title' => get_the_title(),
            'url' => get_permalink(),
            'excerpt' => get_the_excerpt(),
            'w3c_date' => get_the_time('c'),
            'date' => get_the_time('F jS Y'),
            'has_date' => true, // Stupid work around because JS mustache is not the same as PHP
            'post_tags' => make_tag_array()
        ]);
    endwhile;
    wp_reset_postdata();

    page_output($tpl, $tpl_data);
