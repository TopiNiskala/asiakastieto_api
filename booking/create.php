<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../config/database.php";
include_once "../objects/booking.php";

$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);
$_POST = json_decode(file_get_contents("php://input"), true);
if (
	isset($_POST['booking_user']) &&
	isset($_POST['booking_start_time']) &&
	isset($_POST['booking_end_time'])
) {
	$booking->booking_user = $_POST['booking_user'];
	$booking->booking_start_time = $_POST['booking_start_time'];
	$booking->booking_end_time = $_POST['booking_end_time'];
	if (isset($_POST['booking_desc'])) {
		$booking->booking_desc = $_POST['booking_desc'];
	}
	if ($booking->create()) {
		http_response_code(201);
		echo json_encode(array("message" => "Booking was added to the database."));
	} else {
		http_response_code(503);
		echo json_encode(array("message" => "Unable to add the booking."));
	}
} else {
	http_response_code(400);
	echo json_encode(array("message" => "Unable to add the booking. Incomplete data."));
}
?>
