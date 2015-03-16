var c_customers_day = [ { "name" : "Johan", "visits" : 16 }, { "name" : "Filip", "visits" : 8 }, { "name" : "Johanna", "visits" : 4 }, { "name" : "Andreas", "visits" : 3 }];
var c_customers_week = [ { "name" : "Johan", "visits" : 34 }, { "name" : "Filip", "visits" : 23 },  { "name" : "Johanna", "visits" : 16 }, { "name" : "Andreas", "visits" : 13 }];
var c_customers_year = [ { "name" : "Johan", "visits" : 324 }, { "name" : "Filip", "visits" : 235 }, { "name" : "Johanna", "visits" : 106 }, { "name" : "Andreas", "visits" : 133 }];

var c_days = ["Mon", "Tue", "Wes", "Thu", "Fri", "Sat", "Sun"];
var c_month = ["Jan", "Feb", "Mars", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

var c_beer_day = [ { "name" : "Kungen", "sales" : [10] },	{ "name" : "Mariestad", "sales" : [16] }, { "name" : "Åbro", "sales" : [13] }];
var c_beer_week = [ { "name" : "Kungen", "sales" : [ 23, 34, 32, 34, 43, 23, 26] }, { "name" : "Mariestad", "sales" : [ 33, 23, 25, 12, 33, 28, 22] }, { "name" : "Åbro", "sales" : [ 27, 30, 20, 29, 24, 16, 31] }];

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
		"fillStyle" : "rgba(200,100,100,1)",
		"highlightFill" : "rgba(200,100,100,0.75)",

},{
		"fillStyle" :  "rgba(151,187,205,1)",
		"highlightFill" : "rgba(151,187,205,0.75)",

},{
		"fillStyle" :  "rgba(101,205,105,1)",
		"highlightFill" : "rgba(101,205,105,0.75)",

},{
		"fillStyle" :  "rgba(100,205,205,1)",
		"highlightFill" : "rgba(100,205,205,0.75)",
}];

function getMaxValue (array) {

		n = array.length;
		
		var maxValue = array[0].sales[0];
		
		for ( var i = 0; i < n; i++ ) {
				for ( var j = 0; j < array[i].sales.length; j++) {
						if ( maxValue < array[i].sales[j] ) { maxValue = array[i].sales[j]; }
				}
		}
		
		return maxValue;
}

function drawLines (canvas, xPadding, yPadding) {

		canvas.strokeStyle = "#000";
		canvas.lineWidth = 1;
		
		canvas.beginPath();
		canvas.moveTo( xPadding, 0);
		canvas.lineTo( xPadding, canvas.height - yPadding);
		canvas.lineTo( canvas.width, canvas.height - yPadding);
		canvas.stroke();

}

function lineChart (ctx, array1, array2) {
		
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
				ctx.font = "12px Arial";
				value = roundUp * i * Math.pow(10, len-2)
				ctx.fillText(value, 20, ctx.height - value * h - yPadding);
		}

		for ( var i = 0; i < array1.length; i++) {
				ctx.fillStyle = c_colors[i].fillStyle;
				ctx.font = "15px Arial";
				ctx.fillText(array1[i].name, ctx.width - 100 * i, ctx.height - 2 * yPadding);				
		}
		
		for ( var j = 0; j < array1.length; j++) {

				ctx.strokeStyle = c_colors[j].fillStyle;
				ctx.beginPath();
				ctx.moveTo(45, ctx.height - array1[j].sales[0]*h-yPadding);
				
				for ( var i = 1; i < array1[j].sales.length; i++) {
						value = 45 + ctx.width/n * i;
						ctx.lineTo( value, ctx.height - array1[j].sales[i]*h - yPadding);		
				}
				
				ctx.stroke();
				
				for ( var i = 0; i < array1[j].sales.length; i++) {
						value = 45 + ctx.width/n * i;
						ctx.fillStyle = c_colors[j].fillStyle;
						ctx.beginPath();
						ctx.arc( value, ctx.height - array1[j].sales[i]*h - yPadding, 4, 0, Math.PI * 2, true);
						ctx.fill();
				}
		}

		ctx.fillStyle = "black";
		ctx.strokeStyle = "black";
}

function barChart(ctx, array) {

		var bar_width = 50;
		var x = 10
		var y = 350;
		var xPadding = 30;
		var yPadding = 30;
		
		maxValue = getMaxValue(array);

		var len = Math.ceil(Math.log(maxValue + 1) / Math.LN10);
		roundUp = Math.ceil(maxValue/(Math.pow(10,len-1)));
		h = ctx.height / ( roundUp *Math.pow(10, len-1));
		
		for ( var i = 0; i < 11; i++) {
				ctx.font = "12px Arial";
				value = roundUp * i * Math.pow(10, len-2);
				ctx.fillText(Math.ceil(value), 20, ctx.height - value * h - yPadding);
		}
		
		n = array.length;
		
		for ( var i = 0; i < n; i++) {
				ctx.lineWidth = 2;
				ctx.beginPath();

				ctx.rect( x + 2 * xPadding, ctx.height - array[i].sales * h - yPadding, bar_width, array[i].sales*h);

				ctx.fillStyle = c_colors[i].fillStyle;
				ctx.fill();
				ctx.strokeStyle = c_colors[0].highlightStroke;
				ctx.stroke();
				
				ctx.fillStyle = "#000";
				ctx.font = "16px Arial";
				ctx.textAlign = "center";
				ctx.fillText(array[i].name, x + 3 * xPadding, ctx.height - yPadding + 20);
				
				x += bar_width * 3;
				
		}
		
		ctx.strokeStyle = "#000";
		drawLines(ctx, xPadding, yPadding);

		ctx.fillStyle = "black";
		ctx.strokeStyle = "black";
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

				ctx.fillStyle = c_colors[i].fillStyle;

				ctx.lineWidth = 5;
				ctx.strokeStyle = '#ffffff';
				
				ctx.fill();
				ctx.stroke();

				startAngle = endAngle;

				ctx.fillStyle = c_colors[i].fillStyle;
				ctx.font = "15px Arial";
				ctx.fillText(array[i].name, 100, 100 + i * 30);
				ctx.fillText(array[i].visits, 200, 100 + i * 30);
		}

		ctx.fillStyle = "black";
		ctx.strokeStyle = "black";
}

function chartSelect () {
		
		var stats_chart =  document.getElementsByClassName("stats")[0];
		var chart = stats_chart.getElementsByTagName("canvas")[0];
		var ctx = chart.getContext("2d");

		ctx.height = chart.height;
		ctx.width = chart.width;

		var x = chart.width / 2;
		var y = chart.height / 2;
		
		var radius = 100;
		
		var chart = document.getElementById("statsSelect").value;

		switch(chart) {
		case "beer_day_chart":
        ctx.clearRect(0, 0, ctx.width, ctx.height);
				barChart(ctx, c_beer_day);
				break;
		case "beer_week_chart":
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				lineChart(ctx, c_beer_week, c_days);
				break;
		case "beer_year_chart":
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				lineChart(ctx, c_beer_year, c_month);
				break;
		case "user_day_chart":
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				pieChart(ctx, radius, x, y, c_customers_day);
				break;
		case "user_week_chart":
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				pieChart(ctx, radius, x, y, c_customers_week);
				break;
		case "user_year_chart":
				ctx.clearRect(0, 0, ctx.width, ctx.height);
				pieChart(ctx, radius, x, y, c_customers_year);
		}

}
