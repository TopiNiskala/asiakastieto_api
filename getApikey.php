<?php
if (!isset($_SESSION['apikey'])) {
	$stmt = $db->prepare('SELECT apikey FROM users_apikeys where user_id = :user');
	$stmt->bindValue(':user', $auth->getUserId());
	$stmt->execute();
	$row1 = $stmt->fetch(PDO::FETCH_ASSOC);
	$_SESSION['apikey'] = $row1['apikey'];
}
$apikey = $_SESSION['apikey'];
?>
