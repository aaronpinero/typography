'use strict';




var fs = require('fs');
/** 

** the default delimiter is % which will be used as <% %>

*/

exports.delim = "%";
exports.dir=""
var midFile="";
var style = "";

/**

** include any file that is demanded using the <%include filename%> tag

*/
exports.dir;

function includeSync(){
	
	while(midFile.indexOf("<"+exports.delim+"include") !=-1){
		var start = midFile.indexOf("<"+exports.delim+"include");
		var cutstr = midFile.substr(start);
		var tag = cutstr.substr(0, cutstr.indexOf(exports.delim+">")+2); 
		var fileName = tag.substr(10, tag.length-12).replace(/ /g,'');
		var file = fs.readFileSync(exports.dir+fileName);
		midFile = midFile.replace(tag, file);
		
	}
	return midFile;
}

function include(cb){
	if(!cb){
		var exception  = "Error: No callback function defined, use setSync() instead of set() for synchronized output!"
		throw exception;
		return;
	}
	var fileArr=[], posArr=[];
	
	/**
	
	**because while loops don't wait for a asynchronous func to complete 
	**fs.readFile can't be nested inside a while loop
	**solution is to create an array of filenames and postions tpo include them
	**and perform a forEach loop
	
	*/
	while(midFile.indexOf("<"+exports.delim+"include")!=-1){
		var start = midFile.indexOf("<"+exports.delim+"include");
		var cutstr = midFile.substr(start);
		var tag = cutstr.substr(0, cutstr.indexOf(exports.delim+">")+2); 
		var fileName = tag.substr(10, tag.length-12).replace(/ /g,'');
		midFile= midFile.replace(tag,"<%&"+fileName+"here%>");
		fileArr[fileArr.length] = fileName;
		posArr[posArr.length] = start;
	}
	if(fileArr.length == 0){
		return cb(null,midFile);
	}
	var counter=0;
	fileArr.forEach(function(name, index){
		fs.readFile(exports.dir+name, function(err,data){
			if(err) {
				return cb(err);
			}
			midFile=midFile.replace("<%&"+name+"here%>", data); 
			
			counter++;
			if(counter >= fileArr.length){
				return cb(null,midFile);
			}
		});
		
		
	});
	
	
			
}

/** 
**the data must be set once for each page
**operations will be performed on the data rendered , not on the file
*/
exports.set = function setData(data,cb){
	midFile =String(data);
	return include(cb);
}


exports.setSync = function setDataSync(data){
	midFile = String(data);
	return includeSync();
}

/**

**this module works using the replace() function
**it will replace the <%keyword %> tag with the value given for "keyword"

*/
function replaceString(tag, value){

	
	
/**

** all tags with the same keyword will be replaced with same value
** if value is given twice for a tag using the render() function the tag will have first given value

*/
	while(midFile.indexOf(tag)!= -1){ 
	
/**

** doing the main thing here
** a value string value can be rendered to the page in upeercase or lower case  or capitalized form
** using the the third param as "CASE" (for uppercase) "case" (for lowercase) "Case" (for capitalizing the first word)
** or undefined for normal

*/
			if(typeof(value) == "string"){
				switch(style){
					case("CASE"):
						var result = midFile.replace(tag, value.toUpperCase());
						style="";
						break;
					case("case"):
						var result = midFile.replace(tag, value.toLowerCase())
						style="";
						break;
					case("Case"):
						var fstr = value.substr(0,1).toUpperCase();
						var lstr = value.substr(1).toLowerCase();
						var mstr = fstr+lstr;
						var result = midFile.replace(tag, mstr)
						style="";
						break;
					case(""):
						var result = midFile.replace(tag, value)
						style="";
						break;
					default:
						var result = midFile.replace(tag, value)
						exception = " \n templatesjs ERROR 103 : Invalid Flag provided (\""+style+"\") tag "+tag;
						style="";
						break;
						
				}
		midFile = result;
	}
	else{
		var result = midFile.replace(tag, value);
		midFile = result;
	}
	return midFile;
}
}

