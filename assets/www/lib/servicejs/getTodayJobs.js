var user = null;
var result_signin = {};
var debug = false;
var jobId;
var displayListfrom = 0;
var displayListUpTo;

$(document).on("pageshow", "#jobs", function(event) {
	switchPageTo = "jobs";
	switchPageToOffLine = "jobs-detail";
trackInformation("jobs");
	//offline
	if (mode == 0) {
		$("#jobsLoader").popup("open");
		setTimeout(function() {
			$('#jobsLoader').popup("close");
			createdriverJobsListOffLine();
		}, 1000);

	} else {
		//online

		$("#jobsLoader").popup("open");
		setTimeout(function() {
			$("#jobsLoader").popup("close");
			todayJobs();
		}, 1000);

	}
});

// on line working
function todayJobs() {

	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var token = localStorage.getItem("driver_authentication_token");
	$.ajax({
		url : url_link+'/driver/v1/joblist.json/?page=1&per_page=2&auth_token=' + token,
		type : 'GET',
		success : function(data) {
			success(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function success(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			//success result
			var result = objectValue(data);

			if (data.hasOwnProperty("bookings")) {
				createdriverJobsList(data);
			} else {
				alert("Error");
			}

		} else if (data['code'] == 1) {
			//error result
			var result = jobsError(data);
			//console.log(data.messages);

		}
	}
}

//create job list view
function createdriverJobsList(driverJobs) {
	displayListUpTo = driverJobs.bookings.length;
	//create vendor list view
	var list;
	for (displayListfrom; displayListfrom < displayListUpTo; displayListfrom++) {
		console.log(driverJobs.bookings[displayListfrom].date);
		var jobtime=new Date(driverJobs.bookings[displayListfrom].date).format("H:i");
		list = '<li data-icon="false"class="jobListClass margin-shadow-list driverJobsListItem ui-li-static ui-body-inherit ui-first-child box" style="padding-left:0px !important;"'
		+'id="' + displayListfrom + '" onclick="jobDetail(this.id)">' + '<div class="grey" style="margin:20px;"><label style="font-size:22px;text-align:center;"><b style="float:left;font-style: bold !important;color:black">Job ' + driverJobs.bookings[displayListfrom].id 
		+ '</b>' + jobtime  + '</label></div>' 
		+ '</li>';
		$('.driverJobsList').append(list);
		//$(".driverJobsList").listview("refresh");

	}
	//displayListUpTo = displayListUpTo + 5;
	//swiper();
}

function jobDetail(id) {
	jobId = id;
	$("#job-id").html(id);
	var done=$("#"+jobId).hasClass("thisJobDone");
	if(done){
		$("#startedJob").append(startedIcon);
		$("#pickedUpClient").append(startedIcon);
		$("#jobDone").append(startedIcon);
       // $("#reportProblem").append(reportIcon);
	    $("#startedJob").addClass("ui-state-disabled");
		$("#reportProblem").addClass("ui-state-disabled");
		 $("#pickedUpClient").addClass("ui-state-disabled");
		$("#jobDone").addClass("ui-state-disabled");
	}else{
		$("#startedJob").find("div").empty();
		$("#pickedUpClient").find("div").empty();
		$("#reportProblem").find("div").empty();
		$("#jobDone").find("div").empty();
		 $("#startedJob").removeClass("ui-state-disabled");
		$("#reportProblem").addClass("ui-state-disabled");
		 $("#pickedUpClient").addClass("ui-state-disabled");
		$("#jobDone").addClass("ui-state-disabled");
	}
	nextPage('#jobs', '#jobs-detail');
}


// off line working

//create job list view
function createdriverJobsListOffLine() {
	displayListUpTo = jobList.length;
	//create vendor list view
	var list;
	for (displayListfrom; displayListfrom < displayListUpTo; displayListfrom++) {
		list = '<li style="margin-bottom:3px;"data-icon="false"class="jobListClass margin-shadow-list driverJobsListItem ui-li-static ui-body-inherit ui-first-child box2" id="' + jobList[displayListfrom].id + '" onclick="jobDetailOffLine(this.id)">' + '<div class="grey" style="margin:20px;"><label style="font-size:22px;">Job ' + jobList[displayListfrom].id + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + jobList[displayListfrom].time + '</label></div>' + '</li>';
		$('.driverJobsList').append(list);
		//$(".driverJobsList").listview("refresh");

	}
	//swiper();
}

function swiper(){
$(".driverJobsList li").swipe( {
	swipeStatus:function(event, phase, direction, distance, duration, fingers)
		{
		var sId = $(this).attr('id');
	    	
		   if(direction == "right")
		   {
				var x=350-distance;
				$("#"+sId).css("margin-left",distance);
				$("#"+sId).css("opacity","0."+x);
				$(sId+".startedDiv").css("opacity","0");
				if(distance > 230 && phase != "move")
				{
				/* $(this).addClass('removedItem')
                      .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {  */
                      	$("#"+sId).css("opacity","1");
						$("#"+sId).css("margin-left","0");
						$(".startedDiv").css("opacity","1");
                          $(".startedDiv").remove(); 
                          $("#"+sId).append(startedIconDiv);
                         // $(this).removeClass('removedItem');	 
                   //    });
				} 
				else{
				      if( phase != "move"){
				      	$("#"+sId).css("opacity","1");
						$("#"+sId).css("margin-left","0");
						$(".startedDiv").css("opacity","1");
				    }
				}
			}	
			if( phase != "move")
			{
				       $("#"+sId).css("opacity","1");
						$("#"+sId).css("margin-left","0");
		     }
       },
       threshold:200,
	   maxTimeThreshold:5000,
	  fingers:'all'
		
});	
	
}



function arrayValue(data) {

	if ( data instanceof Array) {
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
		}
		return data;
	}
}

function jobsError(data) {

	//console.log(data);
	if ( data instanceof Object) {
		
		alert("jobsError");
	}
}