// format the a tags
exports.replaceA = (str) => {
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

exports.replaceP = (str) => {
  var ret = "<p>";

  var ind = str.indexOf("$p$");
  var endInd = ind+3;
  ret += str.substring(0,ind == -1 ? str.length : ind)+"";
  while(ind != -1){
      ret+="</p>\n<p>";
      ind = str.indexOf("$p$",endInd);
      if(ind != -1)
          ret+=str.substring(endInd,ind);
      else
          ret+=str.substring(endInd,str.length);
      endInd = ind+3;
  }

  return ret+"</p>"
}

exports.replaceI = (str) => {
  var ind = str.indexOf("$i");
  var endInd = str.indexOf("$", ind+1);
  var ret = str.substring(0,ind == -1 ? str.length : ind)+"";
  while(ind != -1){
      ret+="</p>";

      var commaInd = str.indexOf(",",ind);
      var img = undefined;
      var link = undefined;
      if(commaInd == -1 || commaInd > endInd) {
        img = str.substring(ind+2, endInd);
        ret+='<img src="'+img+'">';
      } else {
        img = str.substring(ind+2, commaInd);
        link = str.substring(commaInd+1, endInd);
        ret+='<a href="'+link+'" target="_blank"><img src="'+img+'"></a>';
      }

      ret+="<p>";
      ind = str.indexOf("$i",endInd);
      if(ind != -1)
          ret+=str.substring(endInd+1,ind);
      else
          ret+=str.substring(endInd+1,str.length);
      endInd = str.indexOf("$", ind+1);
  }

  return ret;
}
