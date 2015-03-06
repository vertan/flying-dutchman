var username = sessionStorage.getItem("username");
var password = sessionStorage.getItem("password");
var db = new Database(username, password);

var managedUser = sessionStorage.getItem("managedUser");

function fillUserData(response) {
	var users = response.payload;
	for (var i = 0; i < users.length; i++) {
		var user = users[i];
		if (user.username == managedUser) {
			document.getElementById("user-header").innerHTML =
				S("edit-user-header", user.first_name, user.last_name, user.username);
			document.getElementById("first-name-field"     ).value = user.first_name;
			document.getElementById("last-name-field"      ).value = user.last_name;
			document.getElementById("current-credit-amount").value = user.assets;
			document.getElementById("new-credit-amount"    ).value = user.assets;
			document.getElementById("new-credit-amount"    ).min   = user.assets;
			break;
		}
	}
}

function updateNewCredit() {
	document.getElementById("new-credit-amount").value =
		document.getElementById("current-credit-amount").value - 0 + (
		document.getElementById("credit-add-amount").value - 0);
	// The zeros are subtracted to force String -> Number type casting.
}

function updateCreditToAdd() {
	document.getElementById("credit-add-amount").value =
		document.getElementById("new-credit-amount").value -
		document.getElementById("current-credit-amount").value
}

function userUpdated(response) {
	if (response.type == "edit_user") {
		location.reload(true);
	} else if (response.type == "error") {
		alert("Failed to edit user:\n" + response.payload[0].msg);
	}
}

function updateUser(e) {
	e.preventDefault();
	if (document.getElementById("password-field-1").value != document.getElementById("password-field-2").value) {
		alert("Passwords do not match");
		return
	}
	db.request(
		"user_edit" +
			"&new_username=" + encodeURIComponent(managedUser) +
			"&new_password=" + encodeURIComponent(document.getElementById("password-field-1").value) +
			"&first_name="   + encodeURIComponent(document.getElementById("first-name-field").value) +
			"&last_name="    + encodeURIComponent(document.getElementById("last-name-field" ).value) +
			"&email="        + encodeURIComponent(document.getElementById("email-field"     ).value) +
			"&phone="        + encodeURIComponent(document.getElementById("tel-field"       ).value),
		userUpdated);
}

function addCredit(e) {
	e.preventDefault();
	alert("tbi.");
}

function initEditUser() {
	db.request("iou_get_all", fillUserData);
	
	document.getElementById("user-details-form").addEventListener("submit", updateUser,       false);
	document.getElementById("add-credit-form"  ).addEventListener("submit", addCredit,        false);
	
	document.getElementById("credit-add-amount").addEventListener("input", updateNewCredit,   false);
	document.getElementById("new-credit-amount").addEventListener("input", updateCreditToAdd, false);
}

window.addEventListener("load", initEditUser, false);
