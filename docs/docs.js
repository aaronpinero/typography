// PROCESSING THE DOCUMENTATION HTML

// include fs for reading/writing files
var fs = require('fs');

// include templatejs for parsing template language
var templatesjs = require('templatesjs');

// where we are storing our include files
templatesjs.dir = "./docs/includes/";

// object identifying the source location and the output location for our HTML files
var filepath = {};
filepath.source = './docs/content/';
filepath.dest = './docs/';

// read our source directory
var dir = fs.readdir(filepath.source,function(err,files){
	if (err) throw err;
	if (files.length) {
		var x;
		for (x=0;x<files.length;x++) {
		  // for each found file, read the file, process it with templatejs, and write the result
			var file = fs.readFileSync(filepath.source+files[x]);
			var finished = templatesjs.setSync(file);
			fs.writeFileSync(filepath.dest+files[x],finished);
		}
	}
});

// PROCESSING THE DOCUMENTATION CSS

// include glob for filtered traverse of directory
var glob = require("glob");

// include sass for compiling sass to css
var sass = require('node-sass');

// variable that will hold the contents of the concatenated scss
var scss = fs.readFileSync('./docs/resources/scss/tyfy-docs-base.scss');;

// read components directory for scss files; do everything in this function because async
glob("./docs/resources/scss/components/**/*.scss", function(err, files){
	if (err) throw err;
	if (files.length) {
		var x;

		// for each scss file, add the code to the main scss
		for (x=0;x<files.length;x++) {
			scss += "\n" + fs.readFileSync(files[x]);
		}

		// add the main tyfy docs class
		scss += "\n" + fs.readFileSync('./docs/resources/scss/tyfy-docs.scss');

		// write a temporary file that contains all the scss
		fs.writeFileSync('./docs/resources/scss/tyfy-docs-all.scss',scss);

		// render the scss as css
		sass.render({
		  file: './docs/resources/scss/tyfy-docs-all.scss',
			sourceComments: true
		}, function(err, result) {
			if (err) throw err;

			// write the rendered css
			fs.writeFileSync('./docs/resources/style/tyfy-docs.css',result.css);

			// remove temporary file
			fs.unlinkSync('./docs/resources/scss/tyfy-docs-all.scss');
		});
	}
});