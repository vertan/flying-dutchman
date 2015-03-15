var themes = [
	{
		name: S("theme-default"),
		path: ""
	},
	{
		name: S("theme-highcontrast"),
		path: "css/themes/high-contrast.css"
	}
];

function setTheme(newTheme) {
	theme = newTheme;
	if (theme) {
		sessionStorage.setItem("theme", theme);
		themeLink.href = theme;
		document.head.appendChild(themeLink);
	} else {
		sessionStorage.removeItem("theme", theme);
		if (document.head.contains(themeLink)) {
			document.head.removeChild(themeLink);
		}
	}
}

var themeLink = document.createElement("link");
themeLink.rel = "stylesheet";
themeLink.type = "text/css";
var theme = sessionStorage.getItem("theme");
if (theme) {
	setTheme(theme);
}

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
