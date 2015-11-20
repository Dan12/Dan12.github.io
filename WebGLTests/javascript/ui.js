$(document).ready(function(){
  $(".button").click(function(){
    curAnim = parseInt($(this).attr("anim"));
    initBuffers();
  });
});