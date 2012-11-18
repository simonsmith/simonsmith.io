
<?
    $single_work_tpl = load_mustache_template('single-work');

    $attachments = (new AttachmentsPro)->get_attachments([
        'instance'  => 'portfolio',
        'details'   => true
    ]);

    if (have_posts()) {
        while (have_posts()) {
            the_post();
            $tpl_data = [
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'content' => get_the_content(),
            ];

            if (!empty($attachments)) {
                $tpl_data['attachments'] = $attachments;
            }
        }

        page_output($single_work_tpl, $tpl_data);
    }

