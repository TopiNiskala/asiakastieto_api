<?php
class Booking {
	private $conn;
	private $table_name = "booking";

	public $booking_id;
	public $booking_user;
	public $booking_start_time;
	public $booking_end_time;
	public $booking_desc;

	public function __construct($db) {
		$this->conn = $db;
	}

	//READ ALL
	function readAll() {
		$sql = "SELECT booking_id, booking_user, booking_start_time, booking_end_time FROM booking";
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		return $stmt;
	}

	//CREATE
	function create() {
		$sql = "INSERT INTO booking SET booking_user=:booking_user, booking_start_time=:booking_start_time, booking_end_time=:booking_end_time, booking_desc=:booking_desc";
		$stmt = $this->conn->prepare($sql);

		$stmt->bindValue(":booking_user", htmlspecialchars(strip_tags($this->booking_user)));
		$stmt->bindValue(":booking_start_time", htmlspecialchars(strip_tags($this->booking_start_time)));
		$stmt->bindValue(":booking_end_time", htmlspecialchars(strip_tags($this->booking_end_time)));
		$stmt->bindValue(":booking_desc", htmlspecialchars(strip_tags($this->booking_desc)));

		if ($stmt->execute()) {
			return true;
		}
		return false;
	}

	//UPDATE
	function update() {
		$sql = "UPDATE booking SET booking_start_time=:booking_start_time, booking_end_time=:booking_end_time booking_desc=:booking_desc WHERE booking_id=:booking_id";
		$stmt = $this->conn->prepare($sql);

		$stmt->bindValue(":booking_start_time", htmlspecialchars(strip_tags($this->booking_start_time)));
                $stmt->bindValue(":booking_end_time", htmlspecialchars(strip_tags($this->booking_end_time)));
		$stmt->bindValue(":booking_id", htmlspecialchars(strip_tags($this->booking_id)));
		$stmt->bindValue(":booking_desc", htmlspecialchars(strip_tags($this->booking_desc)));

		if ($stmt->execute()) {
			return true;
		}
		return false;
	}

	//DELETE
	function delete() {
		$sql = "DELETE FROM booking WHERE booking_id=:booking_id";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindValue(":booking_id", htmlspecialchars(strip_tags($this->booking_id)));

		if ($stmt->execute()) {
			return true;
		}
		return false;
	}
}
?>
