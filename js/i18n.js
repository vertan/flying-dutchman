/* This function should take an identifier, look it up in some dictionary, and replace placeholders.
 * For example, if the dictionary contains the entry "'welcome-msg': 'Welcome, %2, to %1.'",
 * S("welcome-msg", "The Flying Duchman", "Jory") should return "Welcome, Jory, to The Flying Duchman.".
 * 
 * TODO: Plurals.
 */

// Dummy function:
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
