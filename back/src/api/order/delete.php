<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function deleteOrders($code)
{
    $removeOrders = myPDO->prepare("DELETE FROM ORDERS WHERE CODE = {$code}");
    $removeOrders->execute();
};

switch ($method) {
    case "DELETE":
        $code = $_GET["code"];
        echo deleteOrders($code);
        break;
}
