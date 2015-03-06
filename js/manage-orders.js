function listInventory(result) {
	for (var i = 0; i < result.payload.length; i++) {
		var row = document.createElement("tr");
		row.innerHTML =
			"<td>" + result.payload[i].beer_id   + "</td>" +
			"<td>" + result.payload[i].namn      + "</td>" +
			"<td>" + result.payload[i].namn2     + "</td>" +
			"<td>" + result.payload[i].sbl_price + "</td>" +
			"<td>" + result.payload[i].pub_price + "</td>" +
			"<td>" + result.payload[i].price     + "</td>" +
			"<td>" + result.payload[i].count     + "</td>";
		document.getElementById("manage-orders").appendChild(row);
	}
}

function initOrderList() {
	var username = sessionStorage.getItem("username");
	var password = sessionStorage.getItem("password");
	var db = new Database(username, password);
	db.request("inventory_get", listInventory);
}

document.addEventListener("DOMContentLoaded", initOrderList, false);
