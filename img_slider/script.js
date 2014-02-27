var img = 8;
var i;
var img_num;
var prim_img_cont = 1;
var sec_img_cont = 2;
var seconds = 0;
var prev_index = 1;
var interval1;
var going = false;
var effect_dur = 1600;
var transition_time = 5000;
var img_height = 120;
var img_width = 192;
var img_scale = 5;
$(document).ready(function () {
	for (i = 1; i <= img; i++){
		$('.img_container_1').css('background-image','url(img'+i+'.jpeg)');	
		img_num = i;
	}
	for (i = 1; i <= img; i++){
		$('.slider_button_holder').append('<div class="slider_button slider_button_'+i+'" value="'+i+'"></div>');
	}
	$('.slider_button_holder').css({'width':48*img+'px','top':'-'+(img_height*img_scale-8)+'px'});
	$('.img_container').css({'width':(img_width*img_scale)+'px','height':(img_height*img_scale)+'px'});
	$('.img_container_1').css('background-size',(img_width*img_scale)+'px '+(img_height*img_scale)+'px');
	$('.img_container_2').css({'background-size':(img_width*img_scale)+'px '+(img_height*img_scale)+'px','top':'-'+(img_height*img_scale+2)+'px'});
	img_num = 1;
	$('.img_container_1').css('background-image','url(img'+img_num+'.jpeg)');	
	$('.slider_button_'+img_num+'').css('background-position','0px 10px');
	start();
	$('.slider_button').click(function(){
		if (!going) {
			clearInterval(interval1);
			img_num = parseInt($(this).attr("value"));
			new_img();
			start();
		}
	});
});

function start(){
	interval1 = setInterval(function(){
		if (img_num == img){
			img_num = 1;
		}
		else {
			img_num++;
		}
		new_img();
	},transition_time);
};

function new_img(){
	$('.slider_button').css('background-position','0px 0px');
	$('.slider_button_'+img_num+'').css('background-position','0px 10px');
	$('.img_container_'+sec_img_cont+'').css({'background-image':'url(img'+img_num+'.jpeg)'});
	going = true;
	$('.img_container_'+prim_img_cont+'').animate({opacity: 1/effect_dur},effect_dur,"linear",function(){
		$('.img_container_'+prim_img_cont+'').css({'z-index':'-10','opacity':'1'});
		$('.img_container_'+sec_img_cont+'').css({'z-index':'10','opacity':'1'});
		var img_cont_holder = prim_img_cont;
		prim_img_cont = sec_img_cont;
		sec_img_cont = img_cont_holder;
		going = false;
	});
}