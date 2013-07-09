<?

class JSONPosts {

    private $limit;
    private $offset;
    private $postsRemaning;
    private $maxLimit = 20;

    public function __construct($limit, $offset) {
        $this->limit = (int) $limit;
        $this->offset = (int) $offset;

        if ($this->limit > $this->maxLimit) {
            return;
        }

        $this->query = new WP_Query([
            'category_name' => 'blog',
            'posts_per_page' => $this->limit,
            'offset' => $this->offset
        ]);

        $this->postsRemaning = new WP_Query([
            'category_name' => 'blog',
            'posts_per_page' => $this->limit,
            'offset' => $this->offset + $this->offset
        ]);
    }

    public function getPosts() {
        $data = [
            'posts_remaining' => $this->postsRemaning->post_count,
            'posts' => []
        ];

        while ($this->query->have_posts()) : $this->query->the_post();
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
