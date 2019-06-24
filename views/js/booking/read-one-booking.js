$(document).ready(function() {
	$(document).on('click', '.read-one-booking-button', function() {
		var booking_id = $(this).attr('data-id');
		$.getJSON("http://topiniskala.com/~topi/kuntosali/api/booking/readOne.php?booking_id=" + booking_id, function(data){
			var read_one_booking_html=`
				<div id='read-booking' class='btn btn-primary pull-right m-b-15px read-booking-button'>
					<span class='glyphicon glyphicon-list'></span> Varauslista
				</div>
				<table class='table table-bordered table-hover'>
					<tr>
						<td class='w-30.pct'>Käyttäjä</td>
						<td class='w-70-pct'>` + data.booking_user + `</td>
					</tr>
					<tr>
						<td>Aloitusaika</td>
						<td>` + data.booking_start_time + `</td>
					</tr>
					<tr>
						<td>Lopetusaika</td>
						<td>` + data.booking_end_time + `</td>
					</tr>
					<tr>
						<td>Muistiinpanot</td>
						<td>` + data.booking_desc + `</td>
					</tr>
				</table>`;
			$("#page-content").html(read_one_booking_html);
			changePageTitle("Varauksen tiedot");
		});
	});
});
