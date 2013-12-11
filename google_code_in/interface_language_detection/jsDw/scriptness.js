var pairs = new Array();
var curr_pair = new Object();
var srcLangs = new Array();
var dstLangs = new Array();
var grayedOuts = new Array();
var isDetecting = false;
var toLangCode = "";
var fromLangCode = "";
var winW = 800;
var mobile = false;

var probabilities_lang_code = [];
var probabilities = [];
var ordered_probs = [];
var highest = 0;
var sec_highest_lang_code = "";
var thr_highest_lang_code = "";
var highest_index = 0;
var highest_lang_code = "";
var from_drop_down = false;

var drop_down_show = false;
var drop_down_click = false;

var abbreviations = {
	'Spanish':'es',
	'Catalan':'ca',
	'Catalan (Valencian)':'ca_valencia',
	'Galician':'gl',
	'Portuguese':'pt',
	'Brazilian Portuguese':'pt_BR',
	'Occitan':'oc',
	'Aranese':'oc_aran',
	'English':'en',
	'French':'fr',
	'Esperanto':'eo',
	'Romanian':'ro',
	'Welsh':'cy',
	'Basque':'eu',
	'Breton':'br',
	'Norwegian Bokmål':'nb',
	'Norwegian Nynorsk':'nn',
	'Swedish':'sv',
	'Danish':'da',
	'Asturian':'ast',
	'Icelandic':'is',
	'Macedonian':'mk',
	'Bulgarian':'bg',
	'Italian':'it',
	'Tatar':'tat',
	'Kazakh':'kaz'
}

