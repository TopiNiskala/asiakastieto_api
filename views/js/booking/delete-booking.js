$(document).ready(function() {
	$(document).on('click', '.delete-booking-button', function() {
		var id = $(this).attr('data-id');
		bootbox.confirm({
			message: "<h4>Oletko varma?</h4>",
			buttons: {
				confirm: {
					label: '<span class="glyphicon glyphicon-ok"></span> Kyllä',
					className: 'btn-danger'
				},
				cancel: {
					label: '<span class="glyphicon glyphicon-remove"></span> Ei',
					className: 'btn-primary'
				}
			},
			callback: function (result) {
				if (result == true) {
					$.ajax({
						url : "http://topiniskala.com/~topi/kuntosali/api/booking/delete.php",
						type : "POST",
						dataType : 'json',
						data : JSON.stringify({ booking_id: id }),
						success : function(result) {
							showBookings();
						},
						error: function(xhr, resp, text) {
							console.log(xhr, resp, text);
						}
					});
				}
			}
		});
	});
});
