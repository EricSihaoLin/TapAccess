//Socket IO Code

var socket = io.connect('http://localhost:3000');
socket.on('connect', function() {
	console.log('Listening to socket');
});
		
socket.on('accept', function(data) {
	var now = moment().format('MMM Do YY h:mm:ss a');
	$('<tr><td>' + now + '</td><td>' + data.name + '</td><td>' + data.netid + '</td><td>' + data.station + '</td><td>' + data.notes + '</td></tr>')
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
	$('<tr><td>' + now + '</td><td>' + data.name + '</td><td>' + data.netid + '</td><td>' + data.station + '</td><td>' + data.notes + '</td></tr>')
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
	var formdata = { rfid:$('#rfid').val(), station:"Manual"};
	socket.emit('rfid', formdata);
	$('#rfid').val('');
	return false;
});

//Update status
function update() {
	if(!socket.connected || $('#connstatus').hasClass("connFailed") || $('#connstatus').hasClass("connWaiting")){
		$('#connstatus').html("Connecting...").removeClass().addClass("connWaiting");
		setTimeout(function()
		{
			if(socket.connected) {
				$('#connstatus').html("Socket Connected").removeClass().addClass("connSuccess");
				$('#rfid').prop("disabled", false);
				$('#rfidsubmit').prop("disabled", false);
			}
			else {
				$('#connstatus').html("No Connection").removeClass().addClass("connFailed");
				$('#rfid').prop("disabled", true);
				$('#rfidsubmit').prop("disabled", true);
			}
		}, 2000);
	}
}
update();
$('#rfid').prop("disabled", true);
$('#rfidsubmit').prop("disabled", true);
setInterval(update, 5000);
