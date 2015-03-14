$(document).ready(function(){
	$.ajax({
        url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=payments_get_all',
        dataType: "json",
        async: true,
        success: function (result) {

			for(var i = 0; i < result.payload.length; i++) {
				
				$('#payments').append('<tr><td>'+result.payload[i].timestamp +'</td><td>'+result.payload[i].admin_id +'</td><td>'+result.payload[i].admin_username +'</td><td>'+result.payload[i].first_name +'</td><td>'+result.payload[i].last_name +'</td><td>'+result.payload[i].amount +'</td></tr>')
				
				
			}
			},
        error: function (request,error) {
		
            alert('Network error has occurred please try again!');
        }
    }); 
});

