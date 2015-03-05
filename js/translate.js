$(document).ready(function() {

var options ={ 
   lng: "en",  
   resGetPath: "js/translate_EN.json"
};

i18n.init(options, function(t) {
		 				$("#title").i18n();
		 				});
})


//TO DO: do function if choose swedish, then the language file translate_EN.json changes to SW

