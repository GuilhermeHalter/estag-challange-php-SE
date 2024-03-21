<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postOrder( $total, $tax)
{
    $addPRoduct = myPDO->prepare("INSERT INTO orders( total, tax) VALUES ( :total, :tax)");
    $addPRoduct->bindParam(":total", $total);
    $addPRoduct->bindParam(":tax", $tax);
    $addPRoduct->execute();
};

switch ($method) {
    case "POST":
        $total = $_POST["total"];
        $tax = $_POST["tax"];
        echo postOrder( $total, $tax);
        break;
}
