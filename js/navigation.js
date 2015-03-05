function getUserData() {
	var firstName = sessionStorage.getItem("firstName");
	var lastName  = sessionStorage.getItem("lastName");
	var credit    = sessionStorage.getItem("credit");
	var userField   = document.getElementById("user");
	var creditField = document.getElementById("credit");
	if (userField) {
		userField.innerHTML   = S("user-full-name", firstName, lastName);
	}
	if (creditField) {
		creditField.innerHTML = S("credit", credit + " kr");
	}
}

window.addEventListener("DOMContentLoaded", getUserData, false);
