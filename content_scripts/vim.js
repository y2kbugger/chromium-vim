var log;
log = console.log.bind(console);
var Vim = {};
Vim.keyQueue = "";
Vim.repeatCount = "";

Vim.init = function(el) {
  this.el = el;
  this.setMode("NORMAL");
  this.el.focus();
  this.el.setAttribute("vimmode", true);
  this.el.setAttribute("mode", "NORMAL");
  this.bindingArray = Object.keys(this.bindings);
  this.el.removeEventListener("keydown", this.onKeyDown, false);
  this.el.addEventListener("keydown", this.onKeyDown, false);
};

Vim.selection = function() {
  return document.getSelection();
};

Vim.getValue = function() {
  return this.el.value || this.el.textContent;
};

Vim.setValue = function(text) {
  var pos;
  if (this.el.getAttribute("value") !== undefined) {
    pos = this.el.selectionStart;
    this.el.value = text;
    this.el.selectionStart = pos;
    this.el.selectionEnd = pos;
    return;
  }
  pos = this.el.textContent.length - text.length;
  this.selection().setPosition(this.selection().baseNode, pos);
  this.el.textContent = text;
};

Vim.getSplit = function(offset) {
  if (!offset) {
    offset = this.selection().baseOffset || this.el.selectionEnd || 0;
  }
  var value = this.getValue();
  return [value.substring(0, offset), value.substring(offset)];
};

Vim.bindings = {
  j:  ["moveCursor", "down"],
  k:  ["moveCursor", "up"],
  l:  ["moveCursor", "right"],
  h:  ["moveCursor", "left"],
  gg: ["moveCursor", "top"],
  a: ["alias", "li"],
  A: ["alias", "$i"],
  s: ["alias", "xi"],
  G: ["moveCursor", "bottom"],
  w: ["moveCursor", "forwardWord"],
  b: ["moveCursor", "backwardWord"],
  o: ["action", "openLineDown"],
  O: ["action", "openLineUp"],
  dk: ["alias", "k2dd"],
  dj: ["alias", "2dd"],
  ck: ["alias", "dk$i"],
  cj: ["alias", "2dd$i"],
  cl: ["alias", "xi"],
  ch: ["alias", "hxi"],
  cc: ["alias", "0v$xi"],
  D: ["alias", "v$x"],
  C: ["alias", "Di"],
  "0": ["moveCursor", "beginningOfLine"],
  "$": ["moveCursor", "endOfLine"],
  I: ["alias", "0i"],
  i: ["setMode", "INSERT"],
  v: ["setMode", "VISUAL"],
  x: ["action", "deleteChar"],
  dd: ["action", "deleteLine"],
  cw: ["action", "changeWord"],
  dw: ["action", "deleteWord"]
};

Vim.setMode = function(mode) {
  this.mode = mode;
  this.lastPos = this.selection().baseOffset;
  this.el.setAttribute("mode", mode);
};

Vim.kill = function() {
  Vim.el.removeEventListener("keydown", Vim.onKeyDown, true);
  this.el.removeEventListener("keydown", this.onKeyDown, false);
  Vim.el.removeAttribute("vimmode");
  Vim.el.removeAttribute("mode");
  document.activeElement.blur();
};

Vim.matchQueue = function() {
  for (var i = 0, l = this.bindingArray.length; i < l; ++i) {
    if (this.keyQueue === this.bindingArray[i].substring(0, this.keyQueue.length)) {
      return true;
    }
  }
};

