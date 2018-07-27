// identify elements
var header = document.getElementsByClassName('brand');
var nav = header[0].getElementsByTagName('nav');
var nav_btn = nav[0].getElementsByTagName('h2');
var nav_tabs = nav[0].getElementsByClassName('navtab');
var nav_initial_class = (nav[0].getAttribute('class') == null) ? '' : nav[0].getAttribute('class');

// initial processing of menu
if (nav_initial_class.indexOf('nav-processed') == -1) {
	// has not yet been processed by javascript; do so now

	// add event listener for mobile nav button
	nav_btn[0].addEventListener('click',ToggleNavOpen);
	nav[0].setAttribute('class',('nav-processed ' + nav_initial_class));

	// add event listeners for expandable menu options
	var x;
	for (x=0; x<nav_tabs.length; x++) {
		AddClass(nav_tabs[x].parentNode,'has-navtab');
		nav_tabs[x].parentNode.addEventListener('mouseover',NavtabHoverOn,{once:true});
	}
}

// toggling open and close of menu for mobile case
function ToggleNavOpen() {
	var nav_current_class = (nav[0].getAttribute('class') == null) ? '' : nav[0].getAttribute('class');
	if (nav_current_class.indexOf('nav-open') == -1) {
		nav[0].setAttribute('class',('nav-open ' + nav_current_class));
	}
	else {
		var nav_new_class = nav_current_class.replace('nav-open','');
		nav[0].setAttribute('class',nav_new_class);
	}
}

var open_navtab = false;

// hover nav tab
function NavtabHoverOn(event) {
	// sometimes the event target will be the list item, sometimes it will be a child element; need to account for both
	var target = event.target;
	var target_class = (target.getAttribute('class') == null) ? '' : target.getAttribute('class');
	var navoption;
	var navoption_class;
	if (target_class.indexOf('has-navtab') != -1) {
		navoption = target;
		navoption_class = target_class;
	}
	else {
		var parent = target.parentNode;
		var parent_class = (parent.getAttribute('class') == null) ? '' : parent.getAttribute('class');
		while (parent_class.indexOf('has-navtab') == -1) {
			parent = parent.parentNode;
			parent_class = (parent.getAttribute('class') == null) ? '' : parent.getAttribute('class');
		}
		navoption = parent;
		navoption_class = parent_class;
	}
	if (navoption_class.indexOf('navtab-hover') == -1) {
		AddClass(navoption,'navtab-hover');
		document.addEventListener('mouseover',NavtabHoverOff,true);
	}
}

// close nav tab
function NavtabHoverOff(event) {
	var target = event.target;
	var hovered = document.getElementsByClassName('navtab-hover'); console.log('hovered count is: ' + hovered.length);
	var y;
	for (y=0; y<hovered.length; y++) {
		var nav_option = hovered[y];
		is_contained = nav_option.contains(target);
		// console.log('target is contained:' + is_contained);
		if (!is_contained) {
			RemoveClass(nav_option,'navtab-hover');
			nav_option.addEventListener('mouseover',NavtabHoverOn,{once:true});
		}
	}
	var now_hovered = document.getElementsByClassName('navtab-hover'); console.log('new hovered count is: ' + now_hovered.length);
	if (now_hovered.length === 0) {
		document.removeEventListener('mouseover',NavtabHoverOff,true);
	}
}

// add a class name to an element class attribute
function AddClass(el,newclass) {
	// accept an element and a string
	current_class_atr = (el.getAttribute('class') == null) ? '' : el.getAttribute('class');
	new_class_atr = newclass + " " + current_class_atr;
	el.setAttribute('class',new_class_atr);
}

// remove a class name from an element class attribute
function RemoveClass(el,oldclass) {
	// accept and element and a string
	current_class_atr = (el.getAttribute('class') == null) ? '' : el.getAttribute('class');
	new_class_atr = current_class_atr.replace(oldclass,'');
	el.setAttribute('class',new_class_atr);
}