$(document).ready(function(){
	curr_pair.srcLang="";
	curr_pair.dstLang="";
	
	$("#textAreaId").keyup(function(event) {
		if(event.keyCode==32 || event.keyCode==190 || event.keyCode==191 || event.keyCode==49 || event.keyCode==59 || event.keyCode==13){
			try{
				if(curr_pair.srcLang.indexOf("Detect") !=-1){		
					isDetecting = true;
			}
			
			if(isDetecting){
				curr_pair.srcLang = detectLanguage($(this).val());
				curr_pair.srcLang = abbreviations[curr_pair.srcLang];
				$('#selectFrom em').html(curr_pair.srcLang);
			}
				
			
			}catch(e){
				console.log(e.message);
			}
			
			
			translate(curr_pair,$('#textAreaId').val());
			
			//$(this).val($(this).val()+' ');
			
			//alert(detectLanguage($(this).val()));
			
			return false;
		}
		/*
		if(event.keyCode==13){
			
			try{
				if(curr_pair.srcLang.indexOf("Detect") !=-1){
					curr_pair.srcLang = detectLanguage($(this).val());
					
					curr_pair.srcLang = abbreviations[curr_pair.srcLang];
			
					$('#selectFrom em').html(curr_pair.srcLang);
					
			}
				
			
			}catch(e){
				console.log(e.message);
			}
		
			translate(curr_pair,$('#textAreaId').val());
			//$(this).val($(this).val()+'\n'); ;
			
			return false;
		}
		//alert(event.keyCode);
		*/
	});

		$(document).click(function(){
			$('#dropDownSub').hide();
			drop_down_show = false;
		});

	jQuery("#inputBox").submit(function(){
		try{
			try{
				if(curr_pair.srcLang.indexOf("Detect") !=-1){
					curr_pair.srcLang = detectLanguage($(this).val());
					curr_pair.srcLang = abbreviations[curr_pair.srcLang];
					$('#selectFrom em').html(curr_pair.srcLang);
				}	
			}catch(e){
				console.log(e.message);
			}
		
			translate(curr_pair,$('#textAreaId').val());
			return false;
		}catch(e){
			console.log(e.message);
		}
	});
    

	$('#dropDownSub').hide();
	
	var FromOrTo;
	
	$('#swapLanguages').click(function(){
		fromText = $('#selectFrom em').text();
		toText = $('#selectTo em').text();
		$('#selectTo em').html(fromText);
		$('#selectFrom em').html(toText);
		
		curr_pair.dstLang = fromText;
		curr_pair.srcLang = toText;
		
		var langHolder = "";
		langHolder = toLangCode;
		toLangCode = fromLangCode;
		fromLangCode = langHolder;
		
	});
/*
	$('.itemSelect').toggle(function(){
		if($(this).attr("id")=="selectFrom"){
			FromOrTo="from";
			$('#dropDownSub').hide();
			$('#dropDownSub').css('margin-left',00);
			
		} else {
			FromOrTo = "to";
			$('#dropDownSub').hide();
			$('#dropDownSub').css('margin-left',287);
		}
			$('#dropDownSub').show();
		
	}, function(){
		$('#dropDownSub').hide()	
	});
*/	
	/*
	$('#dropDownSub a').click(function(){
		
		
		$('#dropDownSub a').removeClass('language-selected');
		$(this).addClass('language-selected');
		
		if(FromOrTo=="from"){	
			$('#selectFrom em').html($(this).text());
			curr_pair.srcLang = $(this).text();
			
		} else {
			$('#selectTo em').html($(this).text());
			curr_pair.dstLang = $(this).text();
		}
		matchFound= false
			
		for(var it in window.pairs){	
			if(parsePair(curr_pair)==window.pairs[it])
				matchFound=true;
		}
		if(matchFound)
			jQuery('#translationTest').html("Translation will be displayed here!");
		else jQuery('#translationTest').html("Translation not yet available!");
		
	
	});
	*/
	
	
	jQuery('#selectTo').click(function(){
		loler = curr_pair.srcLang + "|";
		aaa=0;
		for(it in window.pairs){
			//console.log(window.pairs, window.pairs[it], loler, window.pairs[it].indexOf(loler));
			if(window.pairs[it].indexOf(loler) != -1){
				//grayedOuts[aaa] = window.pairs[it].substr(-3,3);
				grayedOuts[aaa] = window.pairs[it].split('|')[1];
				//console.log(grayedOuts[aaa]);
				aaa++;
			}	
		}
	});
	
	getPairs();

	$('.itemSelect').click(function(e){
		e.stopPropagation();
		if( navigator.userAgent.match(/Android/i)
 			|| navigator.userAgent.match(/webOS/i)
 			|| navigator.userAgent.match(/iPhone/i)
 			|| navigator.userAgent.match(/iPad/i)
 			|| navigator.userAgent.match(/iPod/i)
 			|| navigator.userAgent.match(/BlackBerry/i)
 			|| navigator.userAgent.match(/Windows Phone/i)
 		){
 			mobile = true;
		}
		jQuery('.column-group').removeClass('language-selected');
		
		if($(this).attr("id")=="selectFrom"){
			populateTranslationList("#column-group-", srcLangs);
			
			FromOrTo="from";
			from_drop_down = true;
			$('#dropDownSub').hide();
			$('#dropDownSub').addClass('selectFromSub');
			$('#dropDownSub').css('left','0');
		

		} else {
			from_drop_down = false;
		$( window ).resize(function() {
		winW = window.innerWidth;
		if (FromOrTo == "to"){
			if (winW <= 750 || mobile) {
				$('#dropDownSub').css('left', '0');
			}
			if (winW > 750 && !mobile) {
				$('#dropDownSub').css('left', '366px');
			}
		}
		});
		
		populateTranslationList("#column-group-", dstLangs);
			winW = window.innerWidth;

			FromOrTo = "to";
			$('#dropDownSub').hide();
			if (winW>750 && !mobile){
				$('#dropDownSub').css('left','366px');
			}else {
				$('#dropDownSub').css('left', '0');
			}
			
			$('#dropDownSub').removeClass('selectFromSub');
			//find_smth(curr_pair.srcLang);
			//$('#dropDownSub a').addClass('language-selected');
		}

		drop_down_click = false;

		if (!drop_down_click && !drop_down_show) {
			$('#dropDownSub').show();
			drop_down_click = true;
			drop_down_show = true;
		}
		if (!drop_down_click && drop_down_show) {
			$('#dropDownSub').hide();
			drop_down_click = true;
			drop_down_show = false;
		}
			
	$('#dropDownSub a').click(function(){
			$('#dropDownSub a').removeClass('language-selected');
			if (FromOrTo == "from"){
				$('#dropDownSub a').removeClass('current-language-selected-from');
				fromLangCode = $(this).text();
			}
			if (FromOrTo == "to"){
				$('#dropDownSub a').removeClass('current-language-selected-to');
				toLangCode = $(this).text();
			}
			
			if(FromOrTo=="from"){	
				
				if($(this).text()!=" Detect Language "){
					isDetecting = false;
					sec_highest_lang_code = "";
					thr_highest_lang_code = "";
					highest_lang_code = "";
				}
			
				if($(this).text() !=" Detect Language "){
				$('#selectFrom em').html($(this).text());
				}else{
				$('#selectFrom em').html("Detect");	
				}
				curr_pair.srcLang = $(this).text();

				if($(this).text()== " Detect Language ") {
					detect_lang_interface();
				}
				
			} else {
				if($(this).text() !=" Detect Language "){
				$('#selectTo em').html($(this).text());
				}else{
				$('#selectTo em').html("Detect");	
				}
				curr_pair.dstLang = $(this).text();
			}
			matchFound= false;
		
			//FIXME: if (curr_pair in window.pairs) ??
			for(var it in window.pairs){	
				if(parsePair_lol(curr_pair)==window.pairs[it])
					matchFound=true;
			}
			
			
			if(matchFound){
			
				try{
					if(curr_pair.srcLang.indexOf("Detect") !=-1){
						curr_pair.srcLang = detectLanguage($(this).val());
						
						curr_pair.srcLang = abbreviations[curr_pair.srcLang];
				
						$('#selectFrom em').html(curr_pair.srcLang);
						
				}
					
				
				}catch(e){
					console.log(e.message);
				}
				
				translate(curr_pair,$('#textAreaId').val());
			}
			else jQuery('#translationTest').html("Translation not yet available!");
			
			$('#dropDownSub').hide();
			drop_down_show = false;
			
		});
	});
	
});





