$(document).ready(function () {

	var isMobile;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
		mobileActions();
	else
		defaultActions();
 
	console.log("Hello");
	$("h1").after("<p>"+employees[0].firstName+"</p>");
	console.log(employees[0].firstName);

});

function mobileActions(){
	isMobile = true;
	$('head').append('<link rel="stylesheet" type="text/css" href="mobilestylesheet.css" />');
}

function defaultActions(){
	isMobile = false;
	$('head').append('<link rel="stylesheet" type="text/css" href="stylesheet.css" />');
}