Vim.action = function(type) {
  switch (type) {
    case "deleteChar":
      if (this.mode === "VISUAL") {
        this.setMode("NORMAL");
        return this.selection().deleteFromDocument();
      }
      this.setMode("NORMAL");
      this.moveCursor("right", "extend");
      this.selection().deleteFromDocument();
      break;
    case "deleteLine":
      this.moveCursor("beginningOfLine", "move");
      this.moveCursor("endOfLine", "extend");
      this.action("deleteChar");
      this.moveCursor("beginningOfLine", "move");
      break;
    case "changeWord":
    case "deleteWord":
      var sp = this.getSplit();
      sp[1] = sp[1].replace(/([a-zA-Z_]+|[^A-Za-z ]+)/, "");
      this.setValue(sp.join(""));
      if (type === "changeWord") {
        this.setMode("INSERT");
      } else {
        sp = this.getSplit();
        var m = sp[1].match(/ */);
        if (m) {
          sp[1] = sp[1].substring(m[0].length);
          this.setValue(sp.join(""));
        }
      }
      break;
    case "openLineDown":
      this.moveCursor("endOfLine");
      this.setValue(this.getSplit().join("\n"));
      this.alias("li");
      break;
    case "openLineUp":
      this.moveCursor("beginningOfLine");
      this.setValue(this.getSplit().join("\n"));
      this.alias("i");
      break;
  }
};

Vim.moveCursor = function(loc, mode) {
  mode = mode || (this.mode === "NORMAL" ? "move" : "extend");
  switch (loc) {
    case "up":
      this.selection().modify(mode, "backward", "line");
      break;
    case "down":
      this.selection().modify(mode, "forward", "line");
      break;
    case "left":
      this.selection().modify(mode, "left", "character");
      break;
    case "right":
      this.selection().modify(mode, "forward", "character");
      break;
    case "beginningOfLine":
      this.selection().modify(mode, "left", "lineboundary");
      break;
    case "endOfLine":
      this.selection().modify(mode, "right", "lineboundary");
      break;
    case "top":
      if (this.el.selectionStart) {
        this.el.setSelectionRange(0, 0);
        break;
      }
      if (mode === "extend") {
        this.selection().extend(this.selection().baseNode, 0);
      } else {
        this.selection().setPosition(this.selection().baseNode, 0);
      }
      break;
    case "bottom":
      if (this.el.selectionStart) {
        this.el.setSelectionRange(this.el.value.length, this.el.value.length);
        break;
      }
      if (mode === "extend") {
        this.selection().extend(this.selection().baseNode, this.selection().baseNode.length);
      } else {
        this.selection().setPosition(this.selection().baseNode, this.selection().baseNode.length - 1);
      }
      break;
    case "forwardWord":
      var sp;
      var start, end;
      if (mode === "extend") {
        if (this.el.selectionDirection !== "forward") {
          sp = this.getSplit(this.el.selectionStart);
          sp[1] = sp[1].length - sp[1].replace(/( +|[a-zA-Z_]+\b|[^A-Za-z]+) */, "").length;
          if (this.el.selectionStart + sp[1] <= this.el.selectionEnd) {
            start = this.el.selectionStart + sp[1];
            end = this.el.selectionEnd;
            this.el.setSelectionRange(start, end, "backward");
            break;
          }
          this.el.setSelectionRange(this.el.selectionEnd, this.el.selectionStart + sp[1], "forward");
        } else {
          sp = this.getSplit();
          sp[1] = sp[1].length - sp[1].replace(/( +|[a-zA-Z_]+\b|[^A-Za-z]+) */, "").length;
          this.el.selectionEnd += sp[1];
          break;
        }
      } else {
        sp = this.getSplit();
        sp[1] = sp[1].length - sp[1].replace(/( +|[a-zA-Z_]+\b|[^A-Za-z]+) */, "").length;
        this.el.selectionEnd += sp[1];
        this.el.selectionStart = this.el.selectionEnd;
      }
      break;
    case "backwardWord":
      var sp = this.getSplit();
      sp[0] = sp[0].length - sp[0].replace(/([a-zA-Z_]+|[^A-Za-z ]+) *$/, "").length;
      this.el.selectionStart -= sp[0];
      this.el.selectionEnd = this.el.selectionStart;
      // this.selection().modify(mode, "backward", "word");
      break;
    default:
      break;
  }
};


