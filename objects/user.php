<?php
class User {
	private $conn;
	private $table_name = "user";
	public $user_id;
	public $user_first_name;
	public $user_last_name;
	public $user_email;
	public $user_phone;

	public function __construct($db) {
		$this->conn = $db;
	}

	//READ
	function read() {
		$sql = "SELECT * FROM user WHERE user_id=:user_id";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindParam(":user_id", htmlspecialchars(strip_tags($this->user_id)));
		$stmt->execute();
		return $stmt;
	}
}
?>
