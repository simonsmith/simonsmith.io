<?

class JSONPosts {

    private $maxLimit = 20;

    public function getPosts($limit, $offset) {
        $limit = (int) $limit;
        $offset = (int) $offset;

        if ($limit > $this->maxLimit) {
            return json_encode([]);
        }

        $query = new WP_Query([
            'category_name' => 'blog',
            'posts_per_page' => $limit,
            'offset' => $offset
        ]);

        $postsRemaning = new WP_Query([
            'category_name' => 'blog',
            'posts_per_page' => $limit,
            'offset' => $offset + $offset
        ]);

        $data = [
            'posts_remaining' => $postsRemaning->post_count,
            'posts' => []
        ];

        while ($query->have_posts()) : $query->the_post();
            array_push($data['posts'], [
                'title' => get_the_title(),
                'url' => get_permalink(),
                'excerpt' => get_the_excerpt(),
                'w3c_date' => get_the_time('c'),
                'date' => get_the_time('F jS Y'),
                'has_date' => true,
                'post_tags' => make_tag_array()
            ]);
        endwhile;

        header('Content-Type: application/json');
        return json_encode($data);
    }

}
