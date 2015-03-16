function login(e) {
	e.preventDefault();
	if (document.getElementById("clear").checked) {
		sessionStorage.clear();
	}
	var es = document.getElementsByClassName("saved-field");
	for (var i = 0; i < es.length; i++) {
		sessionStorage.setItem(es[i].id, es[i].value);
	}
	location.assign(document.getElementById("page").value);
}

function init() {
	document.getElementById("loginForm").addEventListener("submit", login, false);
}

window.addEventListener("DOMContentLoaded", init, false);

