$(function() {
	$('#cart').droppable({
		tolerance: 'pointer',
		drop: function(event, ui) {
			console.log(event, ui);
			setTimeout(function() {
				document.getElementById("cart").appendChild(ui.helper[0]);
			}, 2000);
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