function replaceArray(tag, value, format , start, end){
	
	while(midFile.indexOf(tag)!=-1){
		
		var midResult="";
		var output="" ;
		var loopx = start;
		var loopy = end;
		while(midFile.indexOf(tag)!= -1){ // checking for another tag with same variable
			while(loopx<=loopy){ // looping for each value
				midResult = format;
				while(midResult.indexOf("*") != -1){ // replacing all * with values
					
					if(typeof(value[loopx]) == "string"){
						switch(style){
							case("CASE"):
								midResult = midResult.replace("*",value[loopx].toUpperCase());
								break;
							case("case"):
								midResult = midResult.replace("*",value[loopx].toLowerCaseCase());
								break;
							case("Case"):
								var fstr = value[loopx].substr(0,1).toUpperCase();
								var lstr = value[loopx].substr(1).toLowerCase();
								var mstr = fstr+lstr;
								midResult = midResult.replace("*",mstr);
								break;
							case(""):
								midResult = midResult.replace("*",value[loopx]);
								break;
							default:
								midResult = midResult.replace("*",value[loopx]);
								exception = " \n templatesjs ERROR 103 : Invalid Flag provided (\""+style+"\") for tag "+tag;
								style ="";
								break;
								
						}
					}else{
						
						midResult = midResult.replace("*",value[loopx]);
					}
					
				}
				output +=midResult;
				loopx ++;
			}
			midFile = midFile.replace(tag, output);
		}
		return midFile;
	}
	
}

/**

	** getting the type of data wanted from the file to be rendered 
	
*/
 var exception;	
 var finalised;
function getType(vName, vValue,flag){

/**

**if the data is not set the module will have nothing to work with
** so it will produce an error
**a data must be set using the set() function or an error will be printed on the console

*/
	
	if(!midFile || midFile =="" ||midFile=="undefined"){
		return exception = "No Data recieved, Use set() or setSync() to set data before render";
	}
	
	/**
		**if the third optional param flag is provided the output will be formatted according to the flag
		
	*/
	if(flag) {style =flag;}
	
	/**
	
		**a loop will run untill there is no tag remainig in the data with the same keyword
		** this will ensure that all the same tags are replaced with the same keyword
		
	*/
	while(midFile.indexOf("<"+exports.delim+vName) !=-1){
		var string = String(midFile); 
	/**
		** this will get starting index of the tag with given keyword
	*/
		var start = string.indexOf("<"+exports.delim+vName);
		
		/**
		
			**this snippet of code will get the tag to be changed 
			
		*/
		
		var findStart = string.substr(start); 
		var end = findStart.indexOf(exports.delim+">"); 
		var tag = findStart.substr(0, end+2); 
		
		/**
			** the tag is in string format now
			** it needs to be converted into array so that it can work with JSON.parse() function
			
		*/
		var halfArray = tag.replace("<"+exports.delim, "[\"");
		var getArray = halfArray.replace(exports.delim+">", "\"]");
		
		/**
		
			** this will check if the output need to be formatted using any element around it
			** so that the value can be looped through having html elements or toher elements around it
			
		*/
		
		if(getArray.indexOf("{") != -1){
			getArray = getArray.replace("{", "\",\"");
			getArray = getArray.replace("}", "");
		}
		
		/**
		
			** the string found on the file will be converted into an  array
			
		*/
		
		var array = JSON.parse(getArray);  
		/**/
		var getIndex = String(array[0]);
		
		/**
		
		** checking if the converted array has only one value which means it is not supposed to formatted
		
		*/
		if(array.length == 1 && array[0].indexOf("[") == -1){
			
			/**
				** checing if the tag has to be replaced with any object's specific value 
			*/
			if(array[0].indexOf(".") !=-1){
				var result;
				var objStr = array[0].substr(array[0].indexOf(".")+1, array[0].length-array[0].indexOf(".")-1).replace(/ /g,'');
				result = replaceString(tag, vValue[objStr]);
			}else{
				
				/**
				
					**the value is expected to be a string but other data types can also be rendered using this
					** function to avoid  complexity in code
					** but it will only work fine if he tag is placed inside client side JS where it can be parsed using
					** the JSON.parse() format manually
					
				*/
				
				result = replaceString(tag, vValue);
			}
			finalised =result;
		}
		
		/**
			**this will check if the tag demands an array to be replaced with 
		*/
		if(array.length == 1 && array[0].indexOf("[") !=-1 ){
			var varString = array[0].substr(array[0].indexOf("["));
			var indexes = JSON.parse(varString);
			
			/**
				**if no specific index of array is given all values of the give value array will be looped through
			*/
			if (indexes.length == 0){
				num1 =0;
				num2 = vValue.length -1;
				finalised = replaceArray(tag, vValue, "*", num1, num2) 
			}
			
			/**
				** if any specific index of array is given only the specific value will be replaced with 
			*/
			
			if (indexes.length == 1){
				var num = Number(indexes[0]);
				var result = replaceString(tag, vValue[num]);
				finalised =result;
			}
			
			/**
				**if there is two indexes specified a loop will be performed from the first specified index 
				**till the second one
			*/
			
			if(indexes.length == 2){
				var num1 = indexes[0];
				var num2 = indexes[1];
				finalised =replaceArray(tag, vValue, "*", num1, num2) 
			}
			
		}
		
		/**
		
			**checking if the converted array has more than one value
			** the value of the array will be formmatted using the given formation
			
		*/
		
		if(array.length >1){
			var varString = getIndex.substr(getIndex.indexOf("["));
			var indexes = JSON.parse(varString); 
			var format = String(array[1]); 
			var num1, num2;
			
			//if two indexes are specified a loop will be performed
			
			if(indexes.length ==2){
				num1 = indexes[0];
				num2 = indexes[1];
			}
			
			//if only one index is specified 
			
			if(indexes.length == 1){
				num1=num2 = indexes[0];
				
			}
			
			// if a loop through the whole array is required
			
			if(indexes.length == 0){
				num1 =0;
				num2 = vValue.length -1;
			}
			
			finalised =replaceArray(tag, vValue,format, num1, num2);
		}
	}
	return finalised;
	
}
exports.renderSync=function renderSync(name, value,flag){
	getType(name,value,flag);
	if(exception){
		throw exception;
	}else{
		return finalised
	}
}

