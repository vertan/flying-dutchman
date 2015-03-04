$(document).ready(function(){
	$.ajax({
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get',
        dataType: "json",
        async: true,
        success: function (result) {

			for(var i = 0; i < result.payload.length; i++) {
				
				$('#manage-orders').append('<tr><td>'+result.payload[i].beer_id +'</td><td>'+result.payload[i].namn +'</td><td>'+result.payload[i].namn2 +'</td><td>'+result.payload[i].sbl_price +'</td><td>'+result.payload[i].pub_price +'</td><td>'+result.payload[i].price+'</td><td>'+result.payload[i].count +'</td></tr>')
				
				
			}
			},
        error: function (request,error) {
		
            alert('Network error has occurred please try again!');
        }
    }); 
});
