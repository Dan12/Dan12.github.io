const fs = require('fs');

const jml = require('./jml-h');
const tabFuncs = require('./tab-counter');
const templatePath = "./blog-template.html"

function mod(n, m) {
  return ((n % m) + m) % m;
}

function addContent(templateData, title, date, content, prevLink, curLink, nextLink) {
  var newLineData = templateData.split('\n');

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

  var tabSpaces = 4;
  var navTabs = tabFuncs.numberOfSpaces(newLineData[navIndex])+tabSpaces;
  var curTabs = tabFuncs.numberOfSpaces(newLineData[contentIndex])+tabSpaces;

  newLineData.splice(navIndex++, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<a href="'+prevLink+'"><li class="nav_tab" tab_num=1>Previous</li></a>');
  newLineData.splice(navIndex++, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<a href="/#4"><li class="nav_tab" tab_num=2>Blogs</li></a>');
  newLineData.splice(navIndex++, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<a href="'+nextLink+'"><li class="nav_tab" tab_num=3>Next</li></a>');
  contentIndex+=3;

  newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+`<h2 class="subheader">${title}<small>${date}</small></h2>`);
  contentIndex++;

  newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<div class="blog_content">');
  contentIndex++;
  curTabs+=tabSpaces;

  for(var i = 0; i < content.length; i++) {
    newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+jml.dom(content[i]));
    contentIndex++;
  }

  curTabs-=tabSpaces;
  newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'</div>');

  fs.writeFile("../"+curLink, newLineData.join('\n'), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

exports.generateBlog = (contentStruct, ind) => {

  fs.readFile(templatePath, 'utf8', function(err, data) {
      if(err) {
          console.error("Could not open file: %s", err);
          return;
      }

      var content = contentStruct[ind]['content'];
      var title = contentStruct[ind]['header'][2];
      var page = contentStruct[ind]['link'];
      var prevLink = contentStruct[mod(ind-1,contentStruct.length)]['link'];
      prevLink = prevLink.substring(prevLink.indexOf('/')+1);
      var nextLink = contentStruct[mod(ind-1,contentStruct.length)]['link'];
      nextLink = nextLink.substring(nextLink.indexOf('/')+1);
      var date = contentStruct[ind]['date'];

      addContent(data, title, date, content, prevLink, page, nextLink);
  });
}
