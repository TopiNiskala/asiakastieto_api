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
$_POST = json_decode(file_get_contents("php://input"), true);

$user->user_email = $_POST['user_email'];
$email_exists = $user->emailExists();

include_once '../config/core.php';
include_once '../lib/php-jwt-master/src/BeforeValidException.php';
include_once '../lib/php-jwt-master/src/ExpiredException.php';
include_once '../lib/php-jwt-master/src/SignatureInvalidException.php';
include_once '../lib/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

if ($email_exists && password_verify($_POST['user_password'], $user->user_password)) {
	$token = array(
		"iss" => $iss,
		"aud" => $aud,
		"iat" => $iat,
		"nbf" => $nbf,
		"data" => array(
			"user_id" => $user->user_id,
			"user_first_name" => $user->user_first_name,
			"user_last_name" => $user->user_last_name,
			"user_email" => $user->user_email
		)
	);
	http_response_code(200);
	$jwt = JWT::encode($token, $key);
	echo json_encode(
		array(
			"message" => "Kirjautuminen onnistui.",
			"jwt" => $jwt
		)
	);
} else {
	http_response_code(401);
	echo json_encode(array("message" => "Kirjautuminen epäonnistui."));
}
?>
