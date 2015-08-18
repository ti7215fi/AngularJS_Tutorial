<?php

$client     = new MongoClient();              // connect
echo "Connection successful";
$db         = $client->selectDB("articles");