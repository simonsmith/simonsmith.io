<?
    $tpl_name = 'single_project.mustache';
    $single_work_tpl = load_mustache_template($tpl_name);
    $attachments = new Attachments('project_attachments');

    if (have_posts()) {
        while (have_posts()) {
            the_post();
            $tpl_data = [
                'template' => $tpl_name,
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => apply_filters('the_content', get_the_content()),
                'attachments' => []
            ];

            if ($attachments->exist()) {
                while ($attachments->get()) {
                    array_push($tpl_data['attachments'], [
                        'url' => $attachments->src('full'),
                        'thumb' => $attachments->src('thumbnail'),
                        'alt' => $attachments->field('alt')
                    ]);
                }
            }
        }

        page_output($single_work_tpl, $tpl_data);
    }

