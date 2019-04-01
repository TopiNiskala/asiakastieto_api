<?php
	require __DIR__ . '/../vendor/autoload.php';
	include_once '../config/database.php';
	$database = new Database();
	$db = $database->getConnection();
	$auth = new \Delight\Auth\Auth($db);
	if ($auth->isLoggedIn()) {
	require '../getApikey.php';
	} else {
		header("Location: login.php");
	}
?>
<!DOCTYPE html>
<html lang="fi">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Kuntosali</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
	<div class="container" id="container">
		Olet nyt sisällä! :)
	</div>
</body>
</html>
