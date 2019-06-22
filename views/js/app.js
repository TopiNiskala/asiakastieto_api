$(document).ready(function() {
	var app_html = `
		<div class='container'>
			<div class='page-header'>
				<h1 id='page-title'>Kalenteri</h1>
			</div>
			<div id ='page-content'>
			</div>
		</div>`;
	$("#app").html(app_html);
});

//Change page title
function changePageTitle(page_title) {
	$('#page-title').text(page_title);
	document.title=page_title;
}

//Make form values to JSON
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name] !== undefined) {
				o[this.name] = [0[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
