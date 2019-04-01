<?php
require __DIR__ . '/vendor/autoload.php';
include_once './config/database.php';
$database = new Database();
$db = $database->getConnection();
$auth = new \Delight\Auth\Auth($db);
$errormsg = '';
try {
	$email = $auth->confirmEmail($_GET['selector'], $_GET['token'])[1];
	$stmt = $db->prepare('SELECT roles_mask, id FROM users WHERE email = :email');
	$stmt->bindValue(':email', $email);
	$stmt->execute();
	$row1 = $stmt->fetchAll()[0];
	$role = 1;
	if ($row1['roles_mask'] == 16384) {
		$role = 2;
	}
	$user_id = $row1['id'];
	$stmt2 = $db->prepare('SELECT apikey FROM users_apikeys WHERE user_id = :user');
	$stmt2->bindValue(':user', $user_id);
	$stmt2->execute();
	$row1 = $stmt2->fetchAll()[0];
	$apikey = $row1['apikey'];
	$stmt3 = $db->prepare('UPDATE users_apikeys SET role = :role WHERE user_id = :user and apikey = :apikey');
	$stmt3->bindValue(':role', $role);
	$stmt3->bindValue(':user', $user_id);
	$stmt3->bindValue(':apikey', $apikey);
	$stmt3->execute();
	$_SESSION['email'] = $email;
} catch (\Delight\Auth\InvalidSelectorTokenPairException $e) {
	$errormsg = "Invalid token";
} catch (\Delight\Auth\TokenExpiredException $e) {
	$errormsg = "Token expired";
} catch (\Delight\Auth\UserAlreadyExistsException $e) {
	$errormsg = "Email address already exists";
} catch (\Delight\Auth\TooManyRequestsException $e) {
	$errormsg = "Too many requests";
} finally {
	$_SESSION['errormsg'] = $errormsg;
	header("Location: views/login.php");
}
?>
