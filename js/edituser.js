function fillUserData(response) {
	/*
	var mappings = {
		username: "",
		first_name: "first-name-field"
	*/
	var managedUser = sessionStorage.getItem("managedUser");
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

function initEditUser() {
	var username = sessionStorage.getItem("username");
	var password = sessionStorage.getItem("password");
	var db = new Database(username, password);
	db.request("iou_get_all", fillUserData);
	
	document.getElementById("credit-add-amount").addEventListener("input", updateNewCredit,   false);
	document.getElementById("new-credit-amount").addEventListener("input", updateCreditToAdd, false);
}

window.addEventListener("load", initEditUser, false);
