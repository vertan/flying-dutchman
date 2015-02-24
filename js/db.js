DEFAULT_DB_URL = "http://pub.jamaica-inn.net/fpdb/api.php";

function Database(username, password, url) {
	this.username = username;
	this.url = url ? url : DEFAULT_DB_URL;
	this.request = function (action, recceiver) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			console.log('%s at readyState %i', action, xhr.readyState);
			if (xhr.readyState == 4) {
				// TODO: Check xhr.status
				var r = JSON.parse(xhr.response);
				console.log(action, r);
				recceiver(r);
			}
		};
		xhr.open('GET', this.url + '?action=' + action + '&username=' + this.username + '&password=' + password);
		xhr.send();
	};
};
function handleRequestError(xhr, error) {
	console.error("handleRequestError(%o, %o)", xhr, error);
}

/* Example
var db = new Database('jorass', 'jorass', 'http://pub.jamaica-inn.net/fpdb/api.php');
db.request('purchases_get', function (r) {
	console.info('Got %i items: %o', r.payload.length, r);
});
*/

