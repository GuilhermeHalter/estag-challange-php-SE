<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');

$method = $_SERVER['REQUEST_METHOD'];

function postOrder($code, $total, $tax)
{
    $addPRoduct = myPDO->prepare("INSERT INTO orders(code, total, tax) VALUES ('$code', $total, $tax)");
    $addPRoduct->execute();
};

switch ($method) {
    case "POST":
        $code = $_POST["code"];
        $total = $_POST["total"];
        $tax = $_POST["tax"];
        echo postOrder($code, $total, $tax);
        break;
}
