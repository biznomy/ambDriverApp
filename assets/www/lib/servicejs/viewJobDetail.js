

$(document).on("pageshow", "#jobs-detail", function(event) {
	trackInformation("jobs-detail");
$("#jobDetailLoader").popup("open");
    	setTimeout(function(){
    		$("#jobDetailLoader").popup("close");
    		jobDetailView();
    	}, 1000);
});

// on line working
function jobDetailView() {

	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var token = localStorage.getItem("driver_authentication_token");
	$.ajax({
		url : url_link+'/driver/v1/joblist.json/?page=1&per_page=2&auth_token=' + token,
		type : 'GET',
		success : function(data) {
			successViewDetail(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function successViewDetail(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);
				viewJobDetail(data);
		} 
		else if (data['code'] == 1) {
			//error result
			jobDetailOffLine();

		}
	}
}


function viewJobDetail(jobData) {
	var arrayIndex = $("#job-id").text();
	console.log("gfd "+jobData);
	var jobtime=new Date(jobData.bookings[arrayIndex].date).format("H:i");
	$("#job-time").html(jobtime);
	$("#fadd1").html(jobData.bookings[arrayIndex].fadd1);
	$("#fadd2").html(jobData.bookings[arrayIndex].fadd2);
	$("#tadd1").html(jobData.bookings[arrayIndex].tadd1);
	$("#tadd2").html(jobData.bookings[arrayIndex].tadd2);
	$("#job-id").html("Job" + jobData.bookings[arrayIndex].id);
}


function jobDetailOffLine(id) {
	jobId = id;
	$("#job-id").html("Job" + id);
	nextPage('#jobs', '#jobs-detail');
}
