<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/booking.php';

$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);
$_POST = json_decode(file_get_contents("php://input"), TRUE);

$booking->booking_id = $_POST['booking_id'];
if ($booking->delete()) {
	http_response_code(200);
	echo json_encode(array("message" => "Booking was deleted."));
} else {
	http_response_code(503);
	echo json_encode(array("message" => "Unable to delete booking."));
}
?>
