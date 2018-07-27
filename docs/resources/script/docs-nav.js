// variables
var header = document.getElementsByClassName('brand');
var nav = header[0].getElementsByTagName('nav');
var nav_btn = nav[0].getElementsByTagName('h2');
var nav_initial_class = (nav[0].getAttribute('class') == null) ? '' : nav[0].getAttribute('class');

// initial processing of menu
if (nav_initial_class.indexOf('nav-processed') == -1) {
	// has not yet been processed by javascript; do so now
	nav_btn[0].addEventListener('click',ToggleNavOpen);
	nav[0].setAttribute('class',('nav-processed ' + nav_initial_class));
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