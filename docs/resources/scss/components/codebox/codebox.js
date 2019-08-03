var codeboxes = document.getElementsByClassName("codebox");
var x;
for (x=0;x<codeboxes.length;x++) {
  var codetags = codeboxes[x].getElementsByTagName("code");
  var y;
  for (y=0;y<codetags.length;y++) {
    var codetagclass = codetags[y].getAttribute('class');
    var codetagclasses = codetagclass.split(' ');
    codetagclasses = codetagclasses.filter(tagclass => tagclass.indexOf('language-') == 0);
    var lang = (codetagclasses.length) ? codetagclasses[0].split('-')[1] : false;
    if (lang) {
      // write the lang into the codebox
      var label = document.createElement("div");
      var label_text = document.createTextNode('// ' + lang);
      label.className = "codebox-label";
      label.appendChild(label_text);
      if (codeboxes[x].firstChild !== null) {
        codeboxes[x].insertBefore(label,codeboxes[x].firstChild);
      }
      else {
        codeboxes[x].appendChild(label);
      }
    }
  }
}
  
  
