
//local
var user = null;
var result_signin = {};
var debug = false;
var ids = null;

function logIn(arraay){
	sign_in_service(arraay);
}

function sign_in_service(arraay) {
	ids = arraay;
	
	var a = Validation("blank", arraay);
	var b = Validation("email", $(arraay[0]).val()); 
	var c = Validation("password", $(arraay[1]).val());
	if(a && b && c){
		var x = retriveArray(arraay);
		user = new User(x[0], x[1]);		
	}else{
		new $.Zebra_Dialog('Enter Correct Email & Password !', {
			    'custom_class':  'myclass',
			    'title': 'Validation Error'
        });	
		return;
	}
	
	if(mode == 0){
		
			localStorage.setItem("driver_email", user.email);
			localStorage.setItem("driver_password", user.password);
			//console.log(user_email+" and "+user_password);
			//console.log(user.email +" and "+ user.password);
			resetFields(ids);
	      	 setTimeout(function() {
				$.mobile.changePage("#jobs", {transition: "none",reverse: false, changeHash: true});
			    }, 0);

	}else{		
		signinCall();
	}	
}

function User(email, password) {
	this.email = email;
	this.password = password;
}

function signinCall() {
	
	if (window.XDomainRequest)//for IE8,IE9
		contentType = "text/plain";
	var url_link2 = url_link+'/driver/v1/signin.json';	
	console.log(url_link2);
	$.ajax({
		url : url_link2,
		type : 'POST',
		data : user,
		success : function(data) {
			successDriver(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			error(jqXHR, textStatus, errorThrown);
		}
	});
}

function successDriver(data) {
	if (data.hasOwnProperty('code')) {
		if (data['code'] == 0) {
			console.log(data);
			localStorage.setItem("driver_authentication_token", data.auth_token);
			  setTimeout(function() {
			  	resetFields(ids);
				$.mobile.changePage("#jobs", {transition: "none",reverse: false, changeHash: true});
			    }, 0);
		    
		} else if (data['code'] == 1) {
			new $.Zebra_Dialog(data.messages +'!', {
			    'custom_class':  'myclass',
			    'title': 'Login Error'
        });	
		}

	}
	
}