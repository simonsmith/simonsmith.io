<?
    $tpl_name = 'single.mustache';
    $single_tpl = load_mustache_template($tpl_name);

    while (have_posts()) {
        the_post();
        $tpl_data = [
            'template' => $tpl_name,
            'title' => get_the_title(),
            'content' => apply_filters('the_content', get_the_content()),
            'w3c_date' => get_the_time('c'),
            'date' => get_the_time('F jS Y'),
            'post_tags' => make_tag_array()
        ];
    }

    page_output($single_tpl, $tpl_data);
