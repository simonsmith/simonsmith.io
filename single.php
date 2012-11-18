
<?
    $tpl_data = [];
    $single_tpl = load_mustache_template('single');

    if (have_posts()) {
        while (have_posts()) {
            the_post();
            $tpl_data['title'] = get_the_title();
            $tpl_data['content'] = get_the_content();
            $tpl_data['w3c_date'] = get_the_time('c');
            $tpl_data['date'] = get_the_time('F jS Y');
        }

        page_output($single_tpl, $tpl_data);
    }
