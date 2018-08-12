var fs = require('fs');
var templatesjs = require('templatesjs');
templatesjs.dir = "./docs/includes/";

var filepath = {};
filepath.source = './docs/pages/';
filepath.dest = './docs/';

var dir = fs.readdir(filepath.source,function(err,files){
	if (err) throw err;
	if (files.length) {
		var x;
		for (x=0;x<files.length;x++) {
			var file = fs.readFileSync(filepath.source+files[x]);
			var finished = templatesjs.setSync(file);
			fs.writeFileSync(filepath.dest+files[x],finished);
		}
	}
});