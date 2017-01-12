// recurse the tree
function recurseTree(tree, match, fn) {
  if(match === '' || tree[0] === match) {
    fn(tree);
  }
  for(var i = 2; i < tree.length; i++) {
    if(tree[i] instanceof Array) {
      recurseTree(tree[i], match, fn);
    }
  }
}

exports.targetBlank = (tree) => {
  recurseTree(tree, 'a', (tree) => {
    tree[1]['target'] = '_blank';
  });
}

exports.trimImageSrc = (tree) => {
  recurseTree(tree, 'img', (tree) => {
    tree[1]['src'] = tree[1]['src'].substring(tree[1]['src'].indexOf('/')+1);
  });
}

exports.clearDataPos = (tree) => {
  recurseTree(tree, '', (tree) => {
    if(tree[1] !== null) {
      delete tree[1]['data-pos'];
    }
  });
}
