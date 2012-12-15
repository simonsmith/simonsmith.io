<?
    /**
        Template name: Projects
    */

    $tpl_name = 'projects.mustache';
    $tpl_data = [
        'template' => $tpl_name,
        'project_items' => []
    ];
    $home_tpl = load_mustache_template($tpl_name);

    $project_items = new WP_Query([
        'post_type' => 'project',
        'posts_per_page' => 20
    ]);

    while ($project_items->have_posts()) : $project_items->the_post();
        array_push($tpl_data['project_items'], [
            'url' => get_permalink(),
            'title' => get_the_title(),
            'excerpt' => get_the_excerpt(),
            'image' => get_the_post_thumbnail(
                get_the_ID(),
                [100, 100],
                [
                    'title' => null,
                    'alt' => get_the_title(),
                    'class' => 'work-img work-img-mini img-border'
                ]
            ),
            'has_image' => true
        ]);
    endwhile;
    wp_reset_postdata();

    page_output($home_tpl, $tpl_data);

