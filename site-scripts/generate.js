// MD to site html
const fs = require('fs');

const md = require('./md-jml');
const jml = require('./jml-h');
const tabFuncs = require('./tab-counter');

const contentPath = './content.md';
const outputPath = '../index.html';
const templatePath = './main-template.html';

var contentStruct = [];

var preNav = [];
var nav = [];
var navToContent = [];
var content = [];
var postContent = [];

function writeOutput() {
  var outText = '';
  outText += preNav.join('\n') + '\n';
  outText += nav.join('\n') + '\n';
  outText += navToContent.join('\n') + '\n';
  outText += content.join('\n') + '\n';
  outText += postContent.join('\n') + '\n';

  fs.writeFile(outputPath, outText, function(err) {
    if(err) {
      console.log(err);
    }
  });
}

// generate the content object from the mark down data
function generateContent(mdTree) {
  for(var i = 2; i < mdTree.length; i++) {
    mdTree[i][1] = {};

    if(mdTree[i][0] == 'h1') {
      contentStruct.push({'header': mdTree[i][2], 'content': []});
    } else {
      if(contentStruct[contentStruct.length-1]['header'].toLowerCase() !== 'about') {
        if (mdTree[i][0] == 'h2') {
          contentStruct[contentStruct.length-1]['content'].push({'header': mdTree[i][2], 'content': [], 'image': []});
        } else {
          var lastTab = contentStruct.length-1;
          var lastSection = contentStruct[lastTab]['content'].length-1;
          while(i < mdTree.length - 1 && mdTree[i+1][0] !== 'h1' && mdTree[i+1][0] !== 'h2'){
            contentStruct[lastTab]['content'][lastSection]['content'].push(mdTree[i]);
            i++;
          }
          contentStruct[lastTab]['content'][lastSection]['image'] = mdTree[i];
        }
      } else {
        contentStruct[contentStruct.length-1]['content'].push(mdTree[i]);
      }
    }
  }

  var tabSpaces = 4;
  var navTabs = tabFuncs.numberOfSpaces(preNav[preNav.length-1])+tabSpaces;
  var contTabs = tabFuncs.numberOfSpaces(navToContent[navToContent.length-1])+tabSpaces;

  for(var i = 0; i < contentStruct.length; i++) {
    nav.push(tabFuncs.tabsToSpace(navTabs)+'<li class="nav_tab" tab_num="'+ (i+1) +'">'+ (contentStruct[i]['header']) +'</li>');

    content.push(tabFuncs.tabsToSpace(contTabs)+'<div class="tab tab_'+ (i+1) +'">');
    contTabs+=tabSpaces;

    content.push(tabFuncs.tabsToSpace(contTabs)+'<h2 class="subheader">'+ contentStruct[i]['header'] +'</h2>');
    if(contentStruct[i]['header'].toLowerCase() === 'about') {
      for(var j = 0; j < contentStruct[i]['content'].length; j++) {
        content.push(tabFuncs.tabsToSpace(contTabs)+jml.dom(contentStruct[i]['content'][j]));
      }
    } else {
      for(var j = 0; j < contentStruct[i]['content'].length; j++) {
        content.push(tabFuncs.tabsToSpace(contTabs)+'<div class="project_container">');
        contTabs+=tabSpaces;

        content.push(tabFuncs.tabsToSpace(contTabs)+'<h2 class="project_header">'+ jml.dom(contentStruct[i]['content'][j]['header']) +'</h2>');

        contentStruct[i]['content'][j]['content'][0][1] = {'class':'img_content'}

        // TODO loop
        content.push(tabFuncs.tabsToSpace(contTabs)+jml.dom(contentStruct[i]['content'][j]['content'][0]));

        content.push(tabFuncs.tabsToSpace(contTabs)+jml.dom(contentStruct[i]['content'][j]['image'][2]));

        contTabs-=tabSpaces;
        content.push(tabFuncs.tabsToSpace(contTabs)+'</div>');
      }
    }

    contTabs-=tabSpaces;
    content.push(tabFuncs.tabsToSpace(contTabs)+'</div>');
  }

  writeOutput();
}

// read the markdown content
function readContent() {
  fs.readFile(contentPath, 'utf8', function(err, data) {
    if(err) {
        console.error("Could not open file: %s", err);
        return;
    }

    md.parse(data, {}, function(mdTree) {
        generateContent(mdTree);
    });

  });
}

// generate the 3 prebuilt arrays
function generateArrays(templateData) {
  var arr = templateData.split('\n');

  var foundNav = false;
  var foundContent = false;

  for(var i = 0; i < arr.length; i++) {
    if(!foundNav) {
      preNav.push(arr[i]);
    } else if(!foundContent) {
      navToContent.push(arr[i]);
    } else {
      postContent.push(arr[i]);
    }

    if(arr[i].includes('class="nav_tabs"')) {
      foundNav = true;
    } else if(arr[i].includes('id="content_container"')) {
      foundContent = true;
    }
  }

  readContent();
}

// Read the template
function readTemplate() {
  fs.readFile(templatePath, 'utf8', function(err, data) {
    if(err) {
        console.error("Could not open file: %s", err);
        return;
    }

    generateArrays(data);
  });
}

readTemplate();
