<?php
class User {
	private $conn;
	private $table_name = "user";
	public $user_id;
	public $user_first_name;
	public $user_last_name;
	public $user_email;
	public $user_phone;
	public $user_password;
	public $user_level;

	public function __construct($db) {
		$this->conn = $db;
	}

	//CREATE
	function create() {
		$sql = "INSERT INTO user SET user_first_name=:user_first_name, user_last_name=:user_last_name, user_email=:user_email, user_phone=:user_phone, user_password=:user_password, user_level=:user_level";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindValue(":user_first_name", htmlspecialchars(strip_tags($this->user_first_name)));
		$stmt->bindValue(":user_last_name", htmlspecialchars(strip_tags($this->user_last_name)));
		$stmt->bindValue(":user_email", htmlspecialchars(strip_tags($this->user_email)));
		$stmt->bindValue(":user_phone", htmlspecialchars(strip_tags($this->user_phone)));
		$password_hash = password_hash($this->user_password, PASSWORD_BCRYPT);
		$stmt->bindValue(":user_password", htmlspecialchars(strip_tags($password_hash)));
		$stmt->bindValue(":user_level", htmlspecialchars(strip_tags($this->user_level)));

		if ($stmt->execute()) {
			return true;
		}
		return false;
	}

	//UPDATE
	function update() {
		$password_set = !empty($this->user_password) ? ", user_password = :user_password" : "";
		$sql = "UPDATE " . $this->table_name . " SET user_first_name=:user_first_name, user_last_name=:user_last_name, user_email=:user_email, user_phone=:user_phone, user_level=:user_level {$password_set} WHERE user_id=:user_id";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindValue(":user_first_name", htmlspecialchars(strip_tags($this->user_first_name)));
		$stmt->bindValue(":user_last_name", htmlspecialchars(strip_tags($this->user_last_name)));
		$stmt->bindValue(":user_email", htmlspecialchars(strip_tags($this->user_email)));
		$stmt->bindValue(":user_phone", htmlspecialchars(strip_tags($this->user_phone)));
		$stmt->bindValue(":user_level", htmlspecialchars(strip_tags($this->user_level)));
		if (!empty($this->user_password)) {
			$this->user_password = htmlspecialchars(strip_tags($this->user_password));
			$password_hash = password_hash($this->user_password, PASSWORD_BCRYPT);
			$stmt->bindValue(":user_password", $password_hash);
		}
		$stmt->bindValue(":user_id", $this->user_id);

		if ($stmt->execute()) {
			return true;
		}
		return false;
	}

	//CHECK EMAIL
	function emailExists() {
		$sql = "SELECT user_id, user_first_name, user_last_name, user_password FROM user WHERE user_email=:user_email LIMIT 0,1";
		$stmt = $this->conn->prepare($sql);
		$stmt->bindValue(":user_email", htmlspecialchars(strip_tags($this->user_email)));
		$stmt->execute();
		$num = $stmt->rowCount();
		if ($num > 0) {
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			$this->user_id = $row['user_id'];
			$this->user_first_name = $row['user_first_name'];
			$this->user_last_name = $row['user_last_name'];
			$this->user_password = $row['user_password'];
			return true;
		}
		return false;
	}
}
?>
