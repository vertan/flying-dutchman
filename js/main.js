function init() {
	var firstName = sessionStorage.getItem("firstName");
	var lastName  = sessionStorage.getItem("lastName");
	var credit    = sessionStorage.getItem("credit");
	document.getElementById("user").innerHTML   = S("user-full-name", firstName, lastName);
	document.getElementById("credit").innerHTML = S("credit", credit + " kr");
}

$(function() {
	$('#cart').droppable({
		tolerance: 'pointer',
		drag: function(event, ui) {
			
		}
	});
	$('#favorites button').draggable({
		cancel: false,
		helper: "clone",
		revert: true,
		drag: function(event, ui) {
			console.log(event);
			console.log(ui);
			$(ui.helper).addClass("nicer");
		}
	});
});

window.addEventListener("DOMContentLoaded", init, false);
