<?
/**
    Template name: More Posts
*/

require_once 'JSONPosts.php';

echo (new JSONPosts($_GET['limit'], $_GET['offset']))->getPosts();
