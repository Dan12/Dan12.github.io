//This image slider can be very easily manipulated to your liking. It is recomended to have images of the same dimensions.
//First, you have to make sure that all of your images are name with img and then their number and then .jpeg, 
//for example, the first image should be called "img1.jpeg", the second "img2.jpeg" and so on.
//look at the pictures that come with this file if you do not understand.
//Now, set the variable img equal to the amount of images you have
var img = 8;
//Now, set the variable img_height to the standard height of your image
var img_height = 120;
//and now set img_width to the standard width of your image
var img_width = 192;
//finally set img_scale to the amount you want to scale your image.
var img_scale = -1;
//set img_scale to 1 if you want the original dimensions and set img_scale to a number between 1 and 0 is you want to make your image smaller.
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
$(document).ready(function () {
	if (img_scale<0 || img_width<0 || img_height<0 || img<0){
		alert('The values you entered will not produce and image. Resetting unacceptable values to default values');
		if (img_scale<0){
			img_scale = 1;
		}
		if (img<0){
			img = 1;
		}
		if (img_width<0){
			img_width = 120;
		}
		if (img_height<0){
			img_height = 192;
		}
	}
	for (i = 1; i <= img; i++){
		$('.img_container_1').css('background-image','url(img'+i+'.jpeg)');	
		img_num = i;
	}
	for (i = 1; i <= img; i++){
		$('.slider_button_holder').append('<div class="slider_button slider_button_'+i+'" value="'+i+'"></div>');
	}
	$('.slider_button_holder').css({'width':48*img+'px','top':(img_height*img_scale+80)+'px','margin-left':((img_width*img_scale-48*img)/2)+'px'});
	$('.img_container').css({'width':(img_width*img_scale)+'px','height':(img_height*img_scale)+'px','background-size':(img_width*img_scale)+'px '+(img_height*img_scale)+'px'});
	$('.container').css({'width':(img_width*img_scale)+'px','height':(img_height*img_scale)+'px'})
	img_num = 1;
	$('.img_container_1').css('background-image','url(img'+img_num+'.jpeg)');	
	$('.slider_button_'+img_num+'').css('background-position','0px 10px');
	start();
	$('.slider_button_'+img_num+'').ready(function(){
		$('.slider_button').click(function(){
			if (!going) {
				clearInterval(interval1);
				img_num = parseInt($(this).attr("value"));
				new_img();
				start();
			}
		});
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