<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function getOrderItem()
{
    $orderItem = myPDO->query("SELECT * FROM ORDER_ITEM");
    $orderItem = $orderItem->fetchAll();
    return json_encode($orderItem);
};

switch ($method) {
    case "GET":
        echo getOrderItem();
        break;
}
