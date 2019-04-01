<?php
function validateApikey($moderator_required = false) {
	$headers = apache_request_headers();
	$headers = array_change_key_case($headers);
	$response = new stdClass();

	if (!isset($headers['apikey'])) {
		$response->message = "no apikey found";
		echo json_encode($response);
		exit();
 	}

	$apikey = $headers['apikey'];
	include_once '../config/database.php';
	$database = new Database();
	$db = $database->getConnection();
	$sql = "SELECT * FROM users_apikeys WHERE apikey = :apikey";
	$stmt = $db->prepare($sql);
	$stmt->bindValue ( ":apikey", $apikey );
	$stmt->execute();
	$result = $stmt->fetchAll();

	if ($stmt->rowCount () == 0 || $result[0]["role"] == '0') {
		$response->message = "invalid apikey";
		echo json_encode($response);
		exit();
	}

	if ($moderator_required && $result[0]["role"] != '2') {
		$response->message = "user is not moderator";
		echo json_encode($response);
		exit();
	}

	$tid = $result[0]["tid"];
	return $tid;
}
?>
