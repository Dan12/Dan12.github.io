﻿var corrected_words = [];
var dummy_words = ["hello", "my", "name", "is", "and", "I", "like", "nothing", "but", "bacon"];
var text_area_focus = false;

$(document).ready(function(){

	$('#textAreaId').keyup(function(){
		spell_checker();
	})
	.keydown(function(){
		spell_checker();
	})
	.keypress(function(){
		spell_checker();
	});
	$('#textAreaId').focus(function() {
		spell_checker();
		$('.spell_check_editor').css("z-index","20");
		// $('.spell_check_editor span').mouseover(function(){
		// 	if ($(this).hasClass('misspelled')){
		// 		$(this).css({'background-color':'yellow', 'cursor':'pointer'});
		// 	}
		// })
		// .mouseout(function(){
		// 	$(this).css('background-color', 'white');
		// });
	});
	$('#textAreaId').focusout(function() {
		$('.spell_check_editor').css("z-index","-10");
	});
});

function spell_checker() {
	var corrected_words_num = 0;
	var myinterval;
	var seconds = 0;
	var newtext = "";
	var this_text = "";
	var nthchild = 0;
	var word_spelled_correct = false;
	var text = $("#textAreaId").val();
	var words = text.split( /\s+/ );
	var text_back = words.join( "</span> <span>" );
	$('.spell_check_editor').html('<span>'+text_back+'</span');
	for (var x = 0; x < words.length; x++){
		spelled_correct = false;
		for (var xx = 0; xx < dummy_words.length; xx++){
			if (words[x] == dummy_words[xx] || words[x] == dummy_words[xx]+"," || words[x] == dummy_words[xx]+"." || words[x] == ""){
				spelled_correct = true;
			}
		}
		if (!spelled_correct) {
			corrected_words[corrected_words_num] = words[x];
			corrected_words_num++;
			$('.spell_check_editor span:nth-child('+(x+1)+')').addClass('misspelled');
		}
		if (spelled_correct) {
			corrected_words.splice(x,1)
		}
	}
	$('.spell_check_editor span').mouseover(function(e){
		if ($(this).hasClass('misspelled')){
			myinterval = setInterval(function(){
				seconds++;
				if (seconds > 2){
					clearInterval(myinterval);
					seconds = 0;
					var xwin = e.pageX-40;
				    var ywin = e.pageY-34;
					$('.spell_recomendations').css({'display':'inline', 'top': ywin+'px', 'left': xwin+'px', 'z-index':'30'});
					$('.spell_recomendations').html('');
					$('.spell_recomendations').append('<div class="spell_recomendations_word">'+this_text+'</div>')
					for(var z = 0; z < dummy_words.length; z++){
						$('.spell_recomendations').append('<div class="spell_recomendations_item">'+dummy_words[z]+'</div>')
					}
					$('.spell_recomendations').append('<div class="spell_recomendations_ignore">Ignore Word</div>')
					$('.spell_recomendations div:nth-child(2)').css('background-color','lightgray');
					$('.spell_recomendations div:nth-child(2)').mouseenter(function(){
						$(this).css('background-color','lightgray');
					})
					.mouseout(function(){
						$(this).css('background-color','white');
					});
					$('.spell_recomendations').mouseleave(function(){
						$('.spell_recomendations').css('display', 'none');
						$('.spell_check_editor span').css('background-color', 'white');
					});
					$('.spell_recomendations_item').click(function(){
						$('.spell_recomendations').css('display', 'none');
						newtext = $(this).html();
						var index = words.indexOf(this_text);
						words.splice(index, 1);
						words.splice(index, 0, newtext);
						text_back = words.join( "</span> <span>" );
						$('.spell_check_editor').html('<span>'+text_back+'</span');
						text_back = words.join( " " );
						$('#textAreaId').val(text_back);
						index = corrected_words.indexOf(this_text);
						corrected_words.splice(index, 1);
						$('#textAreaId').focus();
					});
					$('.spell_recomendations_ignore').click(function(){
						$('#textAreaId').focus();
						dummy_words.push(this_text);
						spell_checker();
						$('.spell_recomendations').css('display', 'none');
					});
				}
			},200);
			this_text = $(this).html();
			$(this).css({'background-color':'yellow', 'cursor':'pointer'});
		}
	})
	.mouseleave(function(){
		$('.spell_check_editor span').css('background-color', 'white');
		clearInterval(myinterval);
		seconds = 0;
	});
	//check_spelling();
}
// function check_spelling() {
// 	$('.spell_checker_uncorrected').html('');
// 	$('.spell_checker_corrected').html('');
// 	if (corrected_words.length == 0){
// 		$('.spell_checker_corrected').html('No spelling Errors');
// 	}
// 	else {
// 		var repeat = 0;
// 		var this_text = corrected_words[repeat];
// 		var text = $("#textAreaId").val();
// 		var words = text.split( /\s+/ );
// 		var index = words.indexOf(this_text);
// 		if ($('.spell_checker_box').css('display') == 'block') {
// 			$('.spell_check_editor span:nth-child('+(index+1)+')').css('background-color','yellow');
// 		}
// 		$('.spell_checker_uncorrected').html(corrected_words[repeat]);
// 		for(var z = 0; z < dummy_words.length; z++){
// 			$('.spell_checker_corrected').append('<div class="spell_recomendations_item">'+dummy_words[z]+'</div>')
// 		}
// 		$('.spell_recomendations_item').click(function(){
// 			var this_text = corrected_words[repeat];
// 			var newtext = $(this).html();
// 			var text = $("#textAreaId").val();
// 			var words = text.split( /\s+/ );
// 			var index = words.indexOf(this_text);
// 			words.splice(index, 1);
// 			words.splice(index, 0, newtext);
// 			text_back = words.join( "</span> <span>" );
// 			$('.spell_check_editor').html('<span>'+text_back+'</span');
// 			text_back = words.join( " " );
// 			$('#textAreaId').val(text_back);
// 			index = corrected_words.indexOf(this_text);
// 			corrected_words.splice(index, 1);
// 			check_spelling();
// 		});
// 	}
// 	$('.spell_checker_close').click(function(){
// 		$('.spell_checker_box').css('display','none');
// 	});
// }

	
