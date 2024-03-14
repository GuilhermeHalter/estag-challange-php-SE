<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];


function deleteProduct($code)
{
    $stmt = myPDO->prepare("DELETE FROM PRODUCTS WHERE code = :code");
    $stmt->bindParam(":code", $code, PDO::PARAM_INT);
    $stmt->execute();
};
switch ($method) {
    case "DELETE":
        $code = $_GET["code"];
        echo deleteProduct($code);
        break;
}
