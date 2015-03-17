var db;
var beveragesListElement;
var beverages;

/*
function beverages(e) {
	var beverage = document.getElementById("beverage-list");
	sessionStorage.setItem("beverage", beverage);
}
*/

function createbeveragelist () {
	
		var list = document.getElementById("beverage-list");
		var value = document.getElementById("sorting").value;
		
		list.innerHTML = "";
		
		beverages.sort (function(a,b) {
				if ( value == "name") {
						if (a.namn < b.namn) return -1;
						if (a.namn > b.namn) return 1;
						else return  0;
				} else if ( value == "price") {
						if (a.price-0 < b.price-0) return 1;
						if (a.price-0 > b.price-0) return -1;
						else return  0;
				}
		});

		for ( var i = 0; i < beverages.length; i++) {

				var div = document.createElement("div");
				var Name = beverages[i].namn;
				var Name2 =	beverages[i].namn2;
		    var price = beverages[i].price;
				div.innerHTML =
						"<span class='name'>" + Name + "</span> " +
						"<span class='name2'>" + Name2 + "</span> " +
						"<span class='price'>" + price + "</span> " ;
				list.appendChild(div);
		}
}

function listofbeverages(response) {
		
		if ( response.type == "inventory_get") {
				document.getElementById("sorting").addEventListener("change", createbeveragelist, false);
				
				// console.log("beverage: " + beverages);

				beverages = response.payload;

				// console.log("beverage " + JSON.stringify(beverages[0]));
				
				createbeveragelist();
		} else if ( response.type == "error") {
				var errorMsg = response.payload[0].msg;
				alert("Error:\n" + errorMsg);
				location.reload();
		}
}

function init() {
		sessionStorage.setItem("username","jorass");
		sessionStorage.setItem("password","jorass");
		
		beveragesListElement = document.getElementById("List");
		var username = sessionStorage.getItem("username");
		var password = sessionStorage.getItem("password");
		db = new Database(username, password);
		db.request("inventory_get", listofbeverages);

}

window.addEventListener("load", init, false);
