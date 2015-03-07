/* This function should take an identifier, look it up in some dictionary, and replace placeholders.
 * For example, if the dictionary contains the entry "'welcome-msg': 'Welcome, %2, to %1.'",
 * S("welcome-msg", "The Flying Duchman", "Jory") should return "Welcome, Jory, to The Flying Duchman.".
 * 
 * TODO: Plurals.
 */

function init() {
	var userLang = getLang();
	var langObj = getLangObject(userLang).then(function(response){
		var dict = response;
		$("body").children().each(function() {
			$(this).html($(this).html().replace(/%(\w+)%/g, function(match, $1) {
                return getWord(dict, $1);
			}));
		});
	}, function(error) {
		console.log(error);
	});
}

function getWord(dictionary, wordID) {
	return dictionary[wordID];
}

function setLang(lang) {
	console.log("New lang: " + lang);
	sessionStorage.setItem("lang", lang);
}

function getLang() {
	return sessionStorage.getItem("lang");
}

function getLangObject(lang) {
	return new Promise(function(resolve, reject) {	
		var contents = getFile(lang).then(function(response) {
			var parsed = JSON.parse(response);
			resolve(parsed);
		}, function(error) {
			reject(Error("Error in getLangObject!"));
		});
	});
}

function getFile(lang) {
	return new Promise(function(resolve, reject) {
		var fileContent = null;
		var req = new XMLHttpRequest();
		var url = window.location.href;
		url = url.substring(0, url.lastIndexOf('/') + 1);
		url = url + "lang/" + lang + ".json"
		req.open("GET", url, true);
		req.onreadystatechange = function () {
			if(req.readyState === 4) {
				fileContent = req.responseText;
				resolve(fileContent);
			}
		}
		req.send();
	});
}

function S(id) {
	var string = id;
	if (arguments.length > 1) {
		string += "(";
		for (var i = 1; i < arguments.length; i++) {
			string += arguments[i];
			if (i != arguments.length - 1) {
				string += ", ";
			}
		}
		string += ")";
	}
	return string;
}

window.addEventListener("DOMContentLoaded", init, false);
