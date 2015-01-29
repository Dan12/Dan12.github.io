$(document).ready(function () {
    var x = 0;
    var opacity = 1.0;
    var frame = 0;
    
    var page = 1;
    var quotes = ["Be the change you wish to see in the world. -Unknown","Whatever you are, be a good one. -Abraham Lincoln","Difficulties vanish when faced boldly. -Isaac Asimov","Wherever you go, go with all your heart. -Confucius"];
    
    var navBarWidth = 100;
    
    var width = $(window).width();
    var height = $(window).height();
    
    initPage();
    
    function initPage(){
        width = $(window).width();
        height = $(window).height();
        var titleHeight = $('.titleContainer').height();
        $('.navBar').css({'height':height-titleHeight,'top':titleHeight});
        $('.subNavBar').css({'height':height-titleHeight,'top':titleHeight});
        $('.contentContainerShadow').css({'height':height-titleHeight,'top':titleHeight});
        $('.contentContainerMain').css({'top':titleHeight});
        $('.contentContainer').css('width',width-(navBarWidth*2));
        $('.quote').html('"'+quotes[0]+'"');
        initAnimation();
    }
    
    function initAnimation(){
        var extendAnimation = setInterval(function(){ 
            displayContent();
            frame++;
            if(frame <= 20)
                x = (navBarWidth/20)*(frame);
            else
                opacity = (1.0/20)*(40-frame);
            $('.contentContainerShadow').css('background-color','rgba(255,255,255,'+opacity+')');
            $('.subNavBar').css('left',x+'px');
            width = $(window).width();
            $('.contentContainer').css({'left':(navBarWidth+x)+'px','width':width-(navBarWidth+x)});
            if(frame == 20){
                $('.subNavBar').css('left',navBarWidth+'px');
            }
            if(frame >= 40){
                clearInterval(extendAnimation);
                $('.contentContainerShadow').css('background-color','rgba(255,255,255,0)');
                $('.subNavBar').css('left','navBarWidth');
                $('.contentContainer').css('left','200px');
            	$('.contentContainerMain').css('z-index','5');
            }
        }, 20);
    }
    
    function displayContent(){
        $('.quote').html(quotes[page-1]);
        $('.navItem').css('color','black');
        switch(page){
            case 1:
                $('[pageLink="1"]').css('color','white');
                $('[page="page1"]').css('visibility','visible');
                $('[page="page2"]').css('visibility','hidden');
                $('[page="page3"]').css('visibility','hidden');
                $('[page="page4"]').css('visibility','hidden');
                break;
            case 2:
                $('[pageLink="2"]').css('color','white');
                $('[page="page1"]').css('visibility','hidden');
                $('[page="page2"]').css('visibility','visible');
                $('[page="page3"]').css('visibility','hidden');
                $('[page="page4"]').css('visibility','hidden');
                break;
            case 3:
                $('[pageLink="3"]').css('color','white');
                $('[page="page1"]').css('visibility','hidden');
                $('[page="page2"]').css('visibility','hidden');
                $('[page="page3"]').css('visibility','visible');
                $('[page="page4"]').css('visibility','hidden');
                break;
            case 4:
                $('[pageLink="4"]').css('color','white');
                $('[page="page1"]').css('visibility','hidden');
                $('[page="page2"]').css('visibility','hidden');
                $('[page="page3"]').css('visibility','hidden');
                $('[page="page4"]').css('visibility','visible');
                break;
        }
        $(window).scrollTop(0);
    }
    
    function switchpageAnimation(){
        var subNavX = navBarWidth;
        var contentBoxX = 0;
        var contentBoxMoveX = $('.contentContainer').width()+navBarWidth;
        var quoteX = 0;
        frame = 1;
        var outAnimation = setInterval(function(){
            frame++;
            width = $(window).width();
            if(frame <= 20){
                subNavX = (navBarWidth/20.0)*(frame);
                contentBoxX = ((contentBoxMoveX)/20.0)*(frame);
                quoteX = (width/20.0)*(frame);
                $('.subNavItem').css('left','-'+subNavX+'px');
                $('.contentBox').css('left','-'+contentBoxX+'px');
                $('.quote').css('left','-'+quoteX+'px');
            }
            else{
                subNavX = (navBarWidth/20.0)*(40-frame);
                contentBoxX = ((contentBoxMoveX)/20.0)*(40-frame);
                quoteX = (width/20.0)*(40-frame);
                $('.contentBox').css('left','-'+contentBoxX+'px');
                $('.subNavItem').css('left','-'+subNavX+'px');
                $('.quote').css('left','-'+quoteX+'px');
            }
            if(frame == 20){
                $('.subNavItem').css('left','-'+navBarWidth+'px');
                $('.contentBox').css('left','-'+contentBoxMoveX+'px');
                $('.quote').css('left','-'+width+'px');
                displayContent();
            }
            if(frame >= 40){
                $('.subNavItem').css('left','0');
                $('.contentBox').css('left','0');
                $('.quote').css('left','0');
                clearInterval(outAnimation);
            }
        }, 20);
    }
    
    $('.subNavItem').click(function(){
        var linkAttr = $(this).attr('clickLink');
        $("[clickedLink='"+linkAttr+"']").css('position','static');
        $(window).scrollTop($("[clickedLink='"+linkAttr+"']").position().top);
        $("[clickedLink='"+linkAttr+"']").css('position','relative');
    });
    
    $('.navItem').click(function(){
        page = parseInt($(this).attr('pageLink'));
        switchpageAnimation();
    });
    
    $(window).resize(function(){
        width = $(window).width();
        $('.contentContainer').css('width',width-(navBarWidth*2));
    });
});
