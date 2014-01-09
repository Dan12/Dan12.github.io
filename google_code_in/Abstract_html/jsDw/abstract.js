var edit_window = "";
$(document).ready(function(){
	$('.edit_interface_button').click(function(){
		$('.finish_interface_button').css("display","block");
		$(this).after('<p class="edit_window_func edit_interface_object parent_object">Edit Window</p>');
		$(this).after('<p class="text_font edit_interface_object parent_object">Font</p>');
		$(this).after('<p class="text_color_choice edit_interface_object parent_object">Text Color</p>');
		$(this).after('<p class="text_background_color_choice edit_interface_object parent_object">Text Background Color</p>');
		$(this).after('<p class="textbox_color_choice edit_interface_object parent_object">Input Text Color</p>');
		$(this).after('<p class="textbox_background_color_choice edit_interface_object parent_object">Input Background Color</p>');
		$(this).after('<p class="button_color_choice edit_interface_object parent_object">Button Text Color</p>');
		$(this).after('<p class="button_background_color_choice edit_interface_object parent_object">Button Background Color</p>');
		$(this).after('<p class="background_color_choice edit_interface_object parent_object">Background Color</p>');
		$('.edit_interface_button').css("display","none");
		$('.background_color_choice').click(function(){
		    $('.child_object').remove();
			$(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
			$(this).after('<p class="edit_interface_object blue child_object">Blue</p>');
			$(this).after('<p class="edit_interface_object green child_object">Green</p>');
			$(this).after('<p class="edit_interface_object cyan child_object">Cyan</p>');
			$(this).after('<p class="edit_interface_object white child_object">White</p>');
			$(this).after('<p class="edit_interface_object pale_green child_object">Pale Green</p>');
			$('.cyan').click(function(){
		    	$('body, #dropDown').css("background-color","rgb(173,234,218)");
			});
		    $('.green').click(function(){
		   		$('body, #dropDown').css("background-color","rgb(120,200,120)");
			});
		    $('.blue').click(function(){
		    	$('body, #dropDown').css("background-color","rgb(80,80,220)");
			});
			$('.white').click(function(){
		    	$('body, #dropDown').css("background-color","white");
			});
			$('.pale_green').click(function(){
		    	$('body, #dropDown').css("background-color","rgb(210,234,220)");
			});
		    $('.custom').click(function(){
		    	var r=prompt("Enter r value", "0");   
		    	r=parseInt(r);
		        var g=prompt("Enter g value", "0");   
		    	g=parseInt(g);
		        var b=prompt("Enter b value", "0");  
		    	b=parseInt(b);
		    	$('body, #dropDown').css("background-color","rgb("+r+","+g+","+b+")");
			});
		});
		$('.text_color_choice').click(function(){
		    $('.child_object').remove();
		    $(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
		    $(this).after('<p class="edit_interface_object dark_gray child_object">Dark Gray</p>');
		    $(this).after('<p class="edit_interface_object white child_object">White</p>');
		    $(this).after('<p class="edit_interface_object blue child_object">Blue</p>');
		    $(this).after('<p class="edit_interface_object black child_object">Black</p>');
		    $(this).after('<p class="edit_interface_object dark_red child_object">Dark Red</p>');
		    $('.black').click(function(){
		    	$('.itemSelect,#swapLanguages').css("color","black");
			});
		    $('.dark_red').click(function(){
		    	$('.itemSelect,#swapLanguages').css("color","rgb(216,58,49)");
			});
		    $('.dark_gray').click(function(){
			    $('.itemSelect,#swapLanguages').css("color","rgb(66,66,66)");
			});
		    $('.blue').click(function(){
			    $('.itemSelect,#swapLanguages').css("color","rgb(50,50,200)");
			});
		    $('.white').click(function(){
			    $('.itemSelect,#swapLanguages').css("color","white");
			});
		    $('.custom').click(function(){
			    var r=prompt("Enter r value", "0");   
			    r=parseInt(r);
		        var g=prompt("Enter g value", "0");   
		    	g=parseInt(g);
		        var b=prompt("Enter b value", "0");   
			    b=parseInt(b);
			    $('.itemSelect,#swapLanguages').css("color","rgb("+r+","+g+","+b+")");
			});
		});
		$('.text_background_color_choice').click(function(){
		    $('.child_object').remove();
		    $(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
		    $(this).after('<p class="edit_interface_object light_gray child_object">Light Gray</p>');
		    $(this).after('<p class="edit_interface_object white child_object">White</p>');
		    $(this).after('<p class="edit_interface_object pale_blue child_object">Pale Blue</p>');
		    $(this).after('<p class="edit_interface_object black child_object">Black</p>');
		    $(this).after('<p class="edit_interface_object orange child_object">Orange</p>');
		    $('.black').click(function(){
			    $('.itemSelect,#swapLanguages').css("background","black");
			});
		    $('.orange').click(function(){
			    $('.itemSelect,#swapLanguages').css("background","rgb(255,110,0)");
			});
		    $('.light_gray').click(function(){
			    $('.itemSelect,#swapLanguages').css("background","rgb(235,235,235)");
			});
		    $('.pale_blue').click(function(){
			    $('.itemSelect,#swapLanguages').css("background","rgb(150,210,230)");
			});
		    $('.white').click(function(){
			    $('.itemSelect,#swapLanguages').css("background","white");
			});
		    $('.custom').click(function(){
			    var r=prompt("Enter r value", "0")   
			    r=parseInt(r);
		        var g=prompt("Enter g value", "0")   
		    	g=parseInt(g);
		        var b=prompt("Enter b value", "0")   
			    b=parseInt(b);
			    $('.itemSelect,#swapLanguages').css("background-color","rgb("+r+","+g+","+b+")");
			});
		});
		$('.textbox_color_choice').click(function(){
		    $('.child_object').remove();
		    $(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
		    $(this).after('<p class="edit_interface_object dark_gray child_object">Dark Gray</p>');
		    $(this).after('<p class="edit_interface_object white child_object">White</p>');
		    $(this).after('<p class="edit_interface_object blue child_object">Blue</p>');
		    $(this).after('<p class="edit_interface_object black child_object">Black</p>');
		    $(this).after('<p class="edit_interface_object dark_red child_object">Dark Red</p>');
		    $('.black').click(function(){
		    	$('#textAreaId').css("color","black");
			});
		    $('.dark_red').click(function(){
		    	$('#textAreaId').css("color","rgb(216,58,49)");
			});
		    $('.dark_gray').click(function(){
			    $('#textAreaId').css("color","rgb(66,66,66)");
			});
		    $('.blue').click(function(){
			    $('#textAreaId').css("color","rgb(50,50,200)");
			});
		    $('.white').click(function(){
			    $('#textAreaId').css("color","white");
			});
		    $('.custom').click(function(){
			    var r=prompt("Enter r value", "0")   
			    r=parseInt(r);
		        var g=prompt("Enter g value", "0")   
		    	g=parseInt(g);
		        var b=prompt("Enter b value", "0")   
			    b=parseInt(b);
			    $('#textAreaId').css("color","rgb("+r+","+g+","+b+")");
			});
		});
		$('.textbox_background_color_choice').click(function(){
		    $('.child_object').remove();
		    $(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
		    $(this).after('<p class="edit_interface_object light_gray child_object">Light Gray</p>');
		    $(this).after('<p class="edit_interface_object white child_object">White</p>');
		    $(this).after('<p class="edit_interface_object pale_blue child_object">Pale Blue</p>');
		    $(this).after('<p class="edit_interface_object black child_object">Black</p>');
		    $(this).after('<p class="edit_interface_object orange child_object">Orange</p>');
		    $('.black').click(function(){
			    $('#textAreaId,#translationTest').css("background","black");
			});
		    $('.orange').click(function(){
			    $('#textAreaId,#translationTest').css("background","rgb(255,110,0)");
			});
		    $('.light_gray').click(function(){
			    $('#textAreaId,#translationTest').css("background","rgb(235,235,235)");
			});
		    $('.pale_blue').click(function(){
			    $('#textAreaId,#translationTest').css("background","rgb(150,210,230)");
			});
		    $('.white').click(function(){
			    $('#textAreaId,#translationTest').css("background","white");
			});
		    $('.custom').click(function(){
			    var r=prompt("Enter r value", "0")   
			    r=parseInt(r);
		        var g=prompt("Enter g value", "0")   
		    	g=parseInt(g);
		        var b=prompt("Enter b value", "0")   
			    b=parseInt(b);
			    $('#textAreaId,#translationTest').css("background-color","rgb("+r+","+g+","+b+")");
			});
		});
		$('.button_background_color_choice').click(function(){
			$('.child_object').remove();
		    $(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
		    $(this).after('<p class="edit_interface_object orange child_object">Orange</p>');
		    $(this).after('<p class="edit_interface_object dark_blue child_object">Dark Blue</p>');
		    $(this).after('<p class="edit_interface_object yellow child_object">Yellow</p>');
		    $(this).after('<p class="edit_interface_object dark_gray child_object">Dark Gray</p>');
		    $(this).after('<p class="edit_interface_object dark_red child_object">Dark Red</p>');
		    $('.orange').click(function(){
			    $('.btn-warning').css("background-color","rgb(250, 167, 50)");
			    $('.btn-warning').css("background-image","linear-gradient(rgb(251, 180, 80), rgb(248, 148, 6))");
			    $('.btn-warning').css("background-repeat","repeat-x");
			});
			$('.dark_blue').click(function(){
			    $('.btn-warning').css("background","rgb(24,68,130)");
			});
			$('.yellow').click(function(){
			    $('.btn-warning').css("background","rgb(241,176,0)");
			});
			$('.dark_gray').click(function(){
			    $('.btn-warning').css("background","rgb(100,96,104)");
			});
			$('.dark_red').click(function(){
			    $('.btn-warning').css("background","rgb(138,22,30)");
			});
		});
		$('.button_color_choice').click(function(){
			$('.child_object').remove();
		    $(this).after('<p class="edit_interface_object custom child_object">Custom RGB</p>');
		    $(this).after('<p class="edit_interface_object white child_object">white</p>');
		    $(this).after('<p class="edit_interface_object lime child_object">Lime</p>');
		    $(this).after('<p class="edit_interface_object red child_object">Red</p>');
		    $(this).after('<p class="edit_interface_object black child_object">Black</p>');
		    $(this).after('<p class="edit_interface_object blue child_object">Blue</p>');
		    $('.white').click(function(){
			    $('.btn-warning').css("color","white");
			});
			$('.lime').click(function(){
			    $('.btn-warning').css("color","rgb(0,255,80)");
			});
			$('.red').click(function(){
			    $('.btn-warning').css("color","rgb(192,1,42)");
			});
			$('.black').click(function(){
			    $('.btn-warning').css("color","black");
			});
			$('.blue').click(function(){
			    $('.btn-warning').css("color","rgb(101,132,246)");
			});
		});
		$('.edit_window_func').click(function () {
			$('.child_object').remove();
		    $(this).after('<p class="child_object edit_interface_object mouse_edit_window">Place With Mouse</p>');
		    $(this).after('<p class="child_object edit_interface_object original_placement">Original Place</p>')
		    $(this).after('<p class="child_object edit_interface_object manual_placement">Place Manually</p>')
		    $('.mouse_edit_window').click(function(){
		    	$('.window_edit_info').css("display","block");
		    	$('.window_edit_info').css("left", "250px");
		    	$('.window_edit_info').css("top", "50px");
		    	$('.app_container').css("border","solid black 2px");
		    	edit_window = setInterval(function () {
		        	window_move_check();
		    	}, 10);
			});
		    $('.original_placement').click(function(){
		    $('.app_container').css("left", "250px");
		    $('.app_container').css("top", "50px");
			});
			$('.manual_placement').click(function(){
				var xpos=prompt("X position","50")
				var ypos=prompt("Y position", "250")
				$('.app_container').css("left", "" + ypos + "px");
				$('.app_container').css("top", "" + xpos + "px");
			});
		});
		$('body').dblclick(function () {
		    clearInterval(edit_window);
		    $('.app_container').css("border","none");
		    $('.window_edit_info').css("display","none");
		});
		function window_move_check() {
		    $('body').mousemove(function (e) {
		        x = e.pageX;
		        y = e.pageY;
		    });
		    $('.window_edit_info').css("left","" + x + "px");
		    $('.window_edit_info').css("top","" + y + "px");
		    $('.app_container').css("left", "" + x + "px");
		    $('.app_container').css("top", "" + y + "px");
		}
		$('.text_font').click(function(){
			$(this).after('<p class="child_object edit_interface_object assassin_font">Assassin</p>');
			$(this).after('<p class="child_object edit_interface_object averia_font">Averia</p>');
			$(this).after('<p class="child_object edit_interface_object harabara_font">Harabara</p>');
			$(this).after('<p class="child_object edit_interface_object optimus_font">Optimus</p>');
			$(this).after('<p class="child_object edit_interface_object timeless_font">Timeless</p>');
			$(this).after('<p class="child_object edit_interface_object modern_font">Modern</p>');
			$(this).after('<p class="child_object edit_interface_object original_font">Original</p>');
			$('.original_font').click(function(){
				$('#textAreaId').css('font-family','arial');
				$('#dropDown').css('font-family','Arial, sans-serif');
				$('.btn-warning').css('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif');
				$('#wrap').css('font-family','Georgia,"Times New Roman",Times,serif');
			});
			$('.assassin_font').click(function(){
				$('#dropDown, #textAreaId, .btn-warning, #wrap').css('font-family','Assassin');
			});
			$('.averia_font').click(function(){
				$('#dropDown, #textAreaId, .btn-warning, #wrap').css('font-family','Averia');
			});
			$('.harabara_font').click(function(){
				$('#dropDown, #textAreaId, .btn-warning, #wrap').css('font-family','Harabara');
			});
			$('.optimus_font').click(function(){
				$('#dropDown, #textAreaId, .btn-warning, #wrap').css('font-family','Optimus');
			});
			$('.timeless_font').click(function(){
				$('#dropDown, #textAreaId, .btn-warning, #wrap').css('font-family','Timeless');
			});
			$('.modern_font').click(function(){
				$('#dropDown, #textAreaId, .btn-warning, #wrap').css('font-family','Modern');
			});
		});
	});
	$('.finish_interface_button').click(function(){
		$('.parent_object,.child_object').remove();
		$('.finish_interface_button').css("display","none");
		$('.edit_interface_button').css("display","block");
	});
});