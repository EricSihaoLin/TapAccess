//Socket IO Code

var socket = io.connect('http://localhost:3000');
socket.on('connect', function() {
	console.log('Listening to socket');
});
		
socket.on('accept', function(data) {
	var now = moment().format('MMM Do YY h:mm:ss a');
	$('<tr><td>' + now + '</td><td>Accepted</td><td>' + data.name + '</td><td>' + data.netid + '</td><td>' + data.notes + '</td></tr>')
		.hide()
		.prependTo('table tbody')
		.fadeIn("slow")
		.addClass("success");
	var table = document.getElementById("data");
	if(table.childElementCount > 15){
		table.removeChild(table.lastChild);
	}
});
		
socket.on('deny', function(data) {
	var now = moment().format('MMM Do YY h:mm:ss a');
	$('<tr><td>' + now + '</td><td>Denied</td><td>' + data.name + '</td><td>' + data.netid + '</td><td>' + data.notes + '</td></tr>')
		.hide()
		.prependTo('table tbody')
		.fadeIn("slow")
		.addClass("danger");
	var table = document.getElementById("data");
	if(table.childElementCount > 15){
		table.removeChild(table.lastChild);
	}
});
		
$('#rfidform').submit(function(event){
	var formdata = $('#rfid').val();
	socket.emit('rfid', formdata);
	$('#rfid').val('');
	return false;
});
