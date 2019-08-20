// get all of the link elements in the main menu
let n = document.getElementsByClassName('nav-main').item(0);
let links = Array.from(n.getElementsByTagName('a'));
let urlparts = window.location.href.split('/');
let link_index = -1; // where to store the index of the current page link

// find the one where the href is the same as the current page
var i = 0;
for(i;i<links.length;i++) {
  if (links[i].getAttribute('href') == urlparts[urlparts.length - 1]) {
    link_index = i;
  }
}

// write next and previous buttons into the page
if (link_index != -1) {
  if (link_index > 0) { // create previous link
    let prev_link = document.createElement("a");
    prev_link.innerHTML = "Previous Page: " + links[link_index - 1].innerHTML;
    prev_link.setAttribute('href',links[link_index - 1].getAttribute('href'));
    document.getElementsByTagName('main').item(0).appendChild(prev_link);
  }
  if (link_index < links.length - 2) { // create next link
    let next_link = document.createElement("a");
    next_link.innerHTML = "Next Page: " + links[link_index + 1].innerHTML;
    next_link.setAttribute('href',links[link_index + 1].getAttribute('href'));
    document.getElementsByTagName('main').item(0).appendChild(next_link);
  }
}