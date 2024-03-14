<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
include('../configs.php');
$method = $_SERVER['REQUEST_METHOD'];

function deleteCategory($code)
{
    $stmt = myPDO->prepare("DELETE FROM CATEGORIES WHERE code = {$code}");
    $stmt->execute();
};
switch ($method) {
    case "DELETE":
        $code = $_GET["code"];
        echo deleteCategory($code);
        break;
}
