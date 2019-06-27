//------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------
//showBookingList()

function showBookingList() {
	var jwt = getCookie('jwt');
	$.post("http://topiniskala.com/~topi/kuntosali/api/user/validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
		var html = `
			<div class='container'>
				<div class='page-header'>
					<h1 id='page-title'>Kalenteri</h1>
				</div>
				<div id ='page-content'></div>
			</div>`;
		$('#content').html(html);
		showLoggedInMenu();
		showBookings();
	}).fail(function(result) {
		showLoginPage();
		$('#response').html("<div class='alert alert-danger'>Kirjaudu ensin sisään...</div>");
	});
}

//------------------------------------------------------------------------------------------
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
			</div>`;
		$('#content').html(html);
		showLoggedInMenu();
	}).fail(function(result)  {
		showLoginPage();
		$('#response').html("<div class='alert alert-danger'>Kirjaudu ensin sisään...</div>");
	});
}

//------------------------------------------------------------------------------------------
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
	}).fail(function(result) {
		showLoginPage();
		$('#response').html("<div class='alert alert-danger'>Kirjaudu ensin sisään...</div>");
	});
}

//------------------------------------------------------------------------------------------
//changePageTitle()

function changePageTitle(page_title) {
	$('#page-title').text(page_title);
	document.title=page_title;
}

//------------------------------------------------------------------------------------------
//clearResponse()

function clearResponse() {
	$('#response').html('');
}

//------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------
//setCookie()

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//------------------------------------------------------------------------------------------
//showLOggedInMenu()

function showLoggedInMenu() {
        $("#login, #sign_up").hide();
        $("#logout, #update_account, #list_booking, #home").show();
}

//------------------------------------------------------------------------------------------
//showLoggedOutMenu()

function showLoggedOutMenu() {
	$("#login, #sign_up").show();
	$("#logout, #update_account, #list_booking, #home").hide();
}

//------------------------------------------------------------------------------------------
