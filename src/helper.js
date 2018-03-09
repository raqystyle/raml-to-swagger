function mkArray(lim) {
  return Array.from(Array(lim), function(a, i) { return i; });
}

function extractErrorPositionFromErrorMsg(msg) {
  const res = /Unexpected string in JSON at position (\d+)/.exec(msg);
  return res ? parseInt(res[1], 10) : null;
}

function extractErrorPlace(rawJson, position) {
  const context = 20;
  return rawJson.substring(position - context, position + context);
}

function showFancySyntaxException(rawJson, e) {
  var context = [];
  var pos = extractErrorPositionFromErrorMsg(e.message);
  if (pos) {
    context.push(extractErrorPlace(rawJson, pos));
    context.push(mkArray(pos -1).map(function() { return '-'; }).join('') + '^');
  }
  return [
    e.message,
    context.join('\n')
  ].join('\n');
}

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw);
  }
  catch (e) {
    throw new Error(H.showFancySyntaxException(raw, e));
  }
}

module.exports = {
  showFancySyntaxException: showFancySyntaxException,
  mkArray: mkArray,
  extractErrorPositionFromErrorMsg: extractErrorPositionFromErrorMsg,
  extractErrorPlace: extractErrorPlace,
  safeJsonParse: safeJsonParse
}