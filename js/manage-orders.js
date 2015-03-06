function listInventory(result) {
	result.payload.sort(function(a, b) {
		if (a.count-0 < b.count-0) return -1;
		if (a.count-0 > b.count-0) return  1;
		else                   return  0;
		});
	for (var i = 0; i < result.payload.length; i++) {
		var row = document.createElement("tr");
		if (result.payload[i].count < 30) {
			row.innerHTML =
				"<td>" + result.payload[i].beer_id   + "</td>" +
				"<td>" + result.payload[i].namn      + "</td>" +
				"<td>" + result.payload[i].namn2     + "</td>" +
				"<td>" + result.payload[i].sbl_price + "</td>" +
				"<td>" + result.payload[i].pub_price + "</td>" +
				"<td>" + result.payload[i].price     + "</td>" +
				"<td>" + result.payload[i].count     + "</td>";
		}	
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