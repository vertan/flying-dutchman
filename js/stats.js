window.addEventListener("load", init, false);

/*
var customers = ["Johan", "Filip", "Johanna", "Andreas"];
var c_values = [16, 8, 4, 3];
*/
var c_customers = [
		{ "name" : "Johan", "visits" : 16 },
		{ "name" : "Filip", "visits" : 8 },
		{ "name" : "Johanna", "visits" : 4 },
		{ "name" : "Andreas", "visits" : 3 }
];


// var c_color = ["#004CB3", "#B3004C", "#4CB300"];
var c_days = ["Mon", "Tue", "Wes", "Thu", "Fri", "Sat", "Sun"];
var c_month = ["Jan", "Feb", "Mars", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


var c_beer_attr = [ 
		{ "name" : "Kungen", "price" : 220},
		{ "name" : "Mariestad", "price" : 281},
		{ "name" : "Åbro", "price" : 343} //,
//		{ "name" : "Spendrups", "price" : 349}
];

var c_beer_day = [ { "name" : "", "sales" : [] }, { "name" : "", "sales" : [] } ];
var c_beer_week = [
		{ "name" : "Kungen", "sales" : [ 23, 34, 32, 34, 43, 23, 26] },
		{ "name" : "Mariestad", "sales" : [ 33, 23, 25, 12, 33, 28, 22] },
		{ "name" : "Åbro", "sales" : [ 27, 30, 20, 29, 24, 16, 31] }
];

var c_beer_year = [ {
		"name" : "Kungen",
		"sales" : [ 220, 324, 231, 423, 234, 213, 243, 123, 324, 342, 134, 254]
}, {
		"name" : "Mariestad",
		"sales" : [ 240, 245, 214, 203, 354, 273, 349, 423, 234, 432, 324, 245],
}, {
		"name" : "Åbro",
		"sales" : [ 320, 234, 123, 232, 443, 231, 433, 213, 432, 234, 224, 354]
		/*
		"name" : "Spendrups"
		"qty" : [ 220, 324, 231, 423, 434, 213, 343, 123, 324, 342, 134, 254],
		*/
}];


var c_colors = [{
		"fillStyle" : "rgba(200,100,100,0.5)",
		"strokeStyle" :  "rgba(200,100,100,0.8)",
		"highlightFill" : "rgba(200,100,100,0.75)",
		"highlightStroke" : "rgba(200,100,100,1)"
},{
		"fillStyle" :  "rgba(151,187,205,0.5)",
		"strokeStyle" :  "rgba(151,187,205,0.8)",
		"highlightFill" : "rgba(151,187,205,0.75)",
		"highlightStroke" : "rgba(151,187,205,1)"
},{
		"fillStyle" :  "rgba(101,205,105,0.5)",
		"strokeStyle" :  "rgba(101,205,105,0.8)",
		"highlightFill" : "rgba(101,205,105,0.75)",
		"highlightStroke" : "rgba(101,205,105,1)"
},{
		"fillStyle" :  "rgba(100,205,205,0.5)",
		"strokeStyle" :  "rgba(100,205,205,0.8)",
		"highlightFill" : "rgba(100,205,205,0.75)",
		"highlightStroke" : "rgba(100,205,205,1)"	
}];

function getMaxValue (array) {

		n = array.length;

		var maxValue = array[0].sales[0];
		
		for ( var i = 0; i < n; i++ ) {
				for ( var j = 0; j < array[i].sales.length; j++) {
						if ( maxValue < array[i].sales[j] ) { maxValue = array[i].sales[j]; }
				}
		}
		
		return maxValue
}

function drawLines (canvas, xPadding, yPadding) {

		canvas.beginPath();
		canvas.moveTo( xPadding, 0);
		canvas.lineTo( xPadding, canvas.height - yPadding);
		canvas.lineTo( canvas.width, canvas.height - yPadding);
		canvas.stroke();

}

function lineChart (ctx, array1, array2) {

		// console.log(array1[1]);
		
		var xPadding = 30;
		var yPadding = 30;

		drawLines(ctx, xPadding, yPadding);
		
		var n = array2.length;		
		
		for ( var i = 0; i < n; i++) {
				value = 35 + ctx.width/n * i;
				ctx.fillText( array2[i], value, ctx.height - yPadding + 20);
		}

		ctx.textAlign = "end";

		maxValue = getMaxValue(array1);
		var len = Math.ceil(Math.log(maxValue + 1) / Math.LN10);
		roundUp = Math.ceil(maxValue/(Math.pow(10,len-1)));
		h = ctx.height / ( roundUp *Math.pow(10, len-1));
		
		for ( var i = 0; i < 11; i++) {
				value = roundUp * i * Math.pow(10, len-2)
				ctx.fillText(value, 20, ctx.height - value * h - yPadding);
		}

		for ( var i = 0; i < array1.length; i++) {
				ctx.fillStyle = c_colors[i].highlightStroke;
				ctx.font = "bold 15px Arial";
				ctx.fillText(array1[i].name, ctx.width - 100 * i, ctx.height - 2 * yPadding);				
		}
		
		for ( var j = 0; j < array1.length; j++) {

				ctx.strokeStyle = c_colors[j].highlightStroke;
				ctx.beginPath();
				ctx.moveTo(45, ctx.height - array1[j].sales[0]*h-yPadding);
				
				for ( var i = 1; i < array1[j].sales.length; i++) {
						value = 45 + ctx.width/n * i;
						ctx.lineTo( value, ctx.height - array1[j].sales[i]*h - yPadding);		
				}
				
				ctx.stroke();
				
				for ( var i = 0; i < array1[j].sales.length; i++) {
						value = 45 + ctx.width/n * i;
						ctx.fillStyle = c_colors[j].highlightStroke;
						ctx.beginPath();
						ctx.arc( value, ctx.height - array1[j].sales[i]*h - yPadding, 4, 0, Math.PI * 2, true);
						ctx.fill();
				}
		}


}

function barChart(ctx, n) {

		var bar_width = 50;
		var x = 10
		var y = 350;
		var xPadding = 30;
		var yPadding = 30;
		
		for ( var i = 0; i < n; i++) {
				ctx.lineWidth = 2;
				ctx.beginPath();

				ctx.rect(x + 2 * xPadding, ctx.height - c_beer_attr[i].price - yPadding, bar_width, c_beer_attr[i].price);
				ctx.fillStyle = c_colors[0].highlightFill;
				ctx.fill();
				ctx.strokeStyle = c_colors[0].highlightStroke;
				ctx.stroke();

				ctx.beginPath();
				ctx.rect(x + 2 * xPadding + bar_width, ctx.height - c_beer_attr[i].price -yPadding, bar_width, c_beer_attr[i].price);

				ctx.fillStyle = c_colors[1].highlightFill;
				ctx.fill();
				ctx.strokeStyle = c_colors[1].highlightStroke;
				ctx.stroke();
				
				ctx.fillStyle = "#000";
				ctx.font = "16px Arial";
				ctx.textAlign = "center";
				ctx.fillText(c_beer_attr[i].name, x + 3.5 * xPadding, ctx.height - yPadding + 20);
				
				x += bar_width * 3;
				
		}
		
		ctx.strokeStyle = "#000";
		drawLines(ctx, xPadding, yPadding);
}

function pieChart(ctx, radius, x, y, array) {

		startAngle = 0;
		endAngle = 0;
		var sum = 0;
		var pro = 0;
		
		for( var i = 0; i < array.length; i++) { sum += array[i].visits;}
		
		for( var i = 0; i < array.length; i++) {
				
				x1 = array[i].visits / sum;

				endAngle = startAngle + x1 * 360 ;
				endAngle = startAngle + x1 * 2 * Math.PI ;
				
				ctx.beginPath();
				ctx.lineTo(x, y);
				ctx.arc(x, y, radius, startAngle, endAngle);
				ctx.lineTo(x, y);

				ctx.fillStyle = c_colors[i].highlightStroke;

				ctx.lineWidth = 5;
				ctx.strokeStyle = '#ffffff';
				
				ctx.fill();
				ctx.stroke();

				startAngle = endAngle;

				ctx.fillStyle = c_colors[i].highlightStroke;
				ctx.font = "bold 15px Arial";
				ctx.fillText(array[i].name, 100, 100 + i * 30);
				ctx.fillText(array[i].visits, 200, 100 + i * 30);
		}
}

function init() {
		
		var stats_chart =  document.getElementsByClassName("stats")[0];
		var chart = stats_chart.getElementsByTagName("canvas")[0];
		var ctx = chart.getContext("2d");

		console.log(chart);
		ctx.height = chart.height;
		ctx.width = chart.width;;

		var x = chart.width / 2;
		var y = chart.height / 2;
		
		var radius = 100;

		console.log(chart.id);
		switch(chart.id) {
		case "beer_year_chart":
				lineChart(ctx, c_beer_year, c_month);
				break;
		case "beer_week_chart":
				lineChart(ctx, c_beer_week, c_days);
				break;
		case "user_day_chart":
				pieChart(ctx, radius, x, y, c_customers);
				break;
		}
		
		// barChart(ctx, 3);
				// pieChart(ctx, radius, x, y, c_customers);


		// barChart(ctx1);

}
