
CREATE TABLE IF NOT EXISTS booking (
	booking_id int(11) NOT NULL AUTO_INCREMENT,
	booking_user int(11) NOT NULL,
	booking_start_time datetime NOT NULL,
	booking_end_time datetime NOT NULL,
	booking_desc VARCHAR(255),
	PRIMARY KEY (booking_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS user (
	user_id int(11) NOT NULL AUTO_INCREMENT,
	user_first_name VARCHAR(35) NOT NULL,
	user_last_name VARCHAR(35) NOT NULL,
	user_email VARCHAR(35) NOT NULL,
	user_phone VARCHAR(35) NOT NULL,
	user_password VARCHAR(2048) NOT NULL,
	user_level smallint NOT NULL,
	PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
