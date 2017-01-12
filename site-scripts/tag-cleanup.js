// recurse the tree
function recurseTree() {

}

exports.targetBlank = (tree) => {
  recurseTree(tree);
  // set all a tags to 'target': "_blank"
}

exports.trimImageSrc = (tree) => {
  // TODO, for all img tags, set src = src.substring(src.indexOf('/'))
}
