var img = 4;
var i;
var img_num;
var prim_img_cont = 1;
var sec_img_cont = 2;
var seconds = 0;
var prev_index = 1;
$(document).ready(function () {
	for (i = 1; i <= img; i++){
		$('.img_container_1').css('background-image','url(img'+i+'.jpeg)');	
		img_num = i;
	}
	for (i = 1; i <= img; i++){
		$('.slider_button_holder').append('<div class="slider_button slider_button_'+i+'"></div>');
	}
	img_num = 1;
	$('.img_container_1').css('background-image','url(img'+img_num+'.jpeg)');	
	$('.slider_button_'+img_num+'').css('background-position','0px 10px');
	var interval1 = setInterval(function(){
		if (img_num == 4){
			img_num = 1;
		}
		else {
			img_num++;
		}
		$('.slider_button').css('background-position','0px 0px');
		$('.slider_button_'+img_num+'').css('background-position','0px 10px');
		//$('.img_container_'+prim_img_cont+'').css({'background-image':'url(img'+img_num+'.jpeg)'});
		$('.img_container_'+sec_img_cont+'').css({'background-image':'url(img'+img_num+'.jpeg)'});
		var interval2 = setInterval(function(){
			seconds++;
			var opac = seconds/500;
			$('.img_container_'+prim_img_cont+'').css('opacity',1-opac);
			$('.img_container_'+sec_img_cont+'').css('opacity',opac);
			if (seconds >= 490) {
				clearInterval(interval2);
				seconds = 0;
				$('.img_container_'+prim_img_cont+'').css({'opacity':'0','z-index':'-10'});
				$('.img_container_'+sec_img_cont+'').css({'opacity':'1','z-index':'10'});
				var img_cont_holder = prim_img_cont;
				prim_img_cont = sec_img_cont;
				sec_img_cont = img_cont_holder;
			}
		},1);
	},5000);
});