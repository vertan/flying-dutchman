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

// Returns the index in the cart array where the entry with the given id is located, or -1 if it's not in the cart
function itemIndexOf(id) {
	for (var i = 0; i < cart.length; i++) {
		if (cart[i].id == id) {
			return i;
		}
	}
	return -1;
}

// Adds a new item or increments the quantity of an existing item in the cart
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
	document.getElementById("redo-button").disabled = true;
	redoStack = [];
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

// Updates the quantity of an entry that is already in the cart
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

// Increments or decrements the quantity of an an item that is already in the cart, and removes it if the quantity reaches zero
function changeQuantity(id, delta) {
	var quantity = getQuantity(id) + delta;
	if (quantity > 0) {
		setQuantity(id,  quantity);
	} else {
		removeItem(id);
	}
}

function pushUndo() {
	document.getElementById("redo-button").disabled = true;
	redoStack = [];
	undoStack.push(deepCopy(cart));
	document.getElementById("undo-button").disabled = false;
}

function undo() {
	if (undoStack.length == 0) {
		console.error("Undo stack empty");
		return false;
	}
	redoStack.push(deepCopy(cart));
	cart = undoStack.pop();
	if (undoStack.length == 0) {
		document.getElementById("undo-button").disabled = true;
	}
	document.getElementById("redo-button").disabled = false;
	updateCart();
}

function redo() {
	if (redoStack.length == 0) {
		console.error("Redo stack empty");
		return false;
	}
	undoStack.push(deepCopy(cart));
	cart = redoStack.pop();
	document.getElementById("undo-button").disabled = false;
	if (redoStack.length == 0) {
		document.getElementById("redo-button").disabled = true;
	}
	updateCart();
}

// Saves the state of the cart, then constructs the HTML for it and replaces the old cart on the page
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

function startDrag(e) {
	var id    = e.target.dataset.beerid;
	var name  = e.target.getElementsByClassName("name")[0].innerHTML;
	var price = e.target.getElementsByClassName("price")[0].innerHTML.split(" ")[0] - 0;
	e.dataTransfer.setData("application/x-beer-id",    id);
	e.dataTransfer.setData("application/x-beer-name",  name);
	e.dataTransfer.setData("application/x-beer-price", price);
	e.dataTransfer.setData("text/plain", id + " " + name + " (" + price + " SEK)");
	e.dataTransfer.effectAllowed = "copy";
}

function checkDroppable(e) {
	for (var i = 0; i < e.dataTransfer.types.length; i++) {
		if (e.dataTransfer.types[i] == "application/x-beer-id") {
			e.preventDefault();
			e.dataTransfer.effectAllowed = "copy";
			return;
		}
	}
}

function drop(e) {
	e.preventDefault();
	var id    = e.dataTransfer.getData("application/x-beer-id") - 0;
	var name  = e.dataTransfer.getData("application/x-beer-name");
	var price = e.dataTransfer.getData("application/x-beer-price") - 0;
	addItem(id, name, price, 1);
}

function initCart() {
	cart      = sessionStorage.getItem("cart");
	cart      = cart      ? JSON.parse(cart)      : [];
	undoStack = sessionStorage.getItem("undo");
	undoStack = undoStack ? JSON.parse(undoStack) : [];
	redoStack = sessionStorage.getItem("redo");
	redoStack = redoStack ? JSON.parse(redoStack) : [];
	document.getElementById("undo-button").addEventListener("click", undo,      false);
	document.getElementById("redo-button").addEventListener("click", redo,      false);
	document.getElementById("cancel"     ).addEventListener("click", clearCart, false);
	document.getElementById("undo-button").disabled = (undoStack.length == 0);
	document.getElementById("redo-button").disabled = (redoStack.length == 0);
	updateCart();

	var buttons = document.getElementById("favorites").getElementsByClassName("fav-beer");
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.draggable = true;
		button.addEventListener("dragstart", startDrag, false);
	}
	document.getElementById("cart-container").addEventListener("dragenter", checkDroppable, false);
	document.getElementById("cart-container").addEventListener("dragover",  checkDroppable, false);
	document.getElementById("cart-container").addEventListener("drop",      drop,           false);
}

document.addEventListener("DOMContentLoaded", initCart, false);
