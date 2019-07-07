// set animation duration
const tyduration_collapse = 500;

// identify heading tags
const heading_tags = new Array('H1', 'H2', 'H3', 'H4', 'H5', 'H6');

// identify everything that has the class 'collapsable'
let all_collapsables = Array.from(document.getElementsByClassName('collapsable'));
let ty_collapsables = new Array();

// if there was anything with the 'collapsable class'
if (all_collapsables.length) {
  // we want to filter this list down to any HTML heading
  // that doesn't already have the 'tyfy-collapsable-processed' class
  ty_collapsables = all_collapsables.filter(collapsable => heading_tags.includes(collapsable.tagName));
  ty_collapsables = ty_collapsables.filter(collapsable => !collapsable.classList.contains('tyfy-collapsable-processed'));
  
  // if there are any ty_collapsables
  if (ty_collapsables.length) {
  
    // for each ty_collapsable
    // identify and wrap the heading's children
    // NOTE: iterate in reverse because javascript doesn't like what I'm doing
    // when I remove nodes and then add them back; starting from the end
    // avoids this problem)
    
    let a = ty_collapsables.length - 1;
    for (a; a >= 0; a--) {
      // wrap my children in a div that has the class 'ty-collapsables'
      // children are defined as all following sibling tags up to
      // the next heading tag of equal or higher ordinal
      
      // create the wrapper
      let ty_collapsables_wrapper = document.createElement("div");
      
      // apply class to the wrapper
      // apply state class to the wrapper (default closed)
      ty_collapsables_wrapper.className = "tyfy-collapsables closed";
      
      // what's my tag?
      let my_tag = ty_collapsables[a].tagName;
      
      // what tags am I looking for to end the collapsable section?
      let h_index = heading_tags.indexOf(my_tag);
      let break_at = new Array();
      let b = 0;
      do {
        break_at[b] = heading_tags[b]
        b++;
      } while (b <= h_index);
      
      // add the wrapper to the page below the collapsable heading
      ty_collapsables[a].parentNode.insertBefore(ty_collapsables_wrapper,ty_collapsables[a].nextElementSibling);
      
      // cycle through following siblings of the collapsable heading
      // adding them to the wrapper
      // until a tag that is in the break_at list
      let next_sib = ty_collapsables_wrapper.nextElementSibling;
      console.log(next_sib);
      while (next_sib && !break_at.includes(next_sib.tagName)) {
        // add the element to the wrapper
        ty_collapsables_wrapper.appendChild(next_sib);
        
        // move on to the next sibling
        next_sib = ty_collapsables_wrapper.nextElementSibling;
        console.log(next_sib);
      }
      
      // set 'closed' as the initial state
      ty_collapsables[a].classList.add('closed');

      // add event listener for click action
      ty_collapsables[a].addEventListener("click",function(){
        if (this.classList.contains('closed')) {
          this.classList.remove('closed');
          this.nextElementSibling.classList.remove('closed');
        }
        else {
          this.classList.add('closed');
          this.nextElementSibling.classList.add('closed');
        }
      });
            
      // indicate that the heading has been processed by javascript
      ty_collapsables[a].classList.add('tyfy-collapsable-processed');
    }
  }
}

