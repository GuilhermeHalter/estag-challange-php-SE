<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function updateCategories($name, $code, $tax)
{
    global $myPDO;
    $stmt = $myPDO->prepare("UPDATE CATEGORIES SET name = '$name', tax = '$tax' WHERE code = '$code'");
    $stmt->execute();
};

switch ($method) {
    case "PUT":
        $name = $_GET["name"];
        $tax = $_GET["tax"];
        $code = $_GET["code"];
        echo updateCategories($name, $code, $tax);
        break;
}
