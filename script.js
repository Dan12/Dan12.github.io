TABNUM = 1;
PAGEWIDTH = 800;
CURRENTTAB = 1;
ISMOBILE = false;

$(document).ready(function(){
    if(window.location.hash) {
        CURRENTTAB = parseInt(window.location.hash.substr(1,window.location.hash.length));
    }

    PAGEWIDTH = parseInt($(".container").css("max-width"));

    TABNUM = $(".nav_tab").length;

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
        if(ISMOBILE)
            reformatMobile();
        else
            reformatRegular();
    });

});

// load the event listeners and styles
function loadPage(){
    $(".tab_"+CURRENTTAB).slideDown(300);
    $("[tab_num='"+CURRENTTAB+"']").addClass("nav_selected");

    $(".nav_tab").click(function(){
        var newTabNum = $(this).attr("tab_num");
        if(parseInt(CURRENTTAB) !== parseInt(newTabNum)) {
          $("[tab_num='"+CURRENTTAB+"']").removeClass("nav_selected");
          $(".tab_"+CURRENTTAB).slideUp(300, function(){
              CURRENTTAB = newTabNum;
              $("[tab_num='"+CURRENTTAB+"']").addClass("nav_selected");
              $(".tab_"+CURRENTTAB).slideDown(300);
              window.location.hash = CURRENTTAB;
          });
          return false;
        }
    });

    $("#back_to_top").click(function(){
      $("html, body").animate({
            scrollTop: 0
      }, 200);
      return false;
    });
}

// set the nav format for mobile
function reformatMobile(){
    $(".nav_tab").css({"padding": "10px 0", "display": "block"});
}

// reformat the nav for desktop
function reformatRegular(){
    $(".nav_tab").css({"padding": "0", "display": "inline-block"});
    PAGEWIDTH = parseInt($(".container").width());
    var widthSum = 0;
    for(var i = 1; i <= TABNUM; i++){
        widthSum += $("[tab_num='"+i+"']")[0].getBoundingClientRect().width;
    }
    var padding = (PAGEWIDTH-widthSum)/(TABNUM*2);
    for(var i = 1; i <= TABNUM; i++){
        $("[tab_num='"+i+"']").css("padding","10px "+padding+"px");
    }
}