Vim.numberMap = ")!@#$%^&*(";
Vim.keyMap = {8: "BS", 9: "Tab", 13: "Enter", 27: "Esc", 32: "Space", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 186: [";", ":"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 187: ["=", "+"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 221: ["]", "}"], 220: ["\\", "|"], 222: ["'", "\""]};

Vim.fromKeyCode = function(e) {
  var keyCode  = e.which;
  var shiftKey = e.shiftKey;
  this.shiftKey = e.shiftKey;
  var convertedKey;
  if (this.keyMap.hasOwnProperty(keyCode.toString())) {
    convertedKey = this.keyMap[keyCode.toString()];
    if (Array.isArray(convertedKey)) {
      if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        convertedKey = convertedKey[(shiftKey ? 1 : 0)];
      } else convertedKey = convertedKey[0];
    } else {
      if (shiftKey) convertedKey = "S-" + convertedKey;
    }
  } else {
    if (keyCode >= 48 && keyCode <= 57) {
      if (shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        convertedKey = this.numberMap[keyCode - 48];
      } else {
        convertedKey = String.fromCharCode(keyCode);
      }
    } else {
      convertedKey = String.fromCharCode(keyCode);
      if (!shiftKey)
        convertedKey = String.fromCharCode(keyCode).toLowerCase();
    }
  }

  var modifier = "";
  if (e.ctrlKey) modifier += "-C";
  if (e.altKey)  modifier += "-A";
  if (e.metaKey) modifier += "-M";

  if (modifier) {
    modifier = modifier.replace(/^-/, "");
    convertedKey = "<" + modifier + "-" +
      ((shiftKey && !this.keyMap.hasOwnProperty(keyCode)) ?
       "S-" : "") +
      (!this.keyMap.hasOwnProperty(keyCode) ? convertedKey.toLowerCase() : convertedKey) + ">";
  }

  if (convertedKey.indexOf("S-") !== -1 || (!modifier && keyCode <= 40 && this.keyMap.hasOwnProperty(keyCode))) {
    convertedKey = "<" + convertedKey + ">";
  }
  return convertedKey;
};

Vim.alias = function(macro) {
  this.repeatCount = "";
  macro = macro.split("");
  for (var i = 0; i < macro.length; ++i) {
    this.onKeyDown(macro[i], true);
  }
};

Vim.onKeyDown = function(ev, nocode) {
  if (!nocode) {
    ev.stopPropagation();
  }
  var key = nocode ? ev : Vim.fromKeyCode(ev);
  if (Vim.mode === "NORMAL" && /^[0-9]$/.test(key)) {
    if (!(key === "0" && Vim.repeatCount.length === 0)) {
      Vim.repeatCount += key;
      if (!nocode) {
        ev.preventDefault();
      }
      return;
    }
  }
  if (key === "<Esc>" || key === "<C-[>") {
    if (Vim.mode === "VISUAL") {
      if (Vim.el.selectionDirection === "forward") {
        Vim.selection().collapseToEnd();
      } else {
        Vim.selection().collapseToStart();
      }
    } else if (Vim.mode === "NORMAL") {
      Vim.kill();
    }
    ev.preventDefault();
    Vim.setMode("NORMAL");
    Vim.keyQueue = "";
    return;
  }
  if (Vim.mode === "NORMAL" || Vim.mode === "VISUAL") {
    if (ev.which !== 123 && !nocode && key.length === 1) {
      ev.preventDefault();
    }
  } else {
    return false;
  }
  Vim.keyQueue += key;
  if (Vim.keyQueue === "d" && Vim.mode === "VISUAL") {
    Vim.keyQueue = "x";
  }
  if (!Vim.matchQueue()) {
    Vim.keyQueue = "";
    if (Mappings.convertToAction(key)) {
      document.activeElement.blur();
    }
    return;
  }
  if (Vim.bindingArray.indexOf(Vim.keyQueue) === -1) {
    return;
  }

  var command = Vim.bindings[Vim.keyQueue];
  Vim.keyQueue = "";
  Vim.repeatCount = Vim.repeatCount ? parseInt(Vim.repeatCount) : 1;
  for (var i = 0; i < Vim.repeatCount; ++i) {
    Vim[command[0]](command[1]);
  }
  Vim.repeatCount = "";
};