exports.render = function render(name,value, flag, cb){
	if(!flag){
		exception  = "Error: No callback function defined, use renderSync() instead of render() for synchronized output!"
		throw exception;
		return;
	}
	if(!cb){
	    if(typeof(flag) !="function" ){
			exception  = "Error: No callback function defined, use renderSync() instead of render() for synchronized output!"
			throw exception;
			return;
		}else{
			getType(name,value);
			if(exception){
				flag(exception);
			}else{
				flag(null,finalised);
			}
		}
	}else{
		getType(name,value,flag);
		if(exception){
			cb(exception);
		}else{
			cb(null,finalised);
		}
	}
}

exports.renderAll = function renderAll(obj, cb){
	if(typeof(obj) !="object"){
		
		console.log("ty:"+typeof(obj));
		exception  = "Error: first argument must be an object for function : renderAll()"
		throw exception;
		return;
	}
	for(var x in obj){
		getType(x,obj[x]);
	}
	
	if(exception){
			cb(exception);
	}else{
		cb(null,finalised);
	}
}
exports.renderAllSync = function renderAllSync(obj){
	if(typeof(obj) != "object"){
		exception  = "Error: first argument must be an object for function : renderAll()"
		throw exception;
		return;
	}
	for(var x in obj){
		getType(x,obj[x]);
	}
	if(exception){
		throw exception;
	}else{
		return finalised
	}
}
 
/**
**declaring shorthands
*/
exports.ren = exports.r = exports.rn = exports.render;
exports.renSync=exports.rSync = exports.rnSync = exports.renderSync;  

exports.setData =exports.setdata = exports.sd = exports.s = exports.set;
exports.setDataSync =exports.setdataSync = exports.sdSync = exports.sSync = exports.setSync;

exports.renall = exports.renAll = exports.rAll = exports.rall =exports.rnall = exports.rnAll= exports.renderAll;
exports.renallSync = exports.renAllSync = exports.rAllSync = exports.rallSync =exports.rnallSync = exports.enAllSync= exports.renderAllSync;


