<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postOrderItem($order_code, $product_code, $amount, $price, $tax)
{
    $addPRoduct = myPDO->prepare("INSERT INTO ORDER_ITEM(order_code, product_code, amount, price, tax) VALUES (:order_code, :product_code, :amount, :price, :tax)");
    $addPRoduct->bindParam(":order_code", $order_code);
    $addPRoduct->bindParam(":product_code", $product_code);
    $addPRoduct->bindParam(":amount", $amount);
    $addPRoduct->bindParam(":price", $price);
    $addPRoduct->bindParam(":tax", $tax);
    $addPRoduct->execute();
};

switch ( $method) {
    case "POST":

        $order_code = $_POST["order_code"];
        $product_code = $_POST["product_code"];
        $amount = $_POST["amount"];
        $price = $_POST["price"];
        $tax = $_POST["tax"];
        echo postOrderItem($order_code, $product_code, $amount, $price, $tax);
        break;
}
