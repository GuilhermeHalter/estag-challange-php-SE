<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header('Content-Type: application/json; charset=utf-8');
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function deleteOrders($code)
{
    $removeOrders = myPDO->prepare("DELETE FROM ORDERS WHERE CODE = :code");
    $removeOrders->bindParam(":code", $code, PDO::PARAM_INT);
    $removeOrders->execute();
};

switch ($method) {
    case "DELETE":
        $code = $_GET["code"];
        echo deleteOrders($code);
        break;
}
