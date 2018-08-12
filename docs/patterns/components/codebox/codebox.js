// add labels to code boxes

// find all code boxes
var codeboxes = document.getElementsByClassName('codebox');

// for each code box
var x;
for(x=0;x<codeboxes.length;x++) {

  // get the value of the data-lang attribute which will be the label text
  lang = codeboxes[x].getAttribute('data-lang');

  // if there is a value in the attribute
  if (lang != null && lang != '') {

    // insert the label before the code box
    codeboxes[x].insertAdjacentHTML('beforebegin','<div class="codebox-label">'+lang+'</div>');
  }
}