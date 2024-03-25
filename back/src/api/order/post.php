<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postOrder($total, $tax)
{
    $addOrder = myPDO->prepare("INSERT INTO orders(total, tax) VALUES (:total, :tax)");
    $addOrder->bindParam(":total", $total);
    $addOrder->bindParam(":tax", $tax);
    $addOrder->execute();
    return myPDO->lastInsertId();
}

switch ($method) {
    case "POST":
        $total = $_POST["total"];
        $tax = $_POST["tax"];
        $order_code = postOrder($total, $tax);
        echo $order_code;
        break;
}
?>