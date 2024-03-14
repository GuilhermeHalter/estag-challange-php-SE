<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postOrderItem($order_code, $product_code, $amount, $price, $tax)
{
    $addPRoduct = myPDO->prepare("INSERT INTO ORDER_ITEM(order_code, product_code, amount, price, tax) VALUES ('$order_code', $product_code, $amount, $price, $tax)");
    $addPRoduct->execute();
};

switch ($method) {
    case "POST":
        $order_code = $_POST["order_code"];
        $product_code = $_POST["product_code"];
        $amount = $_POST["amount"];
        $price = $_POST["price"];
        $tax = $_POST["tax"];
        echo postOrderItem($order_code, $product_code, $amount, $price, $tax);
        break;
}
