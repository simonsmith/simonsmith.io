<?
    /**
        Template name: CV
    */

    $tpl_name = 'cv.mustache';
    $cv_tpl = load_mustache_template($tpl_name);

    $tpl_data = [
        'template' => $tpl_name,
        'project_items' => []
    ];

    page_output($cv_tpl, $tpl_data);

