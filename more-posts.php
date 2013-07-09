<?
/**
    Template name: More Posts
*/

require_once 'JSONPosts.php';
$posts = new JSONPosts();

echo $posts->getPosts($_GET['limit'], $_GET['offset']);
