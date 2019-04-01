<?php
session_start();
require __DIR__ . '/../vendor/autoload.php';
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();
$auth = new \Delight\Auth\Auth($db);
$errormsg = '';

if (isset($_POST['email'])) {
	$_SESSION['email'] = $_POST['email'];
}

if (isset($_POST['email']) && isset($_POST['password'])) {
	try {
		$url = '';
		$userId = $auth->register($_POST['email'], $_POST['password'], null, function ($selector, $token) {
			$to = $_POST['email'];
			$subject = "Uuden käyttäjätunnuksen vahvistus";
			$emailConf = include('../config/email.php');
			$url = $emailConf['url_begin'] . "/verifyEmail.php?selector=" . \urlencode($selector) . "&token=" . \urlencode($token);
			$txt = "Hyväksy uuden käyttäjätunnuksen luonti klikkaamalla seuraavaa linkkiä: " . $url;
			$emailHeaders = "From: " . $emailConf['from_address'] . "\r\n";
			$emailHeaders.= "Content-Type: text/plain;charset=utf-8\r\n";
			mail($to, $subject, $txt, $emailHeaders);
		});
		$auth->admin()->addRoleForUserById($userId, \Delight\Auth\Role::MODERATOR);
		$stmt = $db->prepare("INSERT INTO users_apikeys (user_id, apikey) VALUES (:user, :apikey)");
		$stmt->bindValue(':user', $userId);
		$stmt->bindValue(':apikey', randomString());
		$stmt->execute();
		header("Location: thankyou.html");
	} catch (\Delight\Auth\InvalidEmailException $e) {
		$errormsg = "Sähköposti virheellinen.";
	} catch (\Delight\Auth\InvalidPasswordException $e) {
		$errormsg = "Salasana virheellinen.";
	} catch (\Delight\Auth\UserAlreadyExistsException $e) {
		$errormsg = "Käyttäjä on jo olemassa.";
	} catch (\Delight\Auth\TooManyRequestsException $e) {
		$errormsg = "Liian monta yritystä.";
	} catch (\Delight\Auth\UnknownIdException $e) {
		$errormsg = "Tuntematon Id";
	}
}

function randomString() {
	do {
		$hash = base64_encode(random_bytes(30));
		$removeChars = array('+', '/', '=');
		$hash = str_replace($removeChars, '', $hash);
	} while (strlen($hash) < 20);
	return substr($hash, 0, 20);
}
?>

<!DOCTYPE html>
<html lang="fi">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="author" content="Topi Niskala">
		<title>Uusi käyttäjätili</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link href="./css/signin.css" rel="stylesheet">
	</head>
	<body class="text-center">
		<form class="form-signin" method="post">
			<h1 class="h3 mb-3 font-weight-normal">Luo uusi käyttäjätili</h1>
			<?php $errormsg and printf("<p class='alert-warning'>%s</p>", $errormsg)?>
			<label for="inputEmail" class="sr-only">Sähköposti</label>
			<input type="email" id="email" name="email" class="form-control" placeholder="Sähköposti" required autofocus <?php isset($_SESSION['email']) and print("value=\"".htmlentities($_SESSION['email'], ENT_QUOTES, "UTF-8")."\"");?>>
			<label for="inputPassword" class="sr-only">Salasana</label>
			<input type="password" id="password" name="password" class="form-control" placeholder="Salasana" required>
			<button class="btn mb-3 btn-lg btn-primary btn-block" type="submit">Luo tili</button>
			<div class="mb-5">
				<a class="float-left" href="login.php">Kirjautuminen</a>
			</div>
			<p class="mt-5 mb-3 text-muted">&copy; Topi Niskala</p>
		</form>
	</body>
</html>
