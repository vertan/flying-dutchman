function Database(url, username, password) {
	this.url = url;
	this.username = username;
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
		xhr.open('GET', url + '?action=' + action + '&username=' + this.username + '&password=' + password);
		xhr.send();
	};
};
function handleRequestError(xhr, error) {
	console.error("handleRequestError(%o, %o)", xhr, error);
}

/* Example
var db = new Database('http://pub.jamaica-inn.net/fpdb/api.php', 'jorass', 'jorass');
db.request('purchases_get', function (r) {
	console.info('Got %i items: %o', r.payload.length, r);
});
*/

