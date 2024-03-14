<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function deleteOrderItem($code)
{
    $removeOrderItem = myPDO->prepare("DELETE FROM ORDER_ITEM WHERE CODE = :code");
    $removeOrderItem->bindParam(":code", $code, PDO::PARAM_INT);
    $removeOrderItem->execute();
};

switch ($method) {
    case "DELETE":
        $code = $_GET["code"];
        echo deleteOrderItem($code);
        break;
}
