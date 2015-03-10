var username = sessionStorage.getItem("username");
var password = sessionStorage.getItem("password");
var db = new Database(username, password);

var usernameEdited = false;

function creditAdded(response) {
	if (response.type == "empty") {	// Empty response signals success
		history.back();
	} else if (response.type == "error") {
		alert("Failed to add credit:\n" + response.payload[0].msg);
	}
}
function userLoggedIn(response) {
	if (response.type == "iou_get") {
		db.request(
			"payments_append" +
				"&user_id=" + encodeURIComponent(response.payload[0].user_id) +
				"&amount="  + encodeURIComponent(document.getElementById("credit-add-amount").value),
			creditAdded);	// Add the credit
	} else if (response.type == "error") {
		alert("Failed to get user information:\n" + response.payload[0].msg);
	}
}
// Called when server has replied to the user_edit request
function userAdded(response) {
	if (response.type != "error") {	// type is "User ___ updated" on success
		var newUserDb = new Database(
			document.getElementById("user-name-field" ).value,
			document.getElementById("password-field-1").value);
		newUserDb.request("iou_get", userLoggedIn);	// Get the new user's ID
	} else if (response.type == "error") {
		alert("Failed to edit user:\n" + response.payload[0].msg);
	}
}
function updateUser(e) {
	e.preventDefault();
	if (document.getElementById("password-field-1").value != document.getElementById("password-field-2").value) {
		alert("Passwords do not match");
		return;
	}
	db.request(
		"user_edit" +
			"&new_username=" + encodeURIComponent(document.getElementById("user-name-field" ).value) +
			"&new_password=" + encodeURIComponent(document.getElementById("password-field-1").value) +
			"&first_name="   + encodeURIComponent(document.getElementById("first-name-field").value) +
			"&last_name="    + encodeURIComponent(document.getElementById("last-name-field" ).value) +
			"&email="        + encodeURIComponent(document.getElementById("email-field"     ).value) +
			"&phone="        + encodeURIComponent(document.getElementById("tel-field"       ).value),
		userAdded);
}

function autoFillUsername() {
	if (!usernameEdited) {
		document.getElementById("user-name-field").value =
			document.getElementById("first-name-field").value.substr(0, 3).toLowerCase() +
			document.getElementById("last-name-field" ).value.substr(0, 3).toLowerCase();
	}
}

function usernameEdit() {
	usernameEdited = document.getElementById("user-name-field").value.length > 0;
}

function initEditUser() {
	document.getElementById("user-details-form").addEventListener("submit", updateUser,       false);
	document.getElementById("first-name-field" ).addEventListener("input",  autoFillUsername, false);
	document.getElementById("last-name-field"  ).addEventListener("input",  autoFillUsername, false);
	document.getElementById("user-name-field"  ).addEventListener("change", usernameEdit,     false);
}

window.addEventListener("load", initEditUser, false);
