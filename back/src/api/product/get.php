<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function getProducts()
{
    $products = myPDO->query('SELECT PRODUCTS.*, CATEGORIES.TAX, CATEGORIES.NAME AS CATEGORYNAME FROM PRODUCTS JOIN CATEGORIES ON PRODUCTS.CATEGORY_CODE = CATEGORIES.CODE');
    $products = $products->fetchALL();
    return json_encode($products);
};

switch ($method) {
    case "GET":
        echo getProducts();
        break;
}
