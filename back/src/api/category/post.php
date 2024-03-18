<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];


function postCategories( $name, $tax)
{

    $result = myPDO->prepare("INSERT INTO CATEGORIES(name, tax) VALUES( :name, :tax)");
    $result->bindParam(":name", $name, PDO::PARAM_STR);
    $result->bindParam(":tax", $tax, PDO::PARAM_INT);
    $result->execute();
    print_r( $name, $tax);
};


switch ($method) {
    case "POST":
        $name = $_POST['name'];
        $tax  = $_POST['tax'];
        echo postCategories($name, $tax);
        break;
}
