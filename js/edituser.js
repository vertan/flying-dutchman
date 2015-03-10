var username = sessionStorage.getItem("username");
var password = sessionStorage.getItem("password");
var db = new Database(username, password);

// Check which user we are editing
var managedUser = sessionStorage.getItem("managedUser");

// Used to store the ID for the timer, in case we need to abort it
var creditAddedAnimationInterval;

// Checks an iou_get_all request and fills in the data about the user being edited
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
			document.getElementById("credit-add-amount"    ).value = 0;
			document.getElementById("new-credit-amount"    ).min   = user.assets;
			break;
		}
	}
}

// This and the following function are triggered when the "Credit to
// add" or "New credit" fields are changed, and keeps them in sync
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

// Called when server has replied to the user_edit request
function userUpdated(response) {
	if (response.type != "error") {	// type is "User ___ updated" on success
		location.reload(true);
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
			"&new_username=" + encodeURIComponent(managedUser) +
			"&new_password=" + encodeURIComponent(document.getElementById("password-field-1").value) +
			"&first_name="   + encodeURIComponent(document.getElementById("first-name-field").value) +
			"&last_name="    + encodeURIComponent(document.getElementById("last-name-field" ).value) +
			"&email="        + encodeURIComponent(document.getElementById("email-field"     ).value) +
			"&phone="        + encodeURIComponent(document.getElementById("tel-field"       ).value),
		userUpdated);
}

// Gradually transfers money from the "Credit to add" field to the "Current credit" field
function creditAddedAnimation(startTime, addAmount, newCredit) {
	// startTime:   The time when the animation started
	// addAmount:   How much credit was added
	// newCredit:   What the new credit should be
	// addedAmount: How much credit that has currently been moved to the "Current credit" field
	var now = new Date();
	var addedAmount = Math.ceil(addAmount * (now - startTime) / 333);
	if (addedAmount >= addAmount) {
		clearInterval(creditAddedAnimationInterval);
		addedAmount = addAmount;
		db.request("iou_get_all", fillUserData);	// Refresh in case something has been updated behind our backs or something went wrong
	}
	document.getElementById("current-credit-amount").value = newCredit - (addAmount - addedAmount);
	document.getElementById("credit-add-amount"    ).value = addAmount - addedAmount;
	updateNewCredit();
}

// Try to figgure out the user ID by looking in the purchases log
function enterUserID(response) {
	var users = response.payload;
	for (var i = 0; i < users.length; i++) {
		var user = users[i];
		if (user.username == managedUser) {
			// User ID has been found so enter it and lock the edit field, since we're certain that it's correct
			document.getElementById("user-id").value    = user.user_id;
			document.getElementById("user-id").readOnly = true;
			break;
		}
	}
}

// Called when server has responded to a payments_append request
function creditAdded(response) {
	if (response.type == "empty") {	// Empty response signals success
		clearInterval(creditAddedAnimationInterval);
		var addAmount = document.getElementById("credit-add-amount").value;
		var newCredit = document.getElementById("new-credit-amount").value;
		creditAddedAnimationInterval = setInterval(creditAddedAnimation, 20, new Date(), addAmount, newCredit);
	} else if (response.type == "error") {
		alert("Failed to add credit:\n" + response.payload[0].msg);
	}
}
function addCredit(e) {
	e.preventDefault();
	db.request(
		"payments_append" +
			"&user_id=" + encodeURIComponent(document.getElementById("user-id"          ).value) +
			"&amount="  + encodeURIComponent(document.getElementById("credit-add-amount").value),
		creditAdded);
}

function initEditUser() {
	db.request("iou_get_all",       fillUserData);
	db.request("purchases_get_all", enterUserID);	// To figgure out user ID
	
	document.getElementById("user-details-form").addEventListener("submit", updateUser,       false);
	document.getElementById("add-credit-form"  ).addEventListener("submit", addCredit,        false);
	
	document.getElementById("credit-add-amount").addEventListener("input", updateNewCredit,   false);
	document.getElementById("new-credit-amount").addEventListener("input", updateCreditToAdd, false);
}

window.addEventListener("load", initEditUser, false);
