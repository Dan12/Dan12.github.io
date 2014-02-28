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
var img_scale = 3;
//set img_scale to 1 if you want the original dimensions and set img_scale to a number between 1 and 0 is you want to make your image smaller.
//you can also change the effect duration (effect_dur) and the time between each image is displayed (transition_time). 
//Warning, will not work if effect_dur is greater that 100 millisecods less than transition_time.
//Times are in milliseconds 1 second = 1000 milliseconds
var effect_dur = 1600;
var transition_time = 5000;
var i;
var img_num;
var prim_img_cont = 1;
var sec_img_cont = 2;
var seconds = 0;
var prev_index = 1;
var interval1;
var going = false;
$(document).ready(function () {
	$('.container').css({'background':'white url("ajax-loader.gif")','background-position':'center','z-index':'20','width':(img_width*img_scale)+'px','height':(img_height*img_scale)+'px','background-repeat':'no-repeat'});
	if (img_scale<0 || img_width<0 || img_height<0 || img<0 || effect_dur > transition_time-100){
		alert('The values you entered will not produce and image or will not effectivley transition. Resetting unacceptable values to default values');
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
		if (effect_dur>transition_time-100){
			effect_dur = 1600;
			transition_time = 5000;
		}
	}
	for (i = 1; i <= img; i++){
		img_num = i;
		$('.container').append('<div class="img_container_'+img_num+' img_container"></div>');
		$('.img_container_'+img_num).css({'background-image':'url(img'+img_num+'.jpeg)','z-index':'-10'});
	}
	$('.img_container_1').css('z-index','10');
	for (i = 1; i <= img; i++){
		$('.slider_button_holder').append('<div class="slider_button slider_button_'+i+'" value="'+i+'"></div>');
	}
	$('.slider_button_holder').css({'width':48*img+'px','top':(img_height*img_scale+80)+'px','margin-left':((img_width*img_scale-48*img)/2)+'px'});
	$('.img_container').css({'width':(img_width*img_scale)+'px','height':(img_height*img_scale)+'px','background-size':(img_width*img_scale)+'px '+(img_height*img_scale)+'px'});
	img_num = 1;	
	$('.slider_button_'+img_num+'').css('background-position','0px 10px');
	$('.img_container_'+img).ready(function(){
		$('.container').css({'z-index':'-1','background':'rgba(0,0,0,0)'});
		start();
	});
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
	going = true;
	sec_img_cont = img_num;
	$('.img_container_'+sec_img_cont).css('z-index','5');
	$('.img_container_'+prim_img_cont+'').animate({opacity: 1/effect_dur},effect_dur,"linear",function(){
		$('.img_container_'+prim_img_cont+'').css({'z-index':'-10','opacity':'1'});
		$('.img_container_'+sec_img_cont+'').css({'z-index':'10','opacity':'1'});
		prim_img_cont = sec_img_cont;
		going = false;
	});
}