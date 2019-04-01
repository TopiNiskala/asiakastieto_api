<?php
session_start();
require __DIR__ . '/../vendor/autoload.php';
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();
$auth = new \Delight\Auth\Auth($db);
$errormsg = '';

if (isset($_SESSION['errormsg'])) {
	$errormsg = $_SESSION['errormsg'];
	unset ( $_SESSION['errormsg'] );
}

if ($auth->isLoggedIn()) {
	header("Location: index.php");
}

unset ( $_SESSION['apikey'] );

if (isset($_POST['email'])) {
	$_SESSION['email'] = $_POST['email'];
}

if (isset($_POST['email']) && isset($_POST['password'])) {
	if (isset($_POST['rememberme'])) {
		$rememberDuration = (int) (60 * 60 * 24 * 365.25);
	} else {
		$rememberDuration = null;
	}
	try {
		$auth->login($_POST['email'], $_POST['password'], $rememberDuration);
		if ($auth->isLoggedIn()) {
			header("Location: index.php");
		} else {
			$errormsg = "Unknown error";
		}
	} catch (\Delight\Auth\InvalidEmailException $e) {
		$errormsg = "Väärä sähköposti tai salasana";
	} catch (\Delight\Auth\InvalidPasswordException $e) {
		$errormsg = "Väärä sähköposti tai salasana";
	} catch (\Delight\Auth\EmailNotVerifiedException $e) {
		$errormsg = "Sähköposti ei ole hyväksytty";
	} catch (\Delight\Auth\TooManyRequestsException $e) {
		$errormsg = "Liian monta yritystä";
	}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="Topi Niskala">
	<title>Kirjautuminen</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link href="./css/signin.css" rel="stylesheet">
</head>
<body class="text-center">
	<form class="form-signin" method="post">
		<h1 class="h3 mb-3 font-weight-normal">Sisäänkirjautuminen</h1>
		<?php $errormsg and printf("<p class='alert-warning'>%s</p>",$errormsg) ?>
		<label for="inputEmail" class="sr-only">Sähköpostiosoite</label>
		<input type="email" id="email" name="email" class="form-control" placeholder="Sähköpostiosoite" required autofocus <?php isset($_SESSION['email']) and print("value=\"".htmlentities($_SESSION['email'], ENT_QUOTES, "UTF-8")."\"");?>>
		<label for="inputPassword" class="sr-only">Salasana</label>
		<input type="password" id="password" name="password" class="form-control" placeholder="Salasana" required>
		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me" name="rememberme"> Muista minut
			</label>
		</div>
		<button class="btn mb-3 btn-lg btn-primary btn-block" type="submit">Kirjaudu</button>
		<div class="mb-5">
			<a class="float-left" href="register.php">Luo uusi käyttäjätili</a>
			<a class="float-right" href="requestPassword.php">Unohtuiko salasana?</a>
		</div>
		<p class="mt-5 mb-3 text-muted">&copy; Topi Niskala</p>
	</form>
</body>
</html>
