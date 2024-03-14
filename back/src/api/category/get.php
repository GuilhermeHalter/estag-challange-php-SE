<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function getCategories()
{
    $categories = myPDO->query('SELECT * FROM CATEGORIES');
    $categories = $categories->fetchALL();
    return json_encode($categories);
};

switch ($method) {
    case "GET":
        echo getCategories();
        break;
}
