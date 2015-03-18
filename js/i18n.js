var userLang;
var dict;

dict = sessionStorage.getItem("dict");
if (dict) {
	dict = JSON.parse(dict);
} else {
	dict = {};
}

function init() {
	userLang = getLang();
	var langObj = getLangObject(userLang).then(function(response){
		dict = response;
		sessionStorage.setItem("dict", JSON.stringify(dict));
		var elements = document.getElementsByClassName("i18n");
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var string = getWord(dict, element.id);
			if (string == "[i18n error] String not found!") {
				element.innerHTML = element.innerHTML.replace(/%([\w\-]+)%/g, function(match, $1) {
					return getWord(dict, $1);
				});
			} else {
				element.innerHTML = string;
			}
		}
	}, function(error) {
		console.log(error);
	});
}

// Returns the translation string from the dictionary given wordID as the key
function getWord(dictionary, wordID) {
	var result = dictionary[wordID];
	if (result != undefined) {
		return result;
	} else {
		return "[i18n error] String not found!";
	}
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

// Returns the translated string with key id and replaces numbered placeholders with the remaining arguments.
// For example, given that the current dictionary contains the entry "''welcome-msg': 'Welcome, %2, to %1.'",
// S("welcome-msg", "The Flying Duchman", "Jory") should return "Welcome, Jory, to The Flying Duchman.".
function S(id) {
	var string = getWord(dict, id);
	if (string == "[i18n error] String not found!") {
		return getDummyString(arguments);
	}
	for (var i = 1; i < arguments.length; i++) {
		string = string.replace("{" + i + "}", arguments[i]);
	}
	return string;
}

// Used in case a string couldn't be found in the dictionary
function getDummyString(arguments) {
	var id = arguments[0];
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
