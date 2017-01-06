// index.html generation script for node

var fs = require('fs');
var contentPath = './content.js';
var outputPath = './index.html';
var templatePath = './template.html';

// format the a tags
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

function numberOfSpaces(text) {
  var count = 0;
  var index = 0;
  while (text.charAt(index++) === " ") {
    count++;
  }
  return count;
}

function tabsToSpace(count) {
  var ret = '';
  for(var i = 0; i < count; i++) {
    ret += ' ';
  }
  return ret;
}

function addContent(content, pageData) {
  var newLineData = pageData.split('\n');

  var navIndex = 0;
  var contentIndex = 0;

  for(var i = 0; i < newLineData.length; i++) {
    if(newLineData[i].trim().includes('class="nav_tabs"')) {
      navIndex = i+1;
    }
    if(newLineData[i].trim().includes('id="content_container"')) {
      contentIndex = i+1;
      break;
    }
  }

  var navTabs = numberOfSpaces(newLineData[navIndex]);
  var tabSpaces = 4;
  var curTabs = numberOfSpaces(newLineData[contentIndex])+tabSpaces;

  var num = 1;
  for(var i in content){
      // add the nav and increment the contentIndex
      newLineData.splice(navIndex, 0, tabsToSpace(navTabs+tabSpaces)+'<li class="nav_tab" tab_num="'+num+'">'+i+'</li>');
      contentIndex++;
      navIndex++;

      var className = i.toLowerCase().replace(" ","_");
      newLineData.splice(contentIndex, 0, tabsToSpace(curTabs)+'<div class="'+className+' tab tab_'+num+'">');
      contentIndex++;
      curTabs+=tabSpaces;

      newLineData.splice(contentIndex, 0, tabsToSpace(curTabs)+'<h2 class="subheader">'+i+'</h2>');
      contentIndex++;

      for(var j in content[i]){

          if(className=="about"){
            newLineData.splice(contentIndex, 0, tabsToSpace(curTabs)+'<p class="about_content">'+replaceA(content[i][j])+'</p>');
            contentIndex++;
          }

          else{
              var header = content[i][j][0].split(",");
              var projContent = content[i][j][1];
              var image = content[i][j][2].split(",");
              newLineData.splice(contentIndex, 0, tabsToSpace(curTabs)+'<div class="project_container"><h2 class="project_header"><a href="'+header[0]+'" target="_blank">'+header[1]+'</a></h2><p class="project_content">'+replaceA(projContent)+'</p><div class="project_image"><a href="'+image[0]+'" target="_blank" class="img_link"><img src="'+image[1]+'"></a></div></div>');
              contentIndex++;
          }
      }
      curTabs-=tabSpaces;
      newLineData.splice(contentIndex, 0, tabsToSpace(curTabs)+'</div>');
      contentIndex++;

      num++;
  }

  fs.writeFile(outputPath, newLineData.join('\n'), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

// read in the content and html data
fs.readFile(contentPath, 'utf8', function(err, data) {
    if(err) {
        console.error("Could not open file: %s", err);
        return;
    }
    var strNewLine = data.split('\n');
    var strJSON = '';
    for(var i = 0; i < strNewLine.length; i++) {
      if(!strNewLine[i].trim().startsWith('//')) {
        strJSON += strNewLine[i]+'\n';
      }
    }

    var content = JSON.parse(strJSON);

    fs.readFile(templatePath, 'utf8', function(err, data) {
        if(err) {
            console.error("Could not open file: %s", err);
            return;
        }

        addContent(content, data);
    });
});
