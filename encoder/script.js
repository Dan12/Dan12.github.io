var alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," ",".",",","'","1","2","3","4","5","6","7","8","9","0","$","!","@","#","%","^","&","*","(",")","+","-","=","_","{","}","[","]","|",";",":","<",">","?","/","\n"];
var letter=1;
var letters=[];
var alphabet2 = new Array(66);
var alpha1=0;
var alpha2=0;
var alpha3=0;
var alpha4=0;

$(document).ready(function () {

    $('.encode_button').click(function(){
        var a=$('.encode_textarea').val();
        a=a.toLowerCase();
        letters=a.split('');
        letter=1;
        var encode1=Math.floor(Math.random() * 66 + 1);
        var encode2=Math.floor(Math.random() * 66 + 1);
        var encode3=Math.floor(Math.random() * 66 + 1);
        var encode4=Math.floor(Math.random() * 66 + 1);
        alpha1=Math.floor(Math.random() * 66 + 1);
        alpha2=Math.floor(Math.random() * 66 + 1);
        alpha3=Math.floor(Math.random() * 66 + 1);
        alpha4=Math.floor(Math.random() * 66 + 1);
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
            if(ind>=66){
                ind-=66;
            }
            letters[x]=alphabet2[ind];
            letter++;
            if (letter>4){
                letter=1;
            }
        }
        a = letters.join("");
        $('.encode_textarea').val(a);
        $('.encode_keys').html("Encode Keys: "+encode1+" "+encode2+" "+encode3+" "+encode4);
        $('.alphabet_keys').html("Alphabet Keys: "+alpha1+" "+alpha2+" "+alpha3+" "+alpha4);
    });

    $('.decode_button').click(function(){
        var value = $('.decode_textarea').val();
        letters = value.split('');
        letter=1;
        var encode1 = parseInt($('.encode1_key').val());
        var encode2 = parseInt($('.encode2_key').val());
        var encode3 = parseInt($('.encode3_key').val());
        var encode4 = parseInt($('.encode4_key').val());
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
                ind+=66;
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

function new_alpha() {
    letter=1;
    alphabet2 = new Array(66);
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
            if (ind>=66){
                ind-=66;
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
        if (letter>=4){
            letter=1;
        }
    }   
}