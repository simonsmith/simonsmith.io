<?

class JSONPosts {

    private $limit;
    private $offset;
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
    }

    public function getPosts() {
        $posts = [];
        while ($this->query->have_posts()) : $this->query->the_post();
            array_push($posts, [
                'title' => get_the_title(),
                'url' => get_permalink(),
                'excerpt' => get_the_excerpt(),
                'w3c_date' => get_the_time('c'),
                'date' => get_the_time('F jS Y'),
                'has_date' => true // Stupid work around because JS mustache is not the same as PHP
            ]);
        endwhile;

        header('Content-Type: application/json');
        return json_encode($posts);
    }

}
