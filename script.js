TABNUM = 4;
PAGEWIDTH = 800;
CURRENTTAB = 1;
ISMOBILE = false;

$(document).ready(function(){
    
    addContent();
    
    //TODO: add function to reformat for web pages
    if(window.location.hash) {
        //console.log(parseInt(window.location.hash.substr(1,window.location.hash.length)))
        CURRENTTAB = parseInt(window.location.hash.substr(1,window.location.hash.length));
    }

    PAGEWIDTH = parseInt($(".container").css("max-width"));

    if($("#mobile_check_div").css("display") == "none"){
      ISMOBILE = true;
      reformatMobile();
    }
    else
      reformatRegular();
    
    loadPage();
    
    $(window).resize(function(){
        if($("#mobile_check_div").css("display") == "none")
            ISMOBILE = true;
        else
            ISMOBILE = false;
        //console.log(ISMOBILE);
        if(ISMOBILE)
            reformatMobile();
        else
            reformatRegular(); 
    });
    
});

function reformatMobile(){
    $("[tab_num='1']").css("margin","0");
    $("[tab_num='2']").css("margin","0");
    $("[tab_num='3']").css("margin","0");
    $("[tab_num='4']").css("margin","0");
    PAGEWIDTH = parseInt($(".nav_tabs").width())-40;
    var widthSum = 0;
    for(var i = 1; i <= TABNUM/2; i++){
        widthSum += $("[tab_num='"+i+"']").outerWidth(false);
    }
    var padding = (PAGEWIDTH-widthSum)/(TABNUM/2);
    padding-=2;
    if(padding > 0){
        $("[tab_num='1']").css("margin","0 "+padding+"px 0 20px");
        $("[tab_num='2']").css("margin","0 20px 0 "+padding+"px");
    }
    widthSum = 0;
    for(var i = TABNUM/2+1; i <= TABNUM; i++){
        widthSum += $("[tab_num='"+i+"']").outerWidth(false);
    }
    padding = (PAGEWIDTH-widthSum)/(TABNUM/2);
    padding-=2;
    if(padding > 0){
        $("[tab_num='3']").css("margin","0 "+padding+"px 0 20px");
        $("[tab_num='4']").css("margin","0 20px 0 "+padding+"px");
    }
}

function loadPage(){
    $(".tab_"+CURRENTTAB).slideDown(300);
    $("[tab_num='"+CURRENTTAB+"']").addClass("nav_selected");
    
    $(".nav_tab").click(function(){
        var newTabNum = $(this).attr("tab_num");
        $("[tab_num='"+CURRENTTAB+"']").removeClass("nav_selected");
        $(".tab_"+CURRENTTAB).slideUp(300, function(){
            CURRENTTAB =  newTabNum;
            $("[tab_num='"+CURRENTTAB+"']").addClass("nav_selected");
            $(".tab_"+CURRENTTAB).slideDown(300);
            window.location.hash = CURRENTTAB;
        });
    });
}

function reformatRegular(){
    PAGEWIDTH = parseInt($(".container").width());
    var widthSum = 0;
    for(var i = 1; i <= TABNUM; i++){
        widthSum += $("[tab_num='"+i+"']").outerWidth(false);
    }
    var padding = (PAGEWIDTH-widthSum)/(TABNUM*2);
    padding-=4;
    for(var i = 1; i <= TABNUM; i++){
        $("[tab_num='"+i+"']").css("margin","0 "+padding+"px");
    }
}

function addContent(){
    var num = 1;
    for(var i in content){
        //console.log(i);
        $(".nav_tabs").append('<li class="nav_tab" tab_num="'+num+'">'+i+'</li>');
        var className = i.toLowerCase().replace(" ","_");
        $(".container").append('<div class="'+className+' tab tab_'+num+'">');
        $("."+className).append('<h2 class="'+className+'_header">'+i+'</h2>');
        for(var j in content[i]){
            if(className=="about")
                $("."+className).append('<p class="about_content">'+replaceA(content[i][j])+'</p>');
            else{
                var header = content[i][j][0].split(",");
                var projContent = content[i][j][1];
                var image = content[i][j][2].split(",");
                $("."+className).append('<div class="project_container"><h2 class="project_header"><a href="'+header[0]+'" target="_blank">'+header[1]+'</a></h2><p class="project_content">'+replaceA(projContent)+'</p><div class="project_image"><a href="'+image[0]+'" target="_blank" class="img_link"><img src="'+image[1]+'"></a></div></div>');
            }
        }
        num++;
    }
}

function replaceA(str){
    var ind = str.indexOf("$a");
    var endInd = str.indexOf("$", ind+1);
    var ret = str.substring(0,ind == -1 ? str.length : ind)+"";
    while(ind != -1){
        var commaInd = str.indexOf(",",ind);
        var link = str.substring(ind+2,commaInd);
        var text = str.substring(commaInd+14,endInd);
        ret+="<a href='"+link+"' target='_blank' class='inline_a_tag'>"+text+"</a>";
        ind = str.indexOf("$a",endInd);
        if(ind != -1)
            ret+=str.substring(endInd+1,ind);
        else
            ret+=str.substring(endInd+1,str.length);
        endInd = str.indexOf("$",ind+1);
    }
    return ret;
}