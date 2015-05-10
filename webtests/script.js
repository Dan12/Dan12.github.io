$(document).ready(function () {

	var isMobile;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
		mobileActions();
	else
		defaultActions();

});

function mobileActions(){
	isMobile = true;
	$('head').append('<link rel="stylesheet" type="text/css" href="mobilestylesheet.css" />');
	for(content in mobileData){
		$('.'+mobileData[content].superClass).append('<'+mobileData[content].tag+'>'+mobileData[content].content+'</'+mobileData[content].tag+'>');
	}
}

function defaultActions(){
	isMobile = false;
	$('head').append('<link rel="stylesheet" type="text/css" href="stylesheet.css" />');
	for(content in data){
		$('.'+data[content].superClass).append('<'+data[content].tag+' class = "'+data[content].classes+'">'+data[content].content+'</'+data[content].tag+'>');
	}
}