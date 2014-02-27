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
	alert(h+" "+$('body').height);
	if (h<$('body').height()){
		$('.sidebar').css("height","100%");
		alert("larger");
	}
}