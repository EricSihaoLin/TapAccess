//Side panel collapsible code
$(document).ready(function() {
	$('[data-toggle=offcanvas]').click(function() {
		$('.row-offcanvas').toggleClass('active');
    });
});

//Clock update code
function update() {
	$('#date').html(moment().format('MMM Do YY'));
	$('#clock').html(moment().format('h:mm:ss a'));
}
setInterval(update, 1000);
