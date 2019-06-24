$(document).ready(function(){
	showBookings();

	$(document).on('click', '.read-booking-button', function() {
		showBookings();
	});
});

function showBookings() {
	$.getJSON("http://topiniskala.com/~topi/kuntosali/api/booking/readAll.php", function(data) {
		var read_booking_html = `
			<div id = 'create-booking' class = 'btn btn-primary pull-right m-b-15px create-booking-button'>
				<span class='glyphicon glyphicon-plus'></span> Varaa aika
			</div>
			<table class='table table-bordered table-hover'>
				<tr>
					<th class='w-25-pct'>User</th>
					<th class='w-10-pct'>Start time</th>
					<th class='w-10-pct'>End Time</th>
					<th class='w-25-pct text-align-center'>Action</th>
				</tr>`;
		$.each(data.bookings, function(key, val) {
			read_booking_html+=`
				<tr>
					<td>` + val.booking_user + `</td>
					<td>` + val.booking_start_time + `</td>
					<td>` + val.booking_end_time + `</td>
					<td>
						<button class='btn btn-primary m-r-10px read-one-booking-button' data-id='` + val.booking_id + `'>
							<span class='glyphicon glyphicon-eye-open'></span> Info
						</button>
						<button class='btn btn-info m-r-10px update-booking-button' data-id='` + val.booking_id + `'>
							<span class='glyphicon glyphicon-edit'></span> Muokkaa
						</button>
						<button class='btn btn-danger delete-booking-button' data-id='` + val.booking_id + `'>
							<span class='glyphicon glyphicon-remove'></span> Poista
						</button>
					</td>
				</tr>`;
		});
		read_booking_html+=`</table>`;
		$("#page-content").html(read_booking_html);
		changePageTitle("Varauslista");
	});
}
