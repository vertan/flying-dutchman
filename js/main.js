var pinField;
var pinButtons;

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
}

window.addEventListener("load", init, false);

