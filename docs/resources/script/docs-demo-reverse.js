// get all code elements with the class "language-html"
let examples = Array.from(document.getElementsByTagName('code'));
examples = examples.filter(example => example.classList.contains('language-html'));

// get all figures with the class "reverse"
let figures = Array.from(document.getElementsByTagName('figure'));
figures = figures.filter(figure => figure.classList.contains('reverse'));

// for each figure
let x = 0;
for (x;x<figures.length;x++) {
  // insert a "reverse" toggle button
  let toggle = document.createElement('div');
  toggle.innerHTML = 'Reverse';
  toggle.classList.add('reverse-toggle');
  toggle.classList.add('tybutton');
  figures[x].appendChild(toggle);
  
  // set an event handler for this toggle button
  toggle.addEventListener("click",function(){
    // if this figure has the reverse class
    figure = this.parentNode;
    if (figure.classList.contains('reverse')) {
      // remove the reverse class on this element
      figure.classList.remove('reverse');

      // remove the reverse class on this element's first child div
      figure.firstElementChild.classList.remove('reverse');
      
      // hide the class attribute in the codebox associated with this figure
      figure.previousElementSibling.getElementsByClassName('attr-value').item(0).classList.add('tyhidden');
    }
    else {
      // add the reverse class on this element
      figure.classList.add('reverse');

      // add the reverse class on this element's first child div
      figure.firstElementChild.classList.add('reverse');
      
      // show the class attribute in the codebox associated with this figure
      figure.previousElementSibling.getElementsByClassName('attr-value').item(0).classList.remove('tyhidden');
    }
  });
}
  
      