function getLangByCode(code) {
	language = code
	//FIXME: currently not able to parse abbreviations
	for (abbv in abbreviations) {
		if (abbv==code) {
			language = abbreviations[abbv];
		}
	}
	return language;
}

function translate(langPair, text){

	langpairer = $.trim(langPair.srcLang) +"|" + $.trim(langPair.dstLang);
	//alert(langpairer);

	jQuery.ajax({
		url:'http://api.apertium.org/json/translate',
		type:"GET",
		data:{
			'langpair':langpairer,
			'q':text,
		},
		success : smth,
		dataType: 'jsonp',
		failure : trad_ko
	});
        
}

function smth(dt){
	if(dt.responseStatus==200) {
		jQuery('#translationTest').html(dt.responseData.translatedText);
	} else {
		trad_ko();
    }
}

function getPairs(){
	
	
	jQuery.ajax({
			url:'http://api.apertium.org/json/listPairs',
			type:"GET",
			success : trad_ok,
			dataType: 'jsonp',
			failure : trad_ko
		});
        
}


function trad_ko() {
	jQuery('#translationTest').html("Translation not yet available!");
}

function trad_ok(dt) {

	if(dt.responseStatus==200) {
		
		jQuery('#translationTest').html(" ");
		all = dt.responseData;

		
		for(var i in all) {
				l = all[i].sourceLanguage+'|'+all[i].targetLanguage;
				window.pairs[i]=l;
				srcLangs[i] = all[i].sourceLanguage;		
				srcLangs = jQuery.unique(srcLangs);
				
				dstLangs[i] = all[i].targetLanguage;
				dstLangs = jQuery.unique(dstLangs);
				
			//jQuery('#translationTest').append(l+'\n');
		}
		
		populateTranslationList("#column-group-", srcLangs);
		
	}else {
		trad_ko();
	}
}


function parsePair(pr){
	parsedPair = null;	
	pr.srcLang = jQuery.trim(pr.srcLang);
	pr.dstLang = jQuery.trim(pr.dstLang);
		
		if(pr.srcLang=="English")
			parsedPair = "en";
		else if(pr.srcLang=="Spanish")
			parsedPair = "es";
		else if(pr.srcLang=="Portuguese")
			parsedPair = "pt";
		else if(pr.srcLang=="Catalan")
			parsedPair = "ca";
		else if(pr.srcLang=="French")
			parsedPair = "fr";
		
		if(pr.dstLang=="Catalan")
			parsedPair += "|ca";
		else if(pr.dstLang=="English")
			parsedPair += "|en";
		else if(pr.dstLang=="Spanish")
			parsedPair += "|es";
		else if(pr.dstLang=="French")
			parsedPair += "|fr";
		else if(pr.dstLang=="Portuguese")
			parsedPair += "|pt";
		
	return parsedPair;
		
}

