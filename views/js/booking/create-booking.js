$(document).ready(function() {
	$(document).on('click', '.create-booking-button', function() {
		var create_booking_html =`
			<div id='read-booking' class='btn btn-primary pull-right m-b-15px read-booking-button'>
				<span class='glyphicon glyphicon-list'></span> Varauslista
			</div>
			<form id='create-booking-form' action='#' method='POST' border='0'>
				<table class='table table-hover table-responsive table-bordered'>
					<input type='hidden' name='booking_user' class='form-control' value='1'></td>
					<tr>
						<td>Aloitusaika</td>
						<td><input type='datetime-local' name='booking_start_time' class='form-control' required/></td>
					</tr>
					<tr>
						<td>Lopetusaika</td>
						<td><input type='datetime-local' name='booking_end_time' class='form-control' required /></td>
					</tr>
					<tr>
						<td>Kommentit</td>
						<td><textarea name='booking_desc' class='form-control'></textarea></td>
					</tr>
					<tr>
						<td></td>
						<td>
							<button type='submit' class='btn btn-primary'>
								<span class='glyphicon glyphicon-plus'></span> Tee Varaus
							</button>
						</td>
					</tr>
				</table>
			</form>`;
		$("#page-content").html(create_booking_html);
		changePageTitle("Tee varaus");
	});
	$(document).on('submit', '#create-booking-form', function() {
		var form_data = JSON.stringify($(this).serializeObject());
		$.ajax({
			url : "http://topiniskala.com/~topi/kuntosali/api/booking/create.php",
			type : "POST",
			contentType : "application/json",
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
