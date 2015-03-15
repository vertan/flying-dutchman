var beersPicked = [];
var redo = [];

$(function() {
	$('#table_order').droppable({
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
			getElementById("nav-undo").disabled = false;
			getElementById("nav-redo").disabled = true;
			redo = [];
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
	var thisID = beersPicked.pop();
	var removeID = "incart" + thisID;
	console.log(document.getElementById(removeID));
	console.log(document.getElementById("cart"));
	document.getElementById("cart").removeChild(document.getElementById(removeID));
	redo.push(thisID);
	if (beersPicked.length == 0) {
		getElementById("nav-undo").disabled = true;
	}
	getElementById("nav-redo").disabled = false;
}

function redo() {
	var thisID = redo.pop();
	var name = document.getElementById("fav" + thisID).getElementsByClassName("name")[0].innerHTML;
	var newElement = document.createElement("div");
	newElement.innerHTML = name;
	document.getElementById("cart").appendChild(newElement);
	newElement.id = "incart" + thisID;
	beersPicked.push(thisID);
	getElementById("nav-undo").disabled = false;
	if (redo.length == 0) {
		getElementById("nav-redo").disabled = true;
	}
}

$(document).scroll(function() {
	if($(document).scrollTop() >= 20) {
		$('#main-header').css('background', 'rgba(0, 0, 0, 0.9)');
	} else {
		$('#main-header').css('background', 'rgba(0, 0, 0, 0.45)');
	}
});
