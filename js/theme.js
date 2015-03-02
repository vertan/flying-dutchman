var themes = [
	{
		name: S("theme-default"),
		path: null
	},
	{
		name: S("theme-highcontrast"),
		path: "css/themes/high-contrast.css"
	}
];

function setTheme(newTheme) {
	theme = newTheme;
	sessionStorage.setItem("theme", theme);
	if (theme) {
		themeLink.href = theme;
		document.head.appendChild(themeLink);
	} else if (document.head.contains(themeLink)) {
		document.head.removeChild(themeLink);
	}
}

var themeLink = document.createElement("link");
themeLink.rel = "stylesheet";
themeLink.type = "text/css";
var theme = sessionStorage.getItem("theme");
setTheme(theme);

function setThemeHandler(e) {
	setTheme(e.target.selectedOptions[0].value);
}

function populateThemeMenu() {
	var themeMenu = document.getElementById("theme-menu");
	if (themeMenu) {
		for (var i = 0; i < themes.length; i++) {
			var option = document.createElement("option");
			option.innerHTML = themes[i].name;
			option.value     = themes[i].path;
			option.selected  = themes[i].path == theme;
			themeMenu.appendChild(option);
		}
		themeMenu.addEventListener("change", setThemeHandler, false);
	}
}

window.addEventListener("DOMContentLoaded", populateThemeMenu, false);
