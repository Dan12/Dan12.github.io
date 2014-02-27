$(document).ready(function(){
	resize();
	$(window).scroll(function(){
		resize();
	})
	.resize(function(){
		resize();
	});
});
function resize(){
	var h = $('.text_box').height()+640;
	$('.sidebar').css("height",h);
	if (h<window.innerHeight){
		$('.sidebar').css("height","100%");
	}
}