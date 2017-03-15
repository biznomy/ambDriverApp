/**
 * @author pravesh
 * Validator Js
 */

var values = null;
function clientError(id, val) {
	$(id).text(val);
	$(id).css('color', '#cb2c32');
}

/*Email Validation Method*/
function IsEmail(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

/*Number Validation Method*/
function IsNumber(number) {
	return !isNaN(parseFloat(number)) && isFinite(number);
}

/*Length Validation Method*/
function lengthCalc(value) {
	return value.length;
}

/*Validation Method*/
function arrayied(arraay) {
	for (var i = 0; i < arraay.length; i++) {
		if ($(arraay[i]).attr('type') == 'text' && $(arraay[i]).val() === '') {
			return false;
		} else if ($(arraay[i]).attr('type') == 'password' && lengthCalc($(arraay[i]).val()) < 8) {
			return false;
		} else if ($(arraay[i]).attr('type') == 'email' && !IsEmail($(arraay[i]).val())) {
			return false;
		} else if ($(arraay[i]).attr('type') == 'number' && $(arraay[i]).val() == '') {
			return false;
		} else if ($(arraay[i]).attr('type') == 'date' && $(arraay[i]).val() != '') {
			return false;
		} else if ($(arraay[i]).val() == '') {
			return false;
		}else{
			return true;
		}
	}//for end
}//function end

function validArray(arraay) {
	var valid = false;
	for (var i = 0; i < arraay.length; i++) {
		if ($(arraay[i]).val() == '') {
			valid = false;
		}else{
			valid = true;
		}
	}//for end	
	return valid;
}//function end

/**
 Recieve Id array for retrive and Return Value Array
 */
function retriveArray(arraay) {
	values = new Array();
	for (var i = 0; i < arraay.length; i++) {
		values[i] = $(arraay[i]).val();
	}//for end
	return values;
}//function end

/*
 Validation Fields
 **/
function Validation(type, value, value2){
	var Status = false;
	switch(type){
		case 'blank':
			Status = validArray(value);
			break;
		case 'email':
			Status = IsEmail(value);
			break;
		case 'password':
			Status = value.length >= 8;
			break;
		case 'match':
			Status = value === value2 ? true : false ;
			break;
		default:
			Status = value == '';
	}
	return Status;
}

function resetFields(array){
	if(array instanceof Array){
		for(var i=0; i<array.length; i++){
			$(array[i]).val('');
		}
	}else{
		$(array).val('');
	}
}

//Traverser of array object of json nested type
function arrayValue(data) {

	if ( data instanceof Array) {
		for (var i = 0; i < data.length; i++) {
			//console.log(data[i]);
		}
		return data;
	}
}

//Traverser of object of json nested type 
function objectValue(data) {
	var result_data = {};
	if ( data instanceof Object) {
		for (var key in data) {
			if (data.hasOwnProperty(key)) {

				//console.log(key + " -> " + data[key]);
				result_data[key] = data[key];
				//

				if (debug == true) {
					var key1 = result_data[key];
					//console.log(key + " : " + key1);
					//console.log(result_data);
				}

				if (data[key] instanceof Array) {
					arrayValue(data[key]);
				} else if (data[key] instanceof Object) {
					objectValue(data[key]);
				}
			}
		}
	}	
}
//Error Catcher for Server Call
function error(jqXHR, textStatus, errorThrown) {
	$('#loginDialog_title').text("Connection Error");
			$('#loginDialogMsg').text("Enable to connect server");
			$('#loginDialog').popup("open");
	        console.log(jqXHR.readyState)
}

