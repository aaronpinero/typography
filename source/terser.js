var Terser = require("terser");
var fs = require('fs');
var glob = require("glob");
glob("./source/script/*.js", function(err, files) {
	if (err) throw err;
	if (files.length) {
	  var x;
		for (x=0;x<files.length;x++) {
		  var filename = files[x].split("/");
		  filename = filename[filename.length - 1];
		  fs.writeFileSync('./dist/script/'+filename,Terser.minify(fs.readFileSync(files[x],"utf8")).code);
		}
	}
});
