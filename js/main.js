var pinField = document.getElementById("pinField");

function insertSelf(e) {
	console.log(e);
	pinField.value += e.target.innerHTML;
}
function backspace(e) {
	pinField.value = pinField.value.substr(0, pinField.value.length - 1);
}

var pinButtons = document.getElementsByClassName("pin-digit");
console.log(pinButtons, pinButtons.length);
for (var el of pinButtons) {
	el.addEventListener("click", insertSelf, false);
}
document.getElementById("eraseButton").addEventListener("click", backspace, false);
