$(document).ready(function(){
	$( "#wrap" ).after( '<div class="option_select"><p class="option option1">Option 1</p><p class="option option2">Option 2</p><p class="option option3">Option 3</p></div>' );
	$('.option').css({"margin":"2px 6px", "border":"solid gray 2px", "width":"100px", "text-align":"center","padding":"4px 10px", "background-color":"rgb(180,180,180)", "cursor":"pointer", "display":"inline"});
	$('.option_select').css({"position":"absolute","top":"30px", "left":"300px"});
	$('.option1').css('background-color', 'rgb(230,230,230)');
	document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option1.css');
	$('.option1').click(function(){
		document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option1.css');
		$('.option1').css('background-color', 'rgb(230,230,230)');
		$('.option2').css('background-color', 'rgb(180,180,180)');
		$('.option3').css('background-color', 'rgb(180,180,180)');
	});
	$('.option2').click(function(){
		document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option2.css');
		$('.option2').css('background-color', 'rgb(230,230,230)');
		$('.option1').css('background-color', 'rgb(180,180,180)');
		$('.option3').css('background-color', 'rgb(180,180,180)');
	});
	$('.option3').click(function(){
		document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option3.css');
		$('.option3').css('background-color', 'rgb(230,230,230)');
		$('.option1').css('background-color', 'rgb(180,180,180)');
		$('.option2').css('background-color', 'rgb(180,180,180)');
	});
});