
    <?
        $blog_posts = new WP_Query([
            'category_name' => 'blog',
            'orderby' => 'date'
        ]);
        echo '<pre>';
        var_dump($blog_posts);
        echo '</pre>';
    ?>
