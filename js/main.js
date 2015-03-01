function init() {
	var firstName = sessionStorage.getItem("firstName");
	var lastName  = sessionStorage.getItem("lastName");
	var credit    = sessionStorage.getItem("credit");
	document.getElementById("user").innerHTML   = S("user-full-name", firstName, lastName);
	document.getElementById("credit").innerHTML = S("credit", credit + " kr");
}

window.addEventListener("load", init, false);
