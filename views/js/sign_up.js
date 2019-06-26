$(document).ready(function() {
	//Show sign up / registration form
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
	//Trigger when registration form is submitted
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
	//Show login form
	$(document).on('click', '#login', function() {
		showLoginPage();
	});
	//Login form submit trigger
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
	//show home page
	$(document).on('click', '#home', function() {
		showHomePage();
		clearResponse();
	});
	//Trigger to show account form
	$(document).on('click', '#update_account', function () {
		showUpdateAccountForm();
	});
	//Trigger to update account info
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
	//trigger to logout
	$(document).on('click', '#logout', function() {
		showLoginPage();
		$('#response').html("<div class='alert alert-info'>Olet kirjautunut ulos</div>");
	});
	//clearResponse()
	function clearResponse() {
		$('#response').html('');
	}
	//showLoginPage()
	function showLoginPage() {
		setCookie("jwt", "", 1);
		var html = `
			<h2>Login</h2>
			<form id='login_form'>
				<div class='form-group'>
					<label for='user_email'>Sähköposti</label>
					<input type='email' class='form-control' id='user_email' name='user_email' placeholder='Sähköposti'>
				</div>
				<div class='form-group'>
					<label for='user_password'>Salasana</label>
					<input type='password' class='form-control' id='user_password' name='user_password' placeholder='Salasana'>
				</div>
				<button type='submit' class='btn btn-primary'>Kirjaudu</button>
			</form>`;
		$('#content').html(html);
		clearResponse();
		showLoggedOutMenu();
	}
	//setCookie()
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	//showLoggedOutMenu()
	function showLoggedOutMenu() {
		$("#login, #sign_up").show();
		$("#logout").hide();
	}
	//showHomePage()
	function showHomePage() {
		var jwt = getCookie('jwt');
		$.post("http://topiniskala.com/~topi/kuntosali/api/user/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
			var html = `
				<div class = "card">
					<div class="card-header">Tervetuloa!</div>
					<div class="card-body">
						<h5 class="card-title">Olet kirjautunut sisään.</h5>
						<p class="card-text">Et kykene siirtymään tälle sivulle tai tilitietoihin ilman kirjautumista.</p>
					</div>
				</div>
				<br>
				<div id="app"></div>
				<script src="js/app.js"></script>
				<script src="js/booking/read-booking.js"></script>
				<script src="js/booking/read-one-booking.js"></script>
				<script src="js/booking/create-booking.js"></script>
				<script src="js/booking/update-booking.js"></script>
				<script src="js/booking/delete-booking.js"></script>`;
			$('#content').html(html);
			showLoggedInMenu();
		})
		.fail(function(result)  {
			showLoginPage();
			$('#response').html("<div class='alert alert-danger'>Kirjaudu ensin sisään...</div>");
		});
	}
	//getCookie()
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	//showLOggedInMenu()
	function showLoggedInMenu() {
		$("#login, #sign_up").hide();
		$("#logout").show();
	}
	//showUpdateAccountForm()
	function showUpdateAccountForm() {
		var jwt = getCookie('jwt');
		$.post("http://topiniskala.com/~topi/kuntosali/api/user/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
			var html = `
				<h2>Päivitä tili</h2>
				<form id='update_account_form'>
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
					<button type="submit" class="btn btn-primary">Päivitä tili</button>
				</form>`;
			clearResponse();
			$('#content').html(html);
		})
		.fail(function(result) {
			showLoginPage();
			$('#response').html("<div class='alert alert-danger'>Kirjaudu ensin sisään...</div>");
		});
	}
	//serializeObject()
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
});
