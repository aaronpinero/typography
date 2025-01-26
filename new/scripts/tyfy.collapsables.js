// Set animation duration.
const tyduration_collapse = 500;

// Identify heading tags
const heading_tags = new Array('H1', 'H2', 'H3', 'H4', 'H5', 'H6');

function TyfyCollapsablesOn() {
  // Identify everything that has the class 'collapsable'.
  let tyfy_collapsables = Array.from(document.querySelectorAll(':is(h2,h3,h4,h5,h6).collapsable:not(.tyfy-collapsable-processed)'));
  if (tyfy_collapsables.length === 0) { return; }
  
  // For each tyfy_collapsable, identify and wrap the child nodes.
  // NOTE: Iterate in reverse; javascript doesn't like when
  // I remove nodes and then add them back; starting from the end
  // avoids this problem).
  let a = tyfy_collapsables.length - 1;
  for (a; a >= 0; a--) {
    // Determine the desired initial state.
    let initially_open = tyfy_collapsables[a].classList.contains('open');
    
    // Turn the heading into a button. First, create the button:
    let tyfy_collapsable_button = document.createElement("button");
    
    // Set initial aria state.
    tyfy_collapsable_button.setAttribute('aria-expanded',initially_open);
    
    // Move the contents of the header into this button; place the button.
    tyfy_collapsable_button.innerHTML = tyfy_collapsables[a].innerHTML;
    tyfy_collapsables[a].innerHTML = "";
    tyfy_collapsables[a].appendChild(tyfy_collapsable_button);
    
    // Wrap children in a div that has the class 'tyfy-collapsables'.
    // Children are all following sibling tags up to
    // the next heading tag of equal or higher ordinal
    // create the wrapper
    let tyfy_collapsables_wrapper = document.createElement("div");
    
    // Apply classes to the wrapper.
    if (initially_open) { tyfy_collapsables_wrapper.className = "tyfy-collapsables"; }
    else { tyfy_collapsables_wrapper.className = "tyfy-collapsables closed hiding"; }
    
    // add the wrapper to the page below the collapsable heading
    tyfy_collapsables[a].parentNode.insertBefore(tyfy_collapsables_wrapper,tyfy_collapsables[a].nextElementSibling);
    
    // What tags am I looking for to end the collapsable section?
    let my_tag = tyfy_collapsables[a].tagName;
    let h_index = heading_tags.indexOf(my_tag);
    let break_at = heading_tags.slice(0,(h_index + 1));
    
    // Cycle through following siblings of the collapsable heading,
    // adding them to the wrapper until a tag that is in the break_at list.
    let next_sib = tyfy_collapsables_wrapper.nextElementSibling;
    while (next_sib && !break_at.includes(next_sib.tagName) && !next_sib.classList.contains('collapsable-break')) {
      // Add the element to the wrapper.
      tyfy_collapsables_wrapper.appendChild(next_sib);
      
      // Move on to the next sibling.
      if (next_sib.classList.contains('collapsable-end')) { next_sib = null; }
      else { next_sib = tyfy_collapsables_wrapper.nextElementSibling };
    }

    // Set the initial state.
    if (initially_open) { tyfy_collapsables[a].classList.remove('open'); }
    else { tyfy_collapsables[a].classList.add('closed'); }

    // Add event listener for click action.
    tyfy_collapsables[a].addEventListener("click",function(){
      // Find the collapsed content
      var collapsables = this.nextElementSibling;
      var btn = this.querySelector("button");
      
      // If we are opening:
      if (this.classList.contains('closed')) {
        // Remove the closed state on the heading.
        this.classList.remove('closed');
        btn.setAttribute("aria-expanded","true");
        collapsables.classList.remove('hiding');
    
        // Get the scroll height of the collapsed content.
        let h = collapsables.scrollHeight;
    
        // Set the height for transition.
        collapsables.setAttribute('style','height:'+h+'px;');
    
        // Remove the closed class.
        collapsables.classList.remove('closed');
      }
      // Else we are closing:
      else {
        // Reference this.
        that = this;
    
        // Add the transition and closed states on the heading.
        // Delay the closed to match the collapsing content.
        setTimeout("that.classList.add('closed');",25);
        setTimeout("that.querySelector('button').setAttribute('aria-expanded','false');",25);
        
        // Get the height value of collapsed content.
        // get the height value of collapsed content; the value will be
        // equivalent to clientHeight minus top and bottom padding
        let h = collapsables.clientHeight;
        let collaspableStyles = window.getComputedStyle(collapsables);
        h = h - parseInt(collaspableStyles.getPropertyValue('padding-bottom')) - parseInt(collaspableStyles.getPropertyValue('padding-top'));
        
        // Set the height for the transition.
        collapsables.setAttribute('style','height:'+h+'px;');
        
        // Need to delay the addition of the closed class by a tick.
        // Otherwise the transition will not happen properly
        setTimeout("that.nextElementSibling.classList.add('closed');",25);
        // Used 25 as this seemed to be enough delay to get the transition to work in Firefox, Chrome, and Safari
      }
    });
    
    // Add event listener for transitions ends on the collapsed content.
    tyfy_collapsables[a].nextElementSibling.addEventListener("transitionend",function(){
      // When a transition ends, remove the style attribute and the transition state class.
      this.setAttribute("style","");
      if (this.classList.contains('closed')) {
        this.classList.add('hiding');
      }
    });
          
    // indicate that the heading has been processed by javascript
    tyfy_collapsables[a].classList.add('tyfy-collapsable-processed');
  }
  
  // Perform hash detection.
  TyfyDetectAnchorLink();
    
  // set window hashchange event
  window.addEventListener("hashchange", TyfyDetectAnchorLink);
}

// Enable collapsable headings.
TyfyCollapsablesOn();


function TyfyDetectAnchorLink() {
  if (window.location.hash != '') {
    // Get the anchor name.
    let selected_anchor_name = window.location.hash.substring(1);
    
    // Get the anchor item.
    // The item is either an element where the id attribute is equal to the anchor name
    // or the item is a link where the name attribute is equal to the anchor name.
    let selected_anchor = (document.getElementById(selected_anchor_name) !== null) ? document.getElementById(selected_anchor_name) : document.querySelector('a[name="'+selected_anchor_name+'"]');
    if (!selected_anchor) { return; }
    
    // Determine if the anchor is in a collapsable section.
    let parents = new Array();
    let parent = selected_anchor.parentNode;
    while (parent !== document) {
      if (parent.classList.contains('tyfy-collapsables')) {
        parents.push(parent);
      }
      parent = parent.parentNode;
    }
    if (parents.length === 0) { return; }
    
    // Open collapsables.
    let a = 0;
    for(a; a<parents.length; a++) {
      parents[a].classList.remove('closed');
      parents[a].classList.remove('hiding');
      parents[a].previousElementSibling.classList.remove('closed');
      parents[a].previousElementSibling.querySelector("button").setAttribute('aria-expanded','true');
    }
        
    // move the page to the anchor item
    window.location.href = window.location.href
  }
}