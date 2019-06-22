<?php
header("Access-Control-Allow_Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../objects/booking.php";

$database = new Database();
$db = $database->getConnection();

$booking = new Booking($db);

$stmt = $booking->readAll();
$num = $stmt->rowCount();

if ($num > 0) {
	$booking_arr = array();
	$booking_arr['bookings'] = array();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		extract($row);
		$booking_item = array(
			"booking_id" => $booking_id,
			"booking_user" => $booking_user,
			"booking_start_time" => $booking_start_time,
			"booking_end_time" => $booking_end_time
		);
		array_push($booking_arr["bookings"], $booking_item);
	}
	http_response_code(200);
	echo json_encode($booking_arr);
} else {
	http_response_code(404);
	echo json_encode(
		array("message" => "No bookings found")
	);
}
?>
