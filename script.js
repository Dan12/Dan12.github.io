TABNUM = 4;
PAGEWIDTH = 800;
CURRENTTAB = 1;
ISMOBILE = false;

$(document).ready(function(){
    
    //TODO: add function to reformat for web pages

    if(window.location.hash) {
        console.log(parseInt(window.location.hash.substr(1,window.location.hash.length)))
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
        console.log(ISMOBILE);
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