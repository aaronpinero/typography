// this script collects the source js, minifies it, and outputs it to the distribution folder

// module for minifying js
var Terser = require("terser");

// module to read/write files
var fs = require('fs');

// module to allow filtered search of directories
var glob = require("glob");

// run a function on all .js files in the target directory
glob("./source/script/*.js", function(err, files) {
	if (err) throw err;
	
	// if there are files
	if (files.length) {
	  var x;
	  
	  // for each file...
		for (x=0;x<files.length;x++) {
		
		  // get the file name; the output file name is the same as the input file name
		  var filename = files[x].split("/");
		  filename = filename[filename.length - 1];
		  
		  // minify the code and write it to the dist folder
		  fs.writeFileSync('./dist/script/'+filename,Terser.minify(fs.readFileSync(files[x],"utf8")).code);
		}
	}
});
