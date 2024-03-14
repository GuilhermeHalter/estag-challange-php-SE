<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];


function postCategories($code, $name, $tax)
{

    $result = myPDO->prepare("INSERT INTO CATEGORIES(code, name, tax) VALUES('$code', '$name', '$tax')");
    $result->execute();
    print_r($code, $name, $tax);
};


switch ($method) {
    case "POST":
        $code = $_POST['code'];
        $name = $_POST['name'];
        $tax  = $_POST['tax'];
        echo postCategories($code, $name, $tax);
        break;
}
