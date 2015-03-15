var beersPicked = [];

$(function() {
	$('#cart').droppable({
		tolerance: 'pointer',
		drop: function(event, ui) {
			var name = ui.helper[0].getElementsByClassName("name")[0].innerHTML;
			var newElement = document.createElement("div");
			newElement.innerHTML = name;
			document.getElementById("cart").appendChild(newElement);
			var ID = ui.helper[0].dataset.beerid;
			newElement.id = "incart" + ID;
			beersPicked.push(ID);
			console.log(beersPicked);
		}
	});
	$('#favorites button').draggable({
		cancel: false,
		helper: "clone",
		revert: true,
		drag: function(event, ui) {
			$(ui.helper).addClass("nicer");
		}
	});
});

function undo() {
	var removeID = "incart" + beersPicked[beersPicked.length-1];
	console.log(document.getElementById(removeID));
	console.log(document.getElementById("cart"));
	document.getElementById("cart").removeChild(document.getElementById(removeID));
	beersPicked.length--;
}

$(document).scroll(function() {
	if($(document).scrollTop() >= 20) {
		$('#main-header').css('background', 'rgba(0, 0, 0, 0.9)');
	} else {
		$('#main-header').css('background', 'rgba(0, 0, 0, 0.45)');
	}
});