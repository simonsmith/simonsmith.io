<?
class ScriptPath {

    private $server;
    private $template_dir;
    private $domain;

    function __construct($domain) {
        $this->server = $_SERVER['SERVER_NAME'];
        $this->template_dir = get_template_directory_uri();
        $this->domain = $domain;
    }

    public function getPath() {
        if ($this->server === $this->domain) {
            $folder = 'scripts.dist';
        } else {
            $folder = 'scripts';
        }

        return "{$this->template_dir}/assets/{$folder}";
    }

}
