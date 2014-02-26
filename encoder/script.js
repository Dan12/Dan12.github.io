var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ",".",",","'","1","2","3","4","5","6","7","8","9","0","~","`","$","!","@","#","%","^","&","*","(",")","+","-","=","_","{","}","[","]","|",";",":","<",">","?","/","\n","ƒ","š","œ","ÿ","þ","ý","ü","û","ú","ù","ø","ö","õ","ô","ó","ò","ñ","ð","ï","î","í","ì","ë","ê","é","è","ç","æ","å","ä","ã","â","á","à","ß","À","Á","Â","Ã","Ä","Å","Æ","Ç","È","É","Ê","Ë","Ì","Í","Î","Ï","Ð","Ñ","Ò","Ó","Ô","Õ","Ö","Ø","Ù","Ú","Û","Ü","Ý","Þ","Œ","Š","Ÿ"];
var letter=1;
var letters=[];
var alphabet2 = new Array(162);
var alpha1=0;
var alpha2=0;
var alpha3=0;
var alpha4=0;
var encode1=0;
var encode2=0;
var encode3=0;
var encode4=0;
var value="";

$(document).ready(function () {

    $('.encode_pre_button').click(function(){
        value = $('.encode_textarea').val();
        letters = value.split('');
        letter=1;
        var eoa = "en";
        var eoa_num = 1;
        for (var xx = 0; xx<8; xx++){
            if(!$('.enter_'+eoa+eoa_num.toString()+'_key').val()){
                alert("You left one or more inputs blank");
                return;
            }
            eoa_num++;
            if (eoa_num>4){
                eoa_num = 1;
                eoa = "alp";
            }
        }
        encode1 = parseInt($('.enter_en1_key').val());
        encode2 = parseInt($('.enter_en2_key').val());
        encode3 = parseInt($('.enter_en3_key').val());
        encode4 = parseInt($('.enter_en4_key').val());
        alpha1 = parseInt($('.enter_alp1_key').val());
        alpha2 = parseInt($('.enter_alp2_key').val());
        alpha3 = parseInt($('.enter_alp3_key').val());
        alpha4 = parseInt($('.enter_alp4_key').val());
        encode_text();
    });
    
    $('.encode_rand_button').click(function(){
        value=$('.encode_textarea').val();
        letters=value.split('');
        letter=1;
        encode1=Math.floor(Math.random() * 162 + 1);
        encode2=Math.floor(Math.random() * 162 + 1);
        encode3=Math.floor(Math.random() * 162 + 1);
        encode4=Math.floor(Math.random() * 162 + 1);
        alpha1=Math.floor(Math.random() * 162 + 1);
        alpha2=Math.floor(Math.random() * 162 + 1);
        alpha3=Math.floor(Math.random() * 162 + 1);
        alpha4=Math.floor(Math.random() * 162 + 1);
        encode_text();
        $('.enter_en1_key').val(encode1);
        $('.enter_en2_key').val(encode2);
        $('.enter_en3_key').val(encode3);
        $('.enter_en4_key').val(encode4);
        $('.enter_alp1_key').val(alpha1);
        $('.enter_alp2_key').val(alpha2);
        $('.enter_alp3_key').val(alpha3);
        $('.enter_alp4_key').val(alpha4);
        //$('.encode_keys').html("Encode Keys: "+encode1+" "+encode2+" "+encode3+" "+encode4);
        //$('.alphabet_keys').html("Alphabet Keys: "+alpha1+" "+alpha2+" "+alpha3+" "+alpha4);
    });

    $('.decode_button').click(function(){
        var value = $('.decode_textarea').val();
        letters = value.split('');
        letter=1;
        var eoa = "encode";
        var eoa_num = 1;
        for (var xx = 0; xx<8; xx++){
            if(!$('.'+eoa+''+eoa_num.toString()+'_key').val()){
                alert("You left one or more inputs blank");
                return;
            }
            eoa_num++;
            if (eoa_num>4){
                eoa_num = 1;
                eoa = "alpha";
            }
        }
        encode1 = parseInt($('.encode1_key').val());
        encode2 = parseInt($('.encode2_key').val());
        encode3 = parseInt($('.encode3_key').val());
        encode4 = parseInt($('.encode4_key').val());
        alpha1 = parseInt($('.alpha1_key').val());
        alpha2 = parseInt($('.alpha2_key').val());
        alpha3 = parseInt($('.alpha3_key').val());
        alpha4 = parseInt($('.alpha4_key').val());
        new_alpha();
        for(var x = 0; x<letters.length; x++){
            var ind = 0;
            ind=alphabet2.indexOf(""+letters[x]+"");
            if (ind==-1){
                continue;
            }
            if (letter==1){
                ind-=encode1;
            }
            if (letter==2){
                ind-=encode2;
            }
            if (letter==3){
                ind-=encode3;
            }
            if (letter==4){
                ind-=encode4;
            }
            if(ind<0){
                ind+=162;
            }
            letters[x]=alphabet2[ind];
            letter++;
            if (letter>4){
                letter=1;
            }
        }
        value = letters.join("");
        $('.decode_textarea').val(value);
    });

});

function encode_text() {
    new_alpha();
    for(var x = 0; x<letters.length; x++){
        var ind=0;
        ind=alphabet2.indexOf(""+letters[x]+"");
        if (ind==-1){
            continue;
        }
        if (letter==1){
            ind+=encode1;
        }
        if (letter==2){
            ind+=encode2;
        }
        if (letter==3){
            ind+=encode3;
        }
        if (letter==4){
            ind+=encode4;
        }
        if(ind>=162){
            ind-=162;
        }
        letters[x]=alphabet2[ind];
        letter++;
        if (letter>4){
            letter=1;
        }
    }
    value = letters.join("");
    $('.encode_textarea').val(value);
}

function new_alpha() {
    letter=1;
    alphabet2 = new Array(101);
    for (var i = 0; i<alphabet.length; i++){
        var ind = 0;
        if (letter==1){
            ind+=alpha1;
        }
        if (letter==2){
            ind+=alpha2;
        }
        if (letter==3){
            ind+=alpha3;
        }
        if (letter==4){
            ind+=alpha4;
        }
        while(true){
            if (ind>=162){
                ind-=162;
            }
            if (alphabet2[ind]===undefined){
                alphabet2[ind]=alphabet[i];
                break;
            }
            else{
                ind++;
            }
        }
        letter++;
        if (letter>4){
            letter=1;
        }
    }   
}