function populateTranslationList(elementClass, langArr){
	
	jQuery(".column-group").html("");
	jQuery("#column-group-1").append("<span> <a href='#' class='language-selected' > Detect Language </a></span>");
		
	column_num=1;
	//console.log(langArr);
	for(it in langArr){
		var compareLang = " "+getLangByCode(langArr[it])+" ";
		
		if (toLangCode == compareLang) {
			jQuery(elementClass+column_num).append("<span> <a href='#' class='current-language-selected-to' > " + getLangByCode(langArr[it]) + " </a></span>");
		}
		if (fromLangCode == compareLang) {
			jQuery(elementClass+column_num).append("<span> <a href='#' class='current-language-selected-from' > " + getLangByCode(langArr[it]) + " </a></span>");
		}
		if (fromLangCode != compareLang && toLangCode != compareLang) {
			jQuery(elementClass+column_num).append("<span> <a href='#' class='language-selected' > " + getLangByCode(langArr[it]) + " </a></span>");
		}
		
		
		if(jQuery(elementClass+column_num).children().length>5){
			column_num++;
		}
		
	}

		if (from_drop_down){
			if (isDetecting){
				$('#dropDownSub a').addClass('detecting_improbable');
			}
			$( "#dropDownSub span a:contains('"+highest_lang_code+"')" ).addClass("detect_choice detect_choice_1");
			$( "#dropDownSub span a:contains('"+sec_highest_lang_code+"')" ).addClass("detect_choice detect_choice_2");
			$( "#dropDownSub span a:contains('"+thr_highest_lang_code+"')" ).addClass("detect_choice detect_choice_3");
		}
	
		for(it in grayedOuts) {
			$("a:contains( " +grayedOuts[it]+" )").removeClass('language-selected');
			$("a:contains( " +grayedOuts[it]+" )").addClass('not_grayed_out');
		}

	
	
	
	
	// $('.itemSelect').click(function(){
	// 	if( navigator.userAgent.match(/Android/i)
 // 			|| navigator.userAgent.match(/webOS/i)
 // 			|| navigator.userAgent.match(/iPhone/i)
 // 			|| navigator.userAgent.match(/iPad/i)
 // 			|| navigator.userAgent.match(/iPod/i)
 // 			|| navigator.userAgent.match(/BlackBerry/i)
 // 			|| navigator.userAgent.match(/Windows Phone/i)
 // 		){
 // 			mobile = true;
	// 	}
	// 	jQuery('.column-group').removeClass('language-selected');
		
	// 	if($(this).attr("id")=="selectFrom"){
	// 		populateTranslationList("#column-group-", srcLangs);
			
	// 		FromOrTo="from";
	// 		from_drop_down = true;
	// 		$('#dropDownSub').hide();
	// 		$('#dropDownSub').addClass('selectFromSub');
	// 		$('#dropDownSub').css('left','0');
		

	// 	} else {
	// 		from_drop_down = false;
	// 	$( window ).resize(function() {
	// 	winW = window.innerWidth;
	// 	if (FromOrTo == "to"){
	// 		if (winW <= 750 || mobile) {
	// 			$('#dropDownSub').css('left', '0');
	// 		}
	// 		if (winW > 750 && !mobile) {
	// 			$('#dropDownSub').css('left', '366px');
	// 		}
	// 	}
	// 	});
		
	// 	populateTranslationList("#column-group-", dstLangs);
	// 		winW = window.innerWidth;

	// 		FromOrTo = "to";
	// 		$('#dropDownSub').hide();
	// 		if (winW>750 && !mobile){
	// 			$('#dropDownSub').css('left','366px');
	// 		}else {
	// 			$('#dropDownSub').css('left', '0');
	// 		}
			
	// 		$('#dropDownSub').removeClass('selectFromSub');
	// 		//find_smth(curr_pair.srcLang);
	// 		//$('#dropDownSub a').addClass('language-selected');
	// 	}

	// 	$('#dropDownSub').show();

	// 	drop_down_click = false;
	// 	if (drop_down_click == false && drop_down_show == false){
	// 		$('.img_container').after('<p>show</p>');
	// 		drop_down_click = true;
	// 		drop_down_show = true;
	// 	}
	// 	if (!drop_down_click && drop_down_show){
	// 		$('.img_container').after('<p>hide</p>');
	// 		drop_down_click = true;
	// 		drop_down_show = false;
	// 	}
			
	// });

	
	// $('#dropDownSub a').click(function(){
	// 	$('.img_container').after('<p>clicked</p>');
	// 	$('#dropDownSub a').removeClass('language-selected');
	// 	if (FromOrTo == "from"){
	// 		$('#dropDownSub a').removeClass('current-language-selected-from');
	// 		fromLangCode = $(this).text();
	// 	}
	// 	if (FromOrTo == "to"){
	// 		$('#dropDownSub a').removeClass('current-language-selected-to');
	// 		toLangCode = $(this).text();
	// 	}
		
	// 	if(FromOrTo=="from"){	
			
	// 		if($(this).text()!=" Detect Language "){
	// 			isDetecting = false;
	// 			sec_highest_lang_code = "";
	// 			thr_highest_lang_code = "";
	// 			highest_lang_code = "";
	// 		}
		
	// 		if($(this).text() !=" Detect Language "){
	// 		$('#selectFrom em').html($(this).text());
	// 		}else{
	// 		$('#selectFrom em').html("Detect");	
	// 		}
	// 		curr_pair.srcLang = $(this).text();

	// 		if($(this).text()== " Detect Language ") {
	// 			detect_lang_interface();
	// 		}
			
	// 	} else {
	// 		if($(this).text() !=" Detect Language "){
	// 		$('#selectTo em').html($(this).text());
	// 		}else{
	// 		$('#selectTo em').html("Detect");	
	// 		}
	// 		curr_pair.dstLang = $(this).text();
	// 	}
	// 	matchFound= false;
	
	// 	//FIXME: if (curr_pair in window.pairs) ??
	// 	for(var it in window.pairs){	
	// 		if(parsePair_lol(curr_pair)==window.pairs[it])
	// 			matchFound=true;
	// 	}
		
		
	// 	if(matchFound){
		
	// 		try{
	// 			if(curr_pair.srcLang.indexOf("Detect") !=-1){
	// 				curr_pair.srcLang = detectLanguage($(this).val());
					
	// 				curr_pair.srcLang = abbreviations[curr_pair.srcLang];
			
	// 				$('#selectFrom em').html(curr_pair.srcLang);
					
	// 		}
				
			
	// 		}catch(e){
	// 			console.log(e.message);
	// 		}
			
	// 		translate(curr_pair,$('#textAreaId').val());
	// 	}
	// 	else jQuery('#translationTest').html("Translation not yet available!");
		
		
	// });
	
}

