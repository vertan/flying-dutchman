var db;
var userListElement;

function manageUser(e) {
	var managedUser = document.getElementById("user-list").selectedOptions[0].value;
	sessionStorage.setItem("managedUser", managedUser);
}

// This function shows the list of users.
function userList(response) {
	if (response.type == "iou_get_all") {
		document.getElementById("user-select").addEventListener("submit", manageUser, false);
		document.getElementById("manage-button").disabled = false;
		var list = document.getElementById("user-list");
		var users = response.payload;
		users.sort(function(a, b) { // The user names get sorted alphabetically.
			var nameA = a.first_name + " " + a.last_name + " " + a.username;
			var nameB = b.first_name + " " + b.last_name + " " + b.username;
			if (nameA < nameB) return -1;
			if (nameA > nameB) return  1;
			else               return  0;
		});
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			var option = document.createElement("option");
			option.value = user.username;
			option.innerHTML =
				"<span class='first-name'>" + user.first_name +  "</span> " +
				"<span class='last-name'>"  + user.last_name  +  "</span> " +
				"<span class='user-name'>(" + user.username   + ")</span>";
			list.appendChild(option);
		}
		console.log(users);
	} else if (response.type == "error") {
		var errorMsg = response.payload[0].msg;
		alert("Error:\n" + errorMsg);
		location.assign("index.html");
	}
}

// The user list is retrieved from the database.
function init() {
	userListElement = document.getElementById("List");
	var username = sessionStorage.getItem("username");
	var password = sessionStorage.getItem("password");
	db = new Database(username, password);
	db.request("iou_get_all", userList);
}

window.addEventListener("load", init, false);
