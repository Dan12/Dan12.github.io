// index.html generation script for node

const fs = require('fs');
const blogs = require('./generate-blog');
const tabFuncs = require('./tab-counter');
const parsers = require('./parsers');

const contentPath = './content.json';
const outputPath = '../index.html';
const templatePath = './main-template.html';

function mod(n, m) {
  return ((n % m) + m) % m;
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

  var navTabs = tabFuncs.numberOfSpaces(newLineData[navIndex]);
  var tabSpaces = 4;
  var curTabs = tabFuncs.numberOfSpaces(newLineData[contentIndex])+tabSpaces;

  var num = 1;
  for(var i in content){
      // add the nav and increment the contentIndex
      newLineData.splice(navIndex, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<li class="nav_tab" tab_num="'+num+'">'+i+'</li>');
      contentIndex++;
      navIndex++;

      var className = i.toLowerCase().replace(" ","_");
      newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<div class="'+className+' tab tab_'+num+'">');
      contentIndex++;
      curTabs+=tabSpaces;

      newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<h2 class="subheader">'+i+'</h2>');
      contentIndex++;

      for(var j in content[i]){

          if(className=="about"){
            newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<p class="about_content">'+parsers.replaceA(content[i][j])+'</p>');
            contentIndex++;
          }

          else{
              var header = content[i][j][0].split(",");
              var projContent = content[i][j][1];
              var image = content[i][j][2].split(",");

              if(className=="blog") {
                var headerPrev = content[i][mod(parseInt(j)-1,content[i].length)][0].split(",");
                var headerNext = content[i][mod(parseInt(j)+1,content[i].length)][0].split(",");
                blogs.generateBlog(header[1], header[0], projContent, headerPrev[0], headerNext[0]);

                // first 4 sentences
                var sentInd = projContent.indexOf(". ") + 1;
                for(var k = 1; k < 4; k++) {
                  sentInd = projContent.indexOf(". ", sentInd) + 1;
                }

                projContent = projContent.substring(0, sentInd+1);

                var page = "blogs/"+header[0]+".html";
                header[0] = page;
                image[0] = page

                newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<div class="project_container"><h2 class="project_header"><a href="'+header[0]+'">'+header[1]+'</a></h2><p class="project_content">'+parsers.replaceA(projContent)+'<a href="'+page+'">Continue Reading</a></p><div class="project_image"><a href="'+image[0]+'" class="img_link"><img src="'+image[1]+'"></a></div></div>');
              } else {
                newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<div class="project_container"><h2 class="project_header"><a href="'+header[0]+'" target="_blank">'+header[1]+'</a></h2><p class="project_content">'+parsers.replaceA(projContent)+'</p><div class="project_image"><a href="'+image[0]+'" target="_blank" class="img_link"><img src="'+image[1]+'"></a></div></div>');
              }
              contentIndex++;
          }
      }
      curTabs-=tabSpaces;
      newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'</div>');
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
