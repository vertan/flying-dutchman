// The associated login page is obsolete. Use login-username.html instead.

var pinField;
var pinButtons;

sessionStorage.clear();

function login(e) {
	e.preventDefault();
	var pin = document.getElementById("pinField").value;
	sessionStorage.setItem("username", pin);
	sessionStorage.setItem("password", pin);
	location.assign("main.html");
}

// Inserts the digit (or whatever) on the tapped button into the PIN field
function insertSelf(e) {
	console.log(e);
	pinField.value += e.target.innerHTML;
}
function backspace(e) {
	pinField.value = pinField.value.substr(0, pinField.value.length - 1);
}

function init() {
	pinField = document.getElementById("pinField");
	pinButtons = document.getElementsByClassName("pin-digit");
	console.log(pinButtons, pinButtons.length);
	for (var i = 0; i < pinButtons.length; i++) {
		pinButtons[i].addEventListener("click", insertSelf, false);
	}
	document.getElementById("eraseButton").addEventListener("click", backspace, false);
	document.getElementById("sideArea").addEventListener("submit", login, false);
}

window.addEventListener("DOMContentLoaded", init, false);

