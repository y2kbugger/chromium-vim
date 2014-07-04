var Frames = {};

Frames.focus = function(highlight) {
  window.focus();
  if (highlight === true) {
    var outline = document.createElement('div');
    outline.id = 'cVim-frames-outline';
    document.body.appendChild(outline);
    window.setTimeout(function() {
      document.body.removeChild(outline);
    }, 500);
  }
};

Frames.isVisible = function() {
  return document.body &&
         window.innerWidth &&
         window.innerHeight;
};

Frames.init = function(isRoot) {
  if (Frames.isVisible()) {
    chrome.runtime.sendMessage({action: 'addFrame', isRoot: isRoot}, function(index) {
      Frames.index = index;
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  if (window.isContentFrame) {
    chrome.runtime.sendMessage({action: 'addFrame', isContentFrame: true});
  } else {
    Frames.init(self === top);
  }
}, false);
