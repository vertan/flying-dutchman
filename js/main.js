function insertSelf(e) {
	console.log(e);
	pinField.value += e.target.innerHTML;
}
function backspace(e) {
	pinField.value = pinField.value.substr(0, pinField.value.length - 1);
}

function init() {
	var pinField = document.getElementById("pinField");
	var pinButtons = document.getElementsByClassName("pin-digit");
	console.log(pinButtons, pinButtons.length);
	for (var el of pinButtons) {
		el.addEventListener("click", insertSelf, false);
	}
	document.getElementById("eraseButton").addEventListener("click", backspace, false);
}

window.addEventListener("load", init, false);

