$(document).ready(function() {
	$(document).on('click', '.update-booking-button', function() {
		var booking_id = $(this).attr('data-id');
		$.getJSON("http://topiniskala.com/~topi/kuntosali/api/booking/readOne.php?booking_id=" + booking_id, function(data) {
			var booking_user = data.booking_user;
			var booking_start_time = data.booking_start_time;
			var booking_end_time = data.booking_end_time;
			var booking_desc = data.booking_desc;

			var update_booking_html =`
				<div id='read-booking' class='btn btn-primary pull-right m-b-15px read-booking-button'>
					<span class='glyphicon glyphicon-list'></span> Varauslista
				</div>
				<form id='update-booking-form' action='#' method='POST' border='0'>
					<table class='table table-hover table-responsive table-bordered'>
						<tr>
							<td>Aloitusaika</td>
							<td><input value=\"` + booking_start_time + `\" type='datetime-local' name='booking_start_time' class='form-control' required/></td>
						</tr>
						<tr>
							<td>Lopetusaika</td>
							<td><input value=\"` + booking_end_time + `\" type='datetime-local' name='booking_end_time' class='form-control' required/></td>
						</tr>
						<tr>
							<td>Muistiinpanot</td>
							<td><textarea name='booking_desc' class='form-control'>` + booking_desc + `</textarea></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<input value=\"` + booking_id + `\" name='booking_id' type='hidden'>
								<input value=\"` + booking_user + `\" name='booking_user' type='hidden'>
								<button type='submit' class='btn btn-info pull-right'>
									<span class='glyphicon glyphicon-edit'></span> Päivitä
								</button>
							</td>
						</tr>
					</table>
				</form>`;
			$("#page-content").html(update_booking_html);
			changePageTitle("Päivitä varaus");
		});
	});
	$(document).on('submit', '#update-booking-form', function() {
		var form_data = JSON.stringify($(this).serializeObject());
		$.ajax({
			url : "http://topiniskala.com/~topi/kuntosali/api/booking/update.php",
			type : "POST",
			contentType : 'application/json',
			data : form_data,
			success : function(result) {
				showBookings();
			},
			error : function(xhr, resp, text) {
				console.log(xhr, resp, text);
			}
		});
		return false;
	});
});
