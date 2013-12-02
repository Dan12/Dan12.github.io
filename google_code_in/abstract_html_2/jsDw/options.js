$(document).ready(function(){
	document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option1.css');
	$(document).keypress(function (e) {
        if (e.keyCode === 49) {
        	document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option1.css');
        }
        if (e.keyCode === 50) {
        	document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option2.css');
        }
        if (e.keyCode === 51) {
        	document.getElementById('pagestyle').setAttribute('href', 'stylesheets/option3.css');
        }
	});
});