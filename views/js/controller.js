$(document).ready(function() {
	showHomePage();

//------------------------------------------------------------------------------------------
//Show register form

$(document).on('click', '#sign_up', function() {
	var html = `
		<h2>Luo tili</h2>
		<form id='sign_up_form'>
			<div class="form-group">
				<label for="user_first_name">Etunimi</label>
				<input type="text" class="form-control" name="user_first_name" id="user_first_name" required/>
			</div>
			<div class="form-group">
				<label for="user_last_name">Sukunimi</label>
				<input type="text" class="form-control" name="user_last_name" id="user_last_name" required/>
			</div>
			<div class="form-group">
				<label for="user_email">Sähköposti</label>
				<input type="email" class="form-control" name="user_email" id="user_email" required/>
			</div>
			<div class="form-group">
				<label for="user_phone">Puhelin</label>
				<input type="text" class="form-control" name="user_phone" id="user_phone" required/>
			</div>
			<div class="form-group">
				<label for="user_password">Salasana</label>
				<input type="password" class="form-control" name="user_password" id="user_password" required/>
			</div>
			<div class="form-group">
				<label for="user_level">Käyttäjätaso (1-3)</label>
				<input type="number" class="form-control" name="user_level" id="user_level" required/>
			</div>
			<button type="submit" class="btn btn-primary">Luo tili</button>
		</form>`;
	clearResponse();
	$('#content').html(html);
});

//------------------------------------------------------------------------------------------
//Trigger for registration form submit

$(document).on('submit', '#sign_up_form', function() {
	var sign_up_form = $(this);
	var form_data = JSON.stringify(sign_up_form.serializeObject());
	$.ajax({
		url : "http://topiniskala.com/~topi/kuntosali/api/user/create.php",
		type : "POST",
		contentType : "application/json",
		data : form_data,
		success : function(result) {
			$('#response').html("<div class='alert alert-success'>Tilin luonti onnistui!</div>");
			sign_up_form.find('input').val('');
		},
		error : function(xhr, resp, text) {
			$('#response').html("<div class='alert alert-danger'>Tilin luonti epäonnistui!</div>");
		}
	});
	return false;
});

//------------------------------------------------------------------------------------------
//Show login form

$(document).on('click', '#login', function() {
	showLoginPage();
});

//------------------------------------------------------------------------------------------
//Trigger for login form submit

$(document).on('submit', '#login_form', function() {
	var login_form = $(this);
	var form_data = JSON.stringify(login_form.serializeObject());
	$.ajax({
		url : "http://topiniskala.com/~topi/kuntosali/api/user/login.php",
		type : "POST",
		contentType : 'application/json',
		data : form_data,
		success : function(result) {
			setCookie("jwt", result.jwt, 1);
			showHomePage();
			$('#response').html("<div class='alert alert-success'>Kirjautuminen onnistui. Tervetuloa!</div>");
		},
		error : function(xhr, resp, text) {
			$('response').html("<div class='alert alert-danger'>Kirjautuminen epäonnistui.</div>");
			login_form.find('input').val('');
		}
	});
	return false;
});

//------------------------------------------------------------------------------------------
//Show home page

$(document).on('click', '#home', function() {
	showHomePage();
	clearResponse();
});

//------------------------------------------------------------------------------------------
//Show account form

$(document).on('click', '#update_account', function () {
	showUpdateAccountForm();
});

//------------------------------------------------------------------------------------------
//Trigger for update form submit

$(document).on('submit', '#update_account_form', function() {
	var update_account_form = $(this);
	var jwt = getCookie('jwt');
	var update_account_form_obj = update_account_form.serializeObject();
	update_account_form_obj.jwt = jwt;
	var form_data = JSON.stringify(update_account_form_obj);
	$.ajax({
		url : "http://topiniskala.com/~topi/kuntosali/api/user/update.php",
		type : "POST",
		contentType : 'application/json',
		data : form_data,
		success : function(result) {
			$('#response').html("<div class='alert alert-success'>Tili päivitetty.</div>");
				setCookie("jwt", result.jwt, 1);
			},
		error : function(xhr, resp, text) {
			if (xhr.responseJSON.message == "Päivitys epäonnistui.") {
				$('#response').html("<div class='alert alert-danger'>Päivitys epäonnistui.</div>");
			} else if (xhr.responseJSON.message == "Pääsy kielletty.") {
				showLoginPage();
				$('#response').html("<div class='alert alert-danger'>Kirjaudu ensin sisään...</div>");
			}
		}
	});
	return false;
});

//------------------------------------------------------------------------------------------
//Logout

$(document).on('click', '#logout', function() {
	showLoginPage();
	$('#response').html("<div class='alert alert-info'>Olet kirjautunut ulos</div>");
});

//------------------------------------------------------------------------------------------
//Show booking list

$(document).on('click', '#list_booking', function() {
	showBookingList();
});

//------------------------------------------------------------------------------------------
//Serialize object

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//------------------------------------------------------------------------------------------
//END

});
