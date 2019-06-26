<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/core.php';
include_once '../lib/php-jwt-master/src/BeforeValidException.php';
include_once '../lib/php-jwt-master/src/ExpiredException.php';
include_once '../lib/php-jwt-master/src/SignatureInvalidException.php';
include_once '../lib/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

include_once "../config/database.php";
include_once "../objects/user.php";

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$_POST = json_decode(file_get_contents("php://input"), true);
$jwt = isset($_POST['jwt']) ? $_POST['jwt'] : "";

if ($jwt) {
	try {
		$decoded = JWT::decode($jwt, $key, array('HS256'));
		$user->user_id = $_POST['user_id'];
		$user->user_first_name = $_POST['user_first_name'];
		$user->user_last_name = $_POST['user_last_name'];
		$user->user_email = $_POST['user_email'];
		$user->user_phone = $_POST['user_phone'];
		$user->user_password = $_POST['user_password'];
		$user->user_level = $_POST['user_level'];
		if ($user->update()) {
			$token = array(
				"iss" => $iss,
				"aud" => $aud,
				"iat" => $iat,
				"nbf" => $nbf,
				"data" => array(
					"user_id" => $user->user_id,
					"user_first_name" => $user->user_first_name,
					"user_last_name" => $user->user_last_name,
					"user_email" => $user->user_email,
					"user_level" => $user->user_level
				)
			);
			$jwt = JWT::encode($token, $key);
			http_response_code(200);
			echo json_encode(
				array(
					"message" => "User was updated",
					"jwt" => $jwt
				)
			);
		} else {
			http_response_code(401);
			echo json_encode(array("message" => "Unable to update user."));
		}
	} catch (Exception $e) {
		http_response_code(401);
		echo json_encode(array(
			"message" => "Login failure.",
			"error" => $e->getMessage()
		));
	}
} else {
	http_response_code(401);
	echo json_encode(array("message" => "Login failure."));
}
?>