function strcmp(a, b){   
    return (a<b?-1:(a>b?1:0));  
}
	

function parsePair_lol(pr){

	parsedPair = null;	
	pr.srcLang = jQuery.trim(pr.srcLang);
	pr.dstLang = jQuery.trim(pr.dstLang);

	parsedPair = pr.srcLang;
	parsedPair +="|" +pr.dstLang;
	return parsedPair;
}

function find_smth(lol){
	aaa=0;
	loler = "|" + lol;
	
	
	for(it in window.pairs){
		if(window.pairs[it].indexOf(loler) != -1){
			aaa++;
		}	
	}
	
	
}

function detect_lang_interface() {
	// $('.img_container').after('<p>'+isDetecting+'</p>');
	isDetecting = true;
	assign_probs();
	for (var i=0; i<probabilities.length; i++) {
		if (probabilities[i]>highest) {
			highest = probabilities[i];
			highest_lang_code = probabilities_lang_code[i];
			highest_index = i;
		}
	}
	probabilities.splice(highest_index, 1);
	probabilities_lang_code.splice(highest_index, 1);
	highest = 0;
	for (var ii=0; ii<probabilities.length; ii++) {
		if (probabilities[ii]>highest) {
			highest = probabilities[ii];
			sec_highest_lang_code = probabilities_lang_code[ii];
			highest_index = ii;
		}
	}
	probabilities.splice(highest_index, 1);
	probabilities_lang_code.splice(highest_index, 1);
	highest = 0;
	for (var iii=0; iii<probabilities.length; iii++) {
		if (probabilities[iii]>highest) {
			highest = probabilities[iii];
			thr_highest_lang_code = probabilities_lang_code[iii];
			highest_index = iii;
		}
	}
	probabilities.splice(highest_index, 1);
	probabilities_lang_code.splice(highest_index, 1);
	highest = 0;
	winW = window.innerWidth;
	if (isDetecting){
		if (winW <= 750 || mobile) {
			$('#selectFrom em').html(" "+highest_lang_code+" ");
		}
		else {
			$('#selectFrom em').html(" "+highest_lang_code+"-detected ");
		}
	}
	$( window ).resize(function() {
		winW = window.innerWidth;
		if (isDetecting){
			if (winW <= 750 || mobile) {
				$('#selectFrom em').html(" "+highest_lang_code+" ");
			}
			else {
				$('#selectFrom em').html(" "+highest_lang_code+"-detected ");
			}
		}
	});
	fromLangCode = " "+highest_lang_code+" ";
	curr_pair.srcLang = " "+highest_lang_code+" ";
}

function assign_probs() {
	probabilities_lang_code = ['es', 'en', 'fr', 'ca'];
	probabilities = [0.42, 0.91, 0.89, 0.81];
}

	
