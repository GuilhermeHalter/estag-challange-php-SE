<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("'Content-Type': 'application/json'");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function getOrder()
{
    $orders = myPDO->query("SELECT * FROM ORDERS");
    $orders = $orders->fetchAll();
    return json_encode($orders);
};
switch ($method) {
    case "GET":
        echo getOrder();
        break;
}
