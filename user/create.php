<?php
header("Access-Control-Allow-Origin: http://topiniskala.com/~topi/kuntosali/api/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$_POST = json_decode(file_get_contents("php://input"), TRUE);

$user->user_first_name = $_POST['user_first_name'];
$user->user_last_name = $_POST['user_last_name'];
$user->user_email = $_POST['user_email'];
$user->user_phone = $_POST['user_phone'];
$user->user_password = $_POST['user_password'];
$user->user_level = $_POST['user_level'];

if (
	!empty($user->user_first_name) &&
	!empty($user->user_last_name) &&
	!empty($user->user_email) &&
	!empty($user->user_phone) &&
	!empty($user->user_password) &&
	!empty($user->user_level) &&
	$user->create()
) {
	http_response_code(200);
	echo json_encode(array("message" => "User was created."));
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to create user."));
}
?>
