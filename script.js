$(document).ready(function(){
	resize();
	$(window).resize(function(){
		resize();
	});
});
function resize(){
	var h = $('.text_box').height()+640;
	$('.sidebar').css("height",h);
	if (h<document.height){
		$('.sidebar').css("height","100%");
	}
}