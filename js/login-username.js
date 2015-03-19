var usernameField;
var passwordField;
var adminLoginButton;

var nextPage;

var db;

// Clear any old login information or prefrences
sessionStorage.clear();

// Called when server replies to iou_get request
function login(response) {
	if (response.type == "iou_get") {
		sessionStorage.setItem("userID",    response.payload[0].user_id);
		sessionStorage.setItem("firstName", response.payload[0].first_name);
		sessionStorage.setItem("lastName",  response.payload[0].last_name);
		sessionStorage.setItem("credit",  response.payload[0].assets);
		sessionStorage.setItem("lang", "en");
		location.assign(nextPage);
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
	db.request("iou_get", login);	// Get user information
}

function initAdminLogin(e) {
	nextPage = "admin.html";
	initLogin(e);
}

function initUserLogin(e) {
	nextPage = "main.html";
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

