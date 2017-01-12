fs = require('fs');

function replaceA(str) {
  var ind = str.indexOf("$a");
  var endInd = str.indexOf("$", ind+1);
  var ret = str.substring(0,ind == -1 ? str.length : ind)+"";
  while(ind != -1){
      var commaInd = str.indexOf(",",ind);
      var link = str.substring(ind+2,commaInd);
      var text = str.substring(commaInd+14,endInd);
      ret+="["+text+"]("+link+")";
      ind = str.indexOf("$a",endInd);
      if(ind != -1)
          ret+=str.substring(endInd+1,ind);
      else
          ret+=str.substring(endInd+1,str.length);
      endInd = str.indexOf("$",ind+1);
  }
  return ret;
}

fs.readFile('content.json', 'utf8', function(err, data) {
    if(err) {
        console.error('Could not open file: %s', err);
        return;
    }
    var content = JSON.parse(data);

    var output = '';

    for(var header in content) {
      output += '# ' + header + '\n'

      if(header === 'About') {
        for(var ind in content[header]) {
          output += replaceA(content[header][ind]) + '\n';
          output += '\n';
        }
      } else {
        for(var ind in content[header]) {
          var section = content[header][ind];
          var subheader = section[0].split(',');
          output += '## [' + subheader[1] + '](' + subheader[0] + ')\n';
          var secContent = section[1];
          output += replaceA(secContent) + '\n';
          output += '\n';
          var image = section[2].split(',');
          output += '![' + subheader[1] + '](../' + image[1] + ')\n';
          output += '\n'
        }
      }
    }

    fs.writeFile('content.md', output);
});
