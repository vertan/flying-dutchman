var undoStack = [];
var redoStack = [];
var cart = [];

// http://stackoverflow.com/a/25921504
function deepCopy(o) {
	var out = Array.isArray(o) ? [] : {};
	for (var key in o) {
		var v = o[key];
		out[key] = (typeof v === "object") ? deepCopy(v) : v;
	}
	return out;
}

function itemIndexOf(id) {
	for (var i = 0; i < cart.length; i++) {
		if (cart[i].id == id) {
			return i;
		}
	}
	return -1;
}

function addItem(id, name, price, quantity = 1) {
	if (itemIndexOf(id) == -1) {
		pushUndo();
		cart.push({
			id: id,
			name: name,
			price: price,
			quantity: quantity
		});
		updateCart();
	} else {
		changeQuantity(id, quantity);
	}
}

function removeItem(id) {
	var i = itemIndexOf(id);
	if (i == -1) {
		return 0;
	} else {
		pushUndo();
		var deleted = cart.splice(i, 1);
		updateCart();
		return deleted[0].quantity;
	}
}

function clearCart() {
	pushUndo();
	cart = [];
	updateCart();
}

function getQuantity(id) {
	var i = itemIndexOf(id);
	if (i == -1) {
		return 0;
	} else {
		return cart[i].quantity;
	}
}

function setQuantity(id, newQuantity) {
	var i = itemIndexOf(id);
	if (i == -1) {
		console.warn("id " + id + " not in cart");
		return false;
	} else {
		pushUndo();
		cart[i].quantity = newQuantity;
		updateCart();
		return true;
	}
}

function changeQuantity(id, delta) {
	var quantity = getQuantity(id) + delta;
	if (quantity > 0) {
		setQuantity(id,  quantity);
	} else {
		removeItem(id);
	}
}

function pushUndo() {
	document.getElementById("nav-undo").disabled = true;
	redoStack = [];
	undoStack.push(deepCopy(cart));
	document.getElementById("nav-undo").disabled = false;
}

$(function() {
	$('#table_order').droppable({
		tolerance: 'pointer',
		drop: function(event, ui) {
			var name = ui.helper[0].getElementsByClassName("name")[0].innerHTML;
			var price = ui.helper[0].getElementsByClassName("price")[0].innerHTML.split(" ")[0] - 0;
			var ID = ui.helper[0].dataset.beerid;
			addItem(ID, name, price, 1);
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
	if (undoStack.length == 0) {
		console.error("Undo stack empty");
		return false;
	}
	redoStack.push(deepCopy(cart));
	cart = undoStack.pop();
	if (undoStack.length == 0) {
		document.getElementById("nav-undo").disabled = true;
	}
	document.getElementById("nav-redo").disabled = false;
	updateCart();
}

function redo() {
	if (redoStack.length == 0) {
		console.error("Redo stack empty");
		return false;
	}
	undoStack.push(deepCopy(cart));
	cart = redoStack.pop();
	document.getElementById("nav-undo").disabled = false;
	if (redoStack.length == 0) {
		document.getElementById("nav-redo").disabled = true;
	}
	updateCart();
}

function updateCart() {
	var tbody = document.getElementById("cart-body");
	var sum = 0;
	sessionStorage.setItem("cart", JSON.stringify(cart));
	sessionStorage.setItem("undo", JSON.stringify(undoStack));
	sessionStorage.setItem("redo", JSON.stringify(redoStack));
	while (tbody.hasChildNodes()) {
		tbody.removeChild(tbody.firstChild);
	}
	for (var i = 0; i < cart.length; i++) {
		var row = document.createElement("tr");
		row.innerHTML =
			"<th class='beer-name'>" + cart[i].name + "</td>" +
			"<td class='dec'><button type='button' onclick='changeQuantity(" + cart[i].id + ", -1)'>&minus;</button></td>" +
			"<td class='count'>" + cart[i].quantity + "</td>" +
			"<td class='inc'><button type='button' onclick='changeQuantity(" + cart[i].id + ", 1)'>+</button></td>" +
			"<td class='count'>" + cart[i].quantity * cart[i].price + " SEK</td>" +
			"<td class='del'><button type='button' onclick='removeItem(" + cart[i].id + ")'>&#10799;</button></td>";
		tbody.appendChild(row);
		sum += cart[i].quantity * cart[i].price;
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
	cart      = sessionStorage.getItem("cart");
	cart      = cart      ? JSON.parse(cart)      : [];
	undoStack = sessionStorage.getItem("undo");
	undoStack = undoStack ? JSON.parse(undoStack) : [];
	redoStack = sessionStorage.getItem("redo");
	redoStack = redoStack ? JSON.parse(redoStack) : [];
	document.getElementById("nav-undo").addEventListener("click", undo,      false);
	document.getElementById("nav-redo").addEventListener("click", redo,      false);
	document.getElementById("cancel"  ).addEventListener("click", clearCart, false);
	document.getElementById("nav-undo").disabled = (undoStack.length == 0);
	document.getElementById("nav-redo").disabled = (redoStack.length == 0);
	updateCart();
}

document.addEventListener("DOMContentLoaded", initCart, false);
