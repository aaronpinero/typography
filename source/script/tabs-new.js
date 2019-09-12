// set animation duration
const tyduration_collapse = 500;

// identify all tab containers
let all_tabcontainers = Array.from(document.getElementsByClassName('tabs-container'));
all_tabcontainers = all_tabcontainers.filter(container => !container.classList.contains('tyfy-tabs-processed'));

// if there are any tab containers
if (all_tabcontainers.length) {
  
  // for each tab container
  // identify the tab labels
  // NOTE: iterate in reverse because javascript doesn't like what I'm doing
  // when I remove nodes and then add them back; starting from the end
  // avoids this problem)

  let a = all_tabcontainers.length - 1;
  for (a; a >= 0; a--) {
    
    // find all the tab labels
    let my_labels = Array.from(all_tabcontainers[a].getElementsByClassName('tab-label'));

    // if there are tab labels, do stuff
    if (my_labels.length) {
      
      // create the container for the visible tabs
      let my_tabs = document.createElement("ul");
      my_tabs.className = "tabs";

      // cycle through tab labels
      let x = my_labels.length - 1;
      for (x; x>= 0; x--) {

        // add a tab for the tab label
        let my_tab = document.createElement("li");
        let my_tab_text = document.createTextNode(my_labels[x].innerText);
        my_tab.setAttribute('data-tabindex',x);
        my_tab.className = 'collapsed';
        my_tab.appendChild(my_tab_text);
        if (my_tabs.firstChild !== null) {
          my_tabs.insertBefore(my_tab,my_tabs.firstChild);
        }
        else {
          my_tabs.appendChild(my_tab);
        }

        // add a click action for the tab
        my_tab.addEventListener("click",function(){
          if (!this.classList.contains('open')) {
            // close all the current opens
            let opens = this.parentNode.parentNode.getElementsByClassName('open');
            let y = opens.length - 1;
            for (y; y >= 0; y--) {
              opens[y].classList.add('collapsed');
              opens[y].classList.remove('open');
            }
            // open the selected tab
            this.classList.remove('collapsed');
            this.classList.add('open');
            let my_tabindex = this.getAttribute('data-tabindex');
            this.parentNode.parentNode.getElementsByClassName('tab-label').item(my_tabindex).classList.remove('collapsed');
            this.parentNode.parentNode.getElementsByClassName('tab-label').item(my_tabindex).classList.add('open');
            this.parentNode.parentNode.getElementsByClassName('tab-panel').item(my_tabindex).classList.remove('collapsed');
            this.parentNode.parentNode.getElementsByClassName('tab-panel').item(my_tabindex).classList.add('open');
          }
        });

        // process the label element
        my_labels[x].classList.add('collapsed');
        my_labels[x].setAttribute('data-tabindex',x);
        my_labels[x].innerHTML = '<a id="'+encodeURIComponent(my_labels[x].innerText)+'">'+my_labels[x].innerText+'</a>';

        // wrap the contents of the tab
        // create the wrapper
        let my_tab_panel = document.createElement("div");
      
        // apply class to the wrapper
        // apply state class to the wrapper (default closed)
        my_tab_panel.className = "tab-panel collapsed";

        // add the tab panel to the page below the tab label
        my_labels[x].parentNode.insertBefore(my_tab_panel,my_labels[x].nextElementSibling);

        // cycle through following siblings of the tab label
        // adding them to the tab panel
        // until the next tab label
        let next_sib = my_tab_panel.nextElementSibling;
        while (next_sib && !next_sib.classList.contains('tab-label')) {
          // add the element to the wrapper
          my_tab_panel.appendChild(next_sib);
          
          // move on to the next sibling
          next_sib = my_tab_panel.nextElementSibling;
        }
      }
      
      // add tabs to tab container
      all_tabcontainers[a].insertBefore(my_tabs,all_tabcontainers[a].firstChild)

      // open the fisrt tab
      my_tabs.getElementsByTagName('li').item(0).classList.remove('collapsed');
      my_tabs.getElementsByTagName('li').item(0).classList.add('open');
      all_tabcontainers[a].getElementsByClassName('tab-label').item(0).classList.remove('collapsed');
      all_tabcontainers[a].getElementsByClassName('tab-label').item(0).classList.add('open');
      all_tabcontainers[a].getElementsByClassName('tab-panel').item(0).classList.remove('collapsed');
      all_tabcontainers[a].getElementsByClassName('tab-panel').item(0).classList.add('open');

      // indicate that the tabs container has been processed by javascript
      all_tabcontainers[a].classList.add('tyfy-tabs-processed');
    }
  }
}
