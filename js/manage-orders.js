// This function sorts the count (how many beers are left in stock) and then lists them if the count is below 30 beers. 
function listInventory(result) {
	result.payload.sort(function(a, b) {
		if (a.count-0 < b.count-0) return -1;
		if (a.count-0 > b.count-0) return  1;
		else                       return  0;
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
				"<td>" + result.payload[i].count     + "</td>" +
				"<td> <input type='number' value='0' class='addEditField' data-beer_id='" + result.payload[i].beer_id + "'> </td>";
		}	
		document.getElementById("manage-orders").appendChild(row);
	}
}

function updateStocks() {
	var retrieveBoxAmount = document.getElementsByClassName("addEditField");
	var username = sessionStorage.getItem("username");
	var password = sessionStorage.getItem("password");
	var db = new Database(username, password);
	for (var i = 0; i < retrieveBoxAmount.length; i++) {
		var box = retrieveBoxAmount[i];
		if (box.value > 0) {
			//db.request("inventory_append");
			//which price should we remember as well as the beer id?
		}
	}
}

// This function just checks so that you are logged in. If you are not, the user's name will be null, null.
function initOrderList() {
	var username = sessionStorage.getItem("username");
	var password = sessionStorage.getItem("password");
	var db = new Database(username, password);
	db.request("inventory_get", listInventory);
	document.getElementById("updateButton").addEventListener("click", updateStocks, false);
}

document.addEventListener("DOMContentLoaded", initOrderList, false);