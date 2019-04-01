<?php
require __DIR__ . '/../vendor/autoload.php';
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();
$auth = new \Delight\Auth\Auth($db);
try {
	$auth->logOut();
	unset ( $_SESSION['apikey'] );
	unset($_COOKIE['target-tid']);
	setcookie('target-tid', null, -1, '/');
	$_SESSION['errormsg'] = "Kirjauduit ulos";
} catch (\Delight\Auth\NotLoggedInException $e) {
} finally {
  header("Location: login.php");
}
?>
