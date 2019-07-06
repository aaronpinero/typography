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
    let a = 0;
    for (a; a < ty_collapsables.length; a++) {
      // wrap my children in a div that has the class 'ty-collapsables'
      // children are defined as all following sibling tags up to
      // the next heading tag of equal or higher ordinal
      
      // create the wrapper
      let ty_collapsables_wrapper = document.createElement("div");
      ty_collapsables_wrapper.className = "ty-collapsables";
      
      // what's my tag?
      let my_tag = ty_collapsables[a].tagName; // console.log('my tag name is ' + my_tag);
      
      // what tags am I looking for to end the collapsable section?
      let h_index = heading_tags.indexOf(my_tag); // console.log('my index is ' + h_index);
      let break_at = new Array();
      let b = 0;
      do {
        break_at[b] = heading_tags[b]
        b++;
      } while (b <= h_index);
      
      // cycle through following siblings of the collapsable heading
      // adding them to the wrapper
      // until a tag that is in the break_at list
      
    }
  }
}

