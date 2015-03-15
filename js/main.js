$(function() {
	$('#cart').droppable({
		tolerance: 'pointer',
		drop: function(event, ui) {
			var name = ui.helper[0].getElementsByClassName("name")[0].innerHTML;
			console.log(name);
			var newElement = document.createElement("div");
			newElement.innerHTML = name;
			document.getElementById("cart").appendChild(newElement);
		}
	});
	$('#favorites button').draggable({
		cancel: false,
		helper: "clone",
		revert: true,
		drag: function(event, ui) {
			$(ui.helper).addClass("nicer");
		}
	});
});
