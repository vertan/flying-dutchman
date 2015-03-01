var db;
var userListElement;

function userList(response) {
	if (response.type == "iou_get_all") {
		var list = document.getElementById("List");
		for(var i=0; i<response.payload.length; i++) {
			var username = response.payload[i].username;
			var option = document.createElement("option");
			option.innerHTML = username;
			list.appendChild(option);
		}
			
	} else if (response.type == "error") {
		var errorMsg = response.payload[0].msg;
		alert("Error:\n" + errorMsg);
		location.reload();
	}
}

function init() {
	userListElement = document.getElementById("List");
	var username = sessionStorage.getItem("username");
	var password = sessionStorage.getItem("password");
	db = new Database(username, password);
	db.request("iou_get_all", userList);
	alert(username);
}

window.addEventListener("load", init, false);