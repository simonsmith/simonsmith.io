
<?
    $single_tpl = load_mustache_template('single');

    if (have_posts()) {
        while (have_posts()) {
            the_post();
            $tpl_data = [
                'title' => get_the_title(),
                'content' => get_the_content(),
                'w3c_date' => get_the_time('c'),
                'date' => get_the_time('F jS Y')
            ];
        }

        page_output($single_tpl, $tpl_data);
    }
