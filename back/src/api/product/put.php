<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postProduct($name, $price, $category_code, $amount)
{

    $result = myPDO->prepare("INSERT INTO PRODUCTS(name, price, category_code, amount) VALUES( :name, :price, :category_code, :amount)");
    $result->bindParam(":name", $name, PDO::PARAM_STR);
    $result->bindParam(":price", $price, PDO::PARAM_INT);
    $result->bindParam(":category_code", $category_code, PDO::PARAM_INT);
    $result->bindParam(":amount", $amount, PDO::PARAM_INT);
    $result->execute();
};


switch ($method) {
    case "POST":
        $name = $_POST['name'];
        $price = $_POST['price'];
        $category_code = $_POST['category_code'];
        $amount = $_POST['amount'];
        echo postProduct($name, $price, $category_code, $amount);
        break;
}
