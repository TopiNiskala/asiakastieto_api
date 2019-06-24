<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: TRUE");
header("Content-Type: application/json");

include_once '../config/database.php';
include_once '../objects/booking.php';

$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);

if (isset($_GET['booking_id'])) {
	$booking->booking_id = htmlentities(strip_tags($_GET['booking_id']));
} else {
	die();
}

$booking->readOne();
if ($booking->booking_user != NULL) {
	$booking_arr = array(
		"booking_id" => $booking->booking_id,
		"booking_user" => $booking->booking_user,
		"booking_start_time" => $booking->booking_start_time,
		"booking_end_time" => $booking->booking_end_time,
		"booking_desc" => $booking->booking_desc
	);
	http_response_code(200);
	echo json_encode($booking_arr);
} else {
	http_response_code(404);
	echo json_encode(array("message" => "Booking does not exist."));
}
?>
