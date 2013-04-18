<?
    $tpl_name = 'tag.mustache';
    $single_tpl = load_mustache_template($tpl_name);

    $tpl_data = [
        'tag' => single_tag_title('', false),
        'template' => $tpl_name,
        'blog_posts' => []
    ];

    while (have_posts()) {
        the_post();
        array_push($tpl_data['blog_posts'], [
            'title' => get_the_title(),
            'url' => get_permalink(),
            'excerpt' => get_the_excerpt(),
            'w3c_date' => get_the_time('c'),
            'date' => get_the_time('F jS Y'),
            'has_date' => true,
            'post_tags' => make_tag_array()
        ]);
    }

    page_output($single_tpl, $tpl_data);
