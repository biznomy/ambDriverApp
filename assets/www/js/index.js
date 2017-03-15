//var mode = 0; //offline
var mode = 1; //online
var url_link = 'http://54.255.180.226:3000';
//var url_link = 'http://192.168.1.13:3000';
//for server interaction
var setLocation;
var jobList=	[{
				time:"9:03am",id:1
				},{
				time:"11:00am",id:2
				}, {
				time:"1:30pm",id:3
				}, {
				time:"6:03pm",id:4
			    }];
var startedIconDiv= '<div class="grey startedDiv" style=" position: absolute; top: 30px; right:25px;"><label style="font-size:21px;"><b>Done</b></label>'
					+'  </div>';
var startedIcon= '<div class="grey startedDiv" style="width:36px;margin:auto;"><div style=" position: absolute; top:4px;float:left;color:#fff"><i class="flaticon-round68"></i>'
					+' </div> </div>'	;
var reportIcon= '<div class="grey startedDiv" style="width:25px;margin:auto;"><div style=" position: absolute; top:11px;color:#fff"><i class="flaticon-error4"></i>'
					+' </div> </div>'	;								
var line='<div class="doneLine"></div>';

tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

$(document).ready(function(){
    GetClock();
    setInterval(GetClock,1000);
    
   localStorage.setItem("driver_authentication_token","");
	if(localStorage.getItem("driver_authentication_token")  != ""){
			$.mobile.changePage("#jobs", {
						transition : "none",
						reverse : false
			});
	}else{trackInformation("logIn");};	
  });
function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear(),nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

     if(nhour==0){ap=" AM";nhour=12;}
	else if(nhour<12){ap=" AM";}
	else if(nhour==12){ap=" PM";}
	else if(nhour>12){ap=" PM";nhour-=12;}
	
	if(nyear<1000) nyear+=1900;
	if(nmin<=9) nmin="0"+nmin;
	if(nsec<=9) nsec="0"+nsec;

document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

		
	//createdriverJobsListOffLine();
 	
	$('#modeToggle').on('click', function(){
		mode = mode == 0 ? 1 : 0;
		if(mode == 0){
			$('#modeInfo').text("Offline");
		}else{
			$('#modeInfo').text("Online");
		}		
	});


 function selectReportType(type){
	var val = $("#"+type).text();
	$("#reportProblem").append(reportIcon);
	$.mobile.changePage("#jobs-detail", {
					transition : "none",
					reverse : false
				    });
  };
 /*
$(".driverJobsList").bind("scroll", function(evt){  
    var el = $(this).get(0);
    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
    	
    	$("#jobsLoader").popup("open");
    	setTimeout(function(){
    		$("#jobsLoader").popup("close");
    		 createdriverJobsList();
    	}, 500);
     
    }
});
*/
function trackInformation(page){
	$.get(
                        "http://www.technolabs.in/driver/track",
                        "source="+page
                    );
}
    function nextPage(from, to) {

				if (from == "#startedJob") {
					$(from).append(startedIcon);
					 $("#pickedUpClient").removeClass("ui-state-disabled");
					 $("#reportProblem").removeClass("ui-state-disabled");
				}
				if(from == "#pickedUpClient"){
					 $(from).append(startedIcon);
					 $("#jobDone").removeClass("ui-state-disabled");
				}
				
				if (from == "#jobDone") {
					$("#"+jobId).addClass("thisJobDone");
					 $("#"+jobId).append(startedIconDiv);
					 $("#"+jobId).append(line);
					 $("#"+jobId).css("opacity",".5");
				}
                if(from == "#reportProblem"){
					
				}
                if(from == "#callVendor"){
                	document.location.href = 'tel:09034861499';
                } 
                if(to == "#jobs-detail")
                {
                	
                }
         $.mobile.changePage(to, {
          transition : "none",
		  reverse : false
		  });		    		
	 };
     			
/*
 * Fix for footer when the keyboard is displayed
 */
	$(document).on('focus', 'input, textarea', function() 
	{
		$.mobile.activePage.find("div[data-role='footer']").hide();
	});
	
	$(document).on('blur', 'input, textarea', function() 
	{
		$.mobile.activePage.find("div[data-role='footer']").show();
	});
	

