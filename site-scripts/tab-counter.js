exports.numberOfSpaces = (text) => {
  var count = 0;
  var index = 0;
  while (text.charAt(index++) === " ") {
    count++;
  }
  return count;
}

exports.tabsToSpace = (count) => {
  var ret = '';
  for(var i = 0; i < count; i++) {
    ret += ' ';
  }
  return ret;
}
