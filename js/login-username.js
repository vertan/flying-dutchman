var usernameField;
var passwordField;

var db;

sessionStorage.clear();

function login(response) {
	if (response.type == "iou_get") {
		sessionStorage.setItem("userID",    response.payload[0].user_id);
		sessionStorage.setItem("firstName", response.payload[0].first_name);
		sessionStorage.setItem("lastName",  response.payload[0].last_name);
		alert("Welcome " + response.payload[0].first_name + " " + response.payload[0].last_name + ".");
		location.assign("main.html");
	} else if (response.type == "error") {
		var errorMsg = response.payload[0].msg;
		alert("Error:\n" + errorMsg);
		location.reload();
	}
}

function initLogin(e) {
	e.preventDefault();
	var username = usernameField.value;
	var password = passwordField.value;
	sessionStorage.setItem("username", username);
	sessionStorage.setItem("password", password);
	db = new Database(username, password);
	db.request("iou_get", login);
}

function init() {
	usernameField = document.getElementById("username");
	passwordField = document.getElementById("password");
	document.getElementById("loginForm").addEventListener("submit", initLogin, false);
}

window.addEventListener("load", init, false);

