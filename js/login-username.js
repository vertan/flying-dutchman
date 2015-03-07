var usernameField;
var passwordField;
var adminLoginButton;

var isAdmin;

var db;

sessionStorage.clear();

function login(response) {
	if (response.type == "iou_get") {
		sessionStorage.setItem("userID",    response.payload[0].user_id);
		sessionStorage.setItem("firstName", response.payload[0].first_name);
		sessionStorage.setItem("lastName",  response.payload[0].last_name);
		sessionStorage.setItem("credit",  response.payload[0].assets);
		sessionStorage.setItem("lang", "en");
		location.assign(isAdmin ? "admin-menu.html" : "main.html");
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

function initAdminLogin(e) {
	isAdmin = true;
	initLogin(e);
}

function initUserLogin(e) {
	isAdmin = false;
	initLogin(e);
}

function init() {
	usernameField = document.getElementById("username");
	passwordField = document.getElementById("password");
	adminLoginButton = document.getElementById("adminLoginButton");
	document.getElementById("loginForm").addEventListener("submit", initUserLogin, false);
	document.getElementById("adminLoginButton").addEventListener("click", initAdminLogin, false);
}

window.addEventListener("DOMContentLoaded", init, false);

