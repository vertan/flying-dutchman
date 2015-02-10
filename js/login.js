sessionStorage.clear();

function login(e) {
	e.preventDefault();
	var pin = document.getElementById("pinField").value;
	sessionStorage.setItem("username", pin);
	sessionStorage.setItem("password", pin);
	location.assign("main.html");
}

function initLogin() {
	document.getElementById("sideArea").addEventListener("submit", login, false);
}

window.addEventListener("load", initLogin, false);

