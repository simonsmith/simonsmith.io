<?
    /**
        Template name: Blog
    */

    $tpl_data = [
        'blog_posts' => []
    ];
    $home_tpl = load_mustache_template('home');

    $blog_posts = new WP_Query([
        'category_name' => 'blog',
        'posts_per_page' => 20
    ]);

    while ($blog_posts->have_posts()) : $blog_posts->the_post();
        array_push($tpl_data['blog_posts'], [
            'title' => get_the_title(),
            'url' => get_permalink(),
            'excerpt' => get_the_excerpt(),
            'w3c_date' => get_the_time('c'),
            'date' => get_the_time('F jS Y')
        ]);
    endwhile;
    wp_reset_postdata();

    page_output($home_tpl, $tpl_data);
