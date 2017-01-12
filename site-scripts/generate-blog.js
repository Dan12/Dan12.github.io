const fs = require('fs');
const tabFuncs = require('./tab-counter');
const parsers = require('./parsers');
const templatePath = "./blog-template.html"

// Full post should include paragraph breaks, images, and code

function addContent(content, title, pageData, prevLink, curLink, nextLink) {
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

  newLineData.splice(navIndex++, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<a href="'+prevLink+'.html"><li class="nav_tab" tab_num=1>Previous</li></a>');
  newLineData.splice(navIndex++, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<a href="/#4"><li class="nav_tab" tab_num=2>Blogs</li></a>');
  newLineData.splice(navIndex++, 0, tabFuncs.tabsToSpace(navTabs+tabSpaces)+'<a href="'+nextLink+'.html"><li class="nav_tab" tab_num=3>Next</li></a>');
  contentIndex+=3;

  newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<h2 class="subheader">'+title+'</h2>');
  contentIndex++;

  newLineData.splice(contentIndex, 0, tabFuncs.tabsToSpace(curTabs)+'<div class="blog_content">'+parsers.replaceI(parsers.replaceP(parsers.replaceA(content)))+'</div>');

  fs.writeFile("../blogs/"+curLink+".html", newLineData.join('\n'), function(err) {
    if(err) {
      console.log(err);
    }
  });
}

exports.generateBlog = (title, page, content, prev, next) => {

  fs.readFile(templatePath, 'utf8', function(err, data) {
      if(err) {
          console.error("Could not open file: %s", err);
          return;
      }

      addContent(content, title, data, prev, page, next);
  });
}
