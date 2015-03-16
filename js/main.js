var beersPicked = [];
var redo = [];

$(function() {
	$('#table_order').droppable({
		tolerance: 'pointer',
		drop: function(event, ui) {
			var name = ui.helper[0].getElementsByClassName("name")[0].innerHTML;
			var ID = ui.helper[0].dataset.beerid;
			beersPicked.push(ID);
			console.log(beersPicked);
			document.getElementById("nav-undo").disabled = false;
			document.getElementById("nav-redo").disabled = true;
			redo = [];
			updateCart();
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
	redo.push(thisID);
	if (beersPicked.length == 0) {
		document.getElementById("nav-undo").disabled = true;
	}
	document.getElementById("nav-redo").disabled = false;
	updateCart();
}

function redo() {
	var thisID = redo.pop();
	var name = document.getElementById("fav" + thisID).getElementsByClassName("name")[0].innerHTML;
	beersPicked.push(thisID);
	document.getElementById("nav-undo").disabled = false;
	if (redo.length == 0) {
		document.getElementById("nav-redo").disabled = true;
	}
	updateCart();
}

function changeContent(delta, id) {
	if (delta < 0) {
		for (var i = beersPicked.length - 1; i >= 0; i--) {
			if (beersPicked[i] == id) {
				beersPicked.splice(i, 1);
				delta++;
				if (delta >= 0) {
					break;
				}
			}
		}
	} else if (delta > 0) {
		while (delta > 0) {
			beersPicked.push(id);
			delta--;
		}
	}
	updateCart();
}

function updateCart() {
	var cart = document.getElementById("cart-body");
	var items = [];
	var sum = 0;
	sessionStorage.setItem("cart", JSON.stringify(beersPicked));
	sessionStorage.setItem("redo", JSON.stringify(redo));
	for (var i = 0; i < beersPicked.length; i++) {
		var found = false;
		for (var j = 0; j < items.length; j++) {
			if (items[j].id == beersPicked[i]) {
				items[j].count++;
				found = true;
				break;
			}
		}
		if (!found) {
			items.push({
				id:    beersPicked[i],
				name:  "Beer #" + beersPicked[i],
				price: 25,
				count: 1
			});
		}
	}
	while (cart.hasChildNodes()) {
		cart.removeChild(cart.firstChild);
	}
	for (var k = 0; k < items.length; k++) {
		var row = document.createElement("tr");
		row.innerHTML =
			"<th class='beer-name'>" + items[k].name + "</td>" +
			"<td class='dec'><button type='button' onclick='changeContent(-1, " + items[k].id + ")'>&minus;</button></td>" +
			"<td class='count'>" + items[k].count + "</td>" +
			"<td class='inc'><button type='button' onclick='changeContent(1, " + items[k].id + ")'>+</button></td>" +
			"<td class='count'>" + items[k].count * items[k].price + " SEK</td>" +
			"<td class='del'><button type='button' onclick='changeContent(-Infinity, " + items[k].id + ")'>&#10799;</button></td>";
		cart.appendChild(row);
		sum += items[k].count * items[k].price
	}
	document.getElementById("cart-sum").innerHTML = sum + "&nbsp;SEK";
}

$(document).scroll(function() {
	if($(document).scrollTop() >= 20) {
		$('#main-header').css('background', 'rgba(0, 0, 0, 0.9)');
	} else {
		$('#main-header').css('background', 'rgba(0, 0, 0, 0.45)');
	}
});

function initCart() {
	beersPicked = sessionStorage.getItem("cart");
	if (beersPicked != null) {
		beersPicked = JSON.parse(beersPicked);
	} else {
		beersPicked = [];
	}
	redo = sessionStorage.getItem("redo");
	if (redo != null) {
		redo = JSON.parse(redo);
	} else {
		redo = [];
	}
	updateCart();
}

document.addEventListener("DOMContentLoaded", initCart, false);
