<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("'Content-Type': 'application/json'");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postOrderItem($order_code, $product_code, $amount, $price, $tax)
{ 
    $addOrderItem = myPDO->prepare("INSERT INTO ORDER_ITEM(order_code, product_code, amount, price, tax) VALUES (:order_code, :product_code, :amount, :price, :tax)");
    $addOrderItem->bindParam(":order_code", $order_code);
    $addOrderItem->bindParam(":product_code", $product_code);
    $addOrderItem->bindParam(":amount", $amount);
    $addOrderItem->bindParam(":price", $price);
    $addOrderItem->bindParam(":tax", $tax);
    $addOrderItem->execute();
}

switch ($method) {
    case "POST":
        $order_code = filter_input(INPUT_POST, "order_code", FILTER_SANITIZE_NUMBER_INT);
        $product_code = filter_input(INPUT_POST, "product_code", FILTER_SANITIZE_NUMBER_INT);
        $amount = filter_input(INPUT_POST, "amount", FILTER_SANITIZE_NUMBER_INT);
        $price = filter_input(INPUT_POST, "price", FILTER_SANITIZE_NUMBER_FLOAT);
        $tax = filter_input(INPUT_POST, "tax", FILTER_SANITIZE_NUMBER_FLOAT);
        postOrderItem($order_code, $product_code, $amount, $price, $tax);
        break;
}
?>