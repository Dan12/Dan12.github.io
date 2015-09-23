TABNUM = 4;
PAGEWIDTH = 800;
CURRENTTAB = 1;

$(document).ready(function(){
    
    reformat();
    
    loadPage();
    
    $(window).resize(function(){
       reformat(); 
    });
    
});

function loadPage(){
    $(".tab_"+CURRENTTAB).slideDown(300);
    
    $(".nav_tab").click(function(){
      var newTabNum = $(this).attr("tab_num");
      $("[tab_num='"+CURRENTTAB+"']").removeClass("nav_selected");
      $(".tab_"+CURRENTTAB).slideUp(300, function(){
         CURRENTTAB =  newTabNum;
         $("[tab_num='"+CURRENTTAB+"']").addClass("nav_selected");
         $(".tab_"+CURRENTTAB).slideDown(300);
      });
    });
}

function reformat(){
    var widthSum = 0;
    for(var i = 1; i <= TABNUM; i++){
        widthSum += $("[tab_num='"+i+"']").outerWidth();
    }
    var padding = (PAGEWIDTH-widthSum)/(TABNUM*2);
    padding-=2;
    for(var i = 1; i <= TABNUM; i++){
        $("[tab_num='"+i+"']").css("margin","0 "+padding+"px");
    }
}