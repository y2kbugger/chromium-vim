var settingsDefault = {

  smoothScroll: true,
  linkHintCharacters: "asdfgqwertzxcvb",
  commandBarOnBottom: true,
  commandBarCSS: '#link_main {\n  font-family: "Sans";\n  line-height: 1 !important;\n  font-size: 10pt;\n  position: absolute;\n  box-shadow: none !important;\n  outline: 0 !important;\n  -webkit-appearance: none !important;\n  box-sizing: content-box !important;\n  border: 0 !important;\n  margin: 0 !important;\n  min-height: 0 !important;\n  background-repeat: none !important;\n  background-position: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n  vertical-align: none !important;\n  font-size: 10pt !important;\n  padding: 0 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  pointer-events: none;\n  width: 100%; left: 0;\n  height: 100%; top: 0;\n  z-index: 2147483647;\n}\n.link_hint {\n  background-color: #ffff00;\n  color: #000;\n  padding: 2px;\n  outline: 0 !important;\n  border: 0 !important;\n  min-height: 0 !important;\n  box-sizing: content-box !important;\n  background-repeat: none !important;\n  line-height: 1 !important;\n  background-position: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n  vertical-align: none !important;\n  margin: 0 !important;\n  font-size: 10pt !important;\n  letter-spacing: normal !important;\n  -webkit-appearance: none !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  border-radius: 2px;\n  border: 1px solid #333;\n  box-shadow: 2px 2px 3px rgba(0,0,0,0.4);\n  position: absolute;\n}\n#command_bar {\n  position: fixed !important;\n  min-height: 0 !important;\n  background-repeat: none !important;\n  background-position: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n  vertical-align: none !important;\n  z-index: 9999999999 !important;\n  background-color: #1b1d1e !important;\n  color: #bbb !important;\n  font-family: monospace !important;\n  display: none;\n  box-shadow: none !important;\n  outline: 0 !important;\n  border: 0 !important;\n  margin: 0 !important;\n  box-sizing: content-box !important;\n  font-size: 10pt !important;\n  padding: 0 !important;\n  line-height: 1 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n  -webkit-appearance: none !important;\n  border: 0 !important;\n  border: none !important;\n  padding-top: 3px !important;\n  left: 0 !important;\n  width: 100% !important;\n  height: 20px !important;\n}\n#command_bar_mode {\n  font-family: monospace !important;\n  font-size: 10pt !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n  min-height: 0 !important;\n  background-repeat: none !important;\n  background-position: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n  vertical-align: none !important;\n  -webkit-appearance: none !important;\n  box-shadow: none !important;\n  font-family: monospace !important;\n  outline: 0 !important;\n  border: 0 !important;\n  margin: 0 !important;\n  font-size: 10pt !important;\n  padding: 0 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  line-height: 1 !important;\n  box-sizing: content-box !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  border: 0 !important;\n  padding-left: 2px !important;\n  height: 100% !important;\n  width: 10px !important;\n  /*top: 0 !important;*/\n}\n#command_input {\n  min-height: 0 !important;\n  background-repeat: none !important;\n  background-position: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n  box-sizing: content-box !important;\n  vertical-align: none !important;\n  font-family: monospace !important;\n  width: calc(100% - 10px) !important;\n  position: absolute !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n  border: 0 !important;\n  margin: 0 !important;\n  -webkit-appearance: none !important;\n  font-size: 10pt !important;\n  line-height: 1 !important;\n  padding: 0 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  right: 0 !important;\n  background-color: #1b1d1e !important;\n  outline-style: none !important;\n  border: none !important;\n  color: #bbb !important;\n  height: 100% !important;\n  /*top: 0 !important;*/\n  bottom: 0 !important;\n}\n\n#command_search_results {\n  position: fixed !important;\n  min-height: 0 !important;\n  background-repeat: none !important;\n  background-position: none !important;\n  border: none !important;\n  border-radius: 0 !important;\n  vertical-align: none !important;\n  z-index: 9999999999 !important;\n  background-color: #393E40 !important;\n  color: #fff !important;\n  display: none;\n  box-shadow: none !important;\n  border: 0 !important;\n  margin: 0 !important;\n  font-family: monospace !important;\n  font-size: 10pt !important;\n  padding: 0 !important;\n  line-height: 1 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n  -webkit-appearance: none !important;\n  border: 0 !important;\n  /*top: 20px !important;*/\n  border: none !important;\n  box-sizing: border-box !important;\n  padding: 3px; !important;\n  left: 0; right: 0;\n  margin: 0 auto;\n}\n\n#command_search_results ul,\n#command_search_results .command-data-node,\n#command_search_results .command-history-data-node {\n  box-shadow: none !important;\n  border: 0 !important;\n  margin: 0 !important;\n  font-size: 10pt !important;\n  padding: 0 !important;\n  font-family: monospace !important;\n  line-height: 1 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  text-shadow: none !important;\n  text-align: start !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n  -webkit-appearance: none !important;\n  border: 0 !important;\n  border: none !important;\n  list-style: none !important;\n  padding: 0 !important;\n  margin: 0 !important;\n}\n\n\n#command_search_results .command-data-node div,\n#command_search_results .command-history-data-node div {\n  box-shadow: none !important;\n  border: 0 !important;\n  font-size: 10pt !important;\n  line-height: 1 !important;\n  letter-spacing: normal !important;\n  word-spacing: normal !important;\n  text-transform: none !important;\n  text-indent: 0px !important;\n  font-family: monospace !important;\n  font-size: 10pt !important;\n  text-shadow: none !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n  -webkit-appearance: none !important;\n  border: 0 !important;\n  padding: 2px !important;\n}\n\n.completion-descriptions {\n  font-style: italic !important;\n  white-space: nowrap !important;\n  float: right !important;\n  text-overflow: ellipsis !important;\n  max-width: 35%;\n  color: #bbb;\n  text-align: right !important;\n}\n'
};

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  if (request.getSettings) {
    var settings = {};
    for (var key in settingsDefault) {
      if (localStorage[key]) {
        settings[key] = localStorage[key];
      } else {
        settings[key] = settingsDefault[key];
      }
    }
    response(settings);
  }
});