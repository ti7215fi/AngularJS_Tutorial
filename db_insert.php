<?php
include 'db_connect.php';

$file = "data/articles.json";

$json = json_decode(file_get_contents($file), true);

$articles = $mongo->articles;

$articles->insert(array(
    "id"    => $json->{"id"},
    "name"  => $json->{"name"},
    "price" => $json->{"price"}
));
        
     