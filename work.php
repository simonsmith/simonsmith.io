<?
    /**
        Template name: Work
    */

    $tpl_data = [
        'work_items' => []
    ];
    $home_tpl = load_mustache_template('work');

    $work_items = new WP_Query([
        'post_type' => 'work',
        'orderby' => 'date',
        'posts_per_page' => 20
    ]);

    while ($work_items->have_posts()) : $work_items->the_post();
        array_push($tpl_data['work_items'], [
            'url' => get_permalink(),
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
            'image' => get_the_post_thumbnail(get_the_ID(), [100, 100], ['title' => null, 'alt' => get_the_title()])
        ]);
    endwhile;
    wp_reset_postdata();

    page_output($home_tpl, $tpl_data);

