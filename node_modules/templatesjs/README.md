#						templatesjs



### Render dynamic data to your template.

[![Build Status](https://travis-ci.org/ImtiazChowdhury/templatesjs.svg?branch=master)](https://travis-ci.org/ImtiazChowdhury/templatesjs)
[![node](https://img.shields.io/node/v/templatesjs.svg)]()
[![Dependencies](https://img.shields.io/badge/Dependencies-none-brightgreen.svg)]()
[![npm](https://img.shields.io/npm/v/templatesjs.svg)]()

[![npm](https://img.shields.io/npm/l/templatesjs.svg)]()
[![npm](https://img.shields.io/npm/dt/templatesjs.svg)]()

## Features

* **Output data with <%%>**
* **Output String, Array, Object.property**
* **Format Output**
* **UPPERCASE, Capitalized, Lowercase Output**
* **Include**
* **Custom delimiters (e.g., use <# #> instead of <% %>)**
* **Sync and Async versions of all vailable functiond**

###New in 2.0.0
* **renderAll()** : render all variable in one declaration
* **renderAllSync()** : Sync version of `renderAll()`
* **Sync And Async versions of all available functions**  

###Changes Made in 2.0.0
* `render(),set()` requires callback functions . 
* Use `renderSync()` and `setSync()` without callbacks which will behave like `render()` and `set()` of earlier versions.
* use `delim` as a variable instead of function `delim()`
	
## Table of contents:

- [Install](#installation)
- [Usage](#usage)
- [API](#api)
- [Detail Usage](#detail-usage)
    - [String](#string)
    - [Object](#object)
    - [Array](#array)
    - [Loop through array](#loop-through-array)
    - [Loop through specific array indexes](#loop-through-specific-index-of-array)
	- [Specify format of output](#format-of-output)
	- [UPPERCASE, Capitalized, lowercase output](#specify-case)
	- [Include files](#include-file)
	- [Set default directory](#set-default-directory)
	- [Change delimiter](#delimiter-sign)
	- [Shorthands for functions](#shorthands-for-functions)
	
- [Test](#test)

## Installation

  ```sh  
$ npm install templatesjs  
```  

### Using git 
 
  ```sh  
  $ git clone https://github.com/ImtiazChowdhury/templatesjs.git  
 ```  
 
# Usage  


*Example html* :   
```html 

	<body>
		Hello <%name%>
	</body>  
```  
*node.js*

**Sync**   
```js  

	var data = templatesjs.renderSync("name", "John Doe");
	
```  

**Async**  

```js      

	templatesjs.render("name", "John Doe", function(err,data){
		if(err) //Handle err
		
		//Output the data
	});   
```  


*Output* :   
    Hello John Doe



## Multiple variables 

*Example html* :   
  
```html     

	<body>
		Hello <%firstname%> <%lastname%> 
		
	</body>  
```  

*node.js*

**Sync**   
```js    

	var data = templatesjs.renderSync("firstame", "John");
	data = templatesjs.renderSync("lastname", "Doe");  
	
```    

**Async**

```js   
 
	templatesjs.render("firstname", "John", function(err,data){  
		if(err) //Handle err  
		templatesjs.render("lastname", "Doe", function(err,data){  
			if(err) //Handle err  
			//Output the data  
		}
	});    
```    

The function `render()` looks good when working with one or two dynamic data(s). But it will become a *nightmare* for larger amount.
Imagine ten or fifteen dynamic variables to render. That's why in vesion `2.0.0` introducing the function `renderAll()`

the same of the above can be done like this:

**Async**

```js  

	var list = {
		firstname:"John",
		lastname:"Doe"
	}
	
	templatesjs.renderAll(list, function(err,data){
		if(err) //handle the err
		
		//output the data
	});   
```  

**Sync**  
  
```js  

	var list = {
		firstname:"John",
		lastname:"Doe"
	}
	
	var data =templatesjs.renderAll(list);
	// Output the data;  

```  

##Set Data : 

Suppose that we have to work with this : (index.html)
  
```html  
	<html >
	<body>
		Hello Dear <%username%> <br />
		You email : <%email%> <br />
	</body>
	</html>  
```  
here we will walk through a complete example from reading a file to output it.
  
```js  

	//assume that you have a request for index.html
	
	fs.readFile("./index.html", function(err,data){
		if(err) throw err;
		
		//we have to set the file to templatesjs to work with
		//do this once for each file, templatesjs work with the data you set
		
		templatesjs.set(data, function(err,data){
			if(err) throw err;
			
			//now use your favourite function to render 
			var list = {
				username:"John Doe",
				email : "John@Doe.com"
			}
			templatesjs.renderAll(list, function(err,data){
				if(err) throw err;
				res.write(data);
				res.end();
			});
		});
	});  
```  

there is a Sync version of `set()` which is `setSync()` with only one parameter the `data`.


##API  
       
	render("keyword","value", cb)  
        keyword - [REQUIRED] - the keyword of the tag ; 
        Value - [REQUIRED] - the value of the keyword ;  
        cb - [REQUIRED] - a callback to be fired once the changes have been made. 
			If cb is not specified, an error will be thrown.
							
            err - First parameter to the callback detailing any errors.
            data - the processed data with changes made in it.

	  
	renderSync("keyword","value")
        keyword - [REQUIRED] - the keyword of the tag ;
        Value - [REQUIRED] - the value of the keyword ;
	
	renderAll(list, cb)
        list - [REQUIRED] - an object with the list of variable to render, 
				variable names as property and values as property value;
					
        cb - [REQUIRED] - a callback to be fired once the changes have been made.
				If cb is not specified, an error will be thrown.
							
            err - First parameter to the callback detailing any errors.
            data - the processed data with changes made in it.

	
	renderAllSync(list, cb)
        list - [REQUIRED] - an object with the list of variable to render, variable 
				names as property and values as property value;

	set(data, cb)
        data - [REQUIRED] - the data to work with (e.g.: data read from index.html)
        cb - [REQUIRED] - a callback to be fired once the changes have been made. 
			If cb is not specified, an error will be thrown.
            err - First parameter to the callback detailing any errors.
            data - the processed data with changes made in it.

	setSync(data)
        data - [REQUIRED] - the data to work with (e.g.: data read from index.html)
		
	
#Detail Usage
	You can render view using four diiferent functions `render(), renderSync(),  
	renderAll(), renderAllSync()`.
	read a file, set the data using `set()` and render it using you favourite   
	one.
	
	We will Walk through examples for each data type and diiferent cases to handle   
	them.
	
##string
Use <% %> to use rendered data in HTML page
	
	examle HTML(index.html)
	  
```html  
	<!DOCTYPE HTML>
	<html>
	<body>
		HELLO <%firstname%> <%lastname%>
	</body>
	</html>  
```  
	
here we will replace the `<%user%>` tag with John Doe;

`in node.js file`

**Sync**  	

	  
```js   

	var templatesjs = require('templatesjs');
	fs.readFile("./index.html", function(err,data){
		if(err) throw err
		
		
		templatesjs.setSync(data);	//set the data to work with
		var output = templatesjs.renderSync("firstname", "John");
		output = templatesjs.renderSync("lastname", "Doe");
		
		
		res.write(output);
		res.end();
		
	});  
```  

**Async**
	  
```js   

	var templatesjs = require('templatesjs');
	fs.readFile("./index.html", function(err,data){
		if(err) throw err
		
		templatesjs.set(data, function(err,data){
			if(err) throw err;
			
			templatesjs.render("firstname", "John", function(err,data){
				if(err) throw err;
				
				templatesjs.render("lastname", "Doe", function(err,data){
					if(err) throw err;
					
					res.write(data);
					res.end(); // or Do something else with the data
				});
			});
		});	
	});  
```  

**Async Using `renderAll()`**
	  
```js   

	var templatesjs = require('templatesjs');
	var list = {
		firstname:"John",
		lastname:"Doe",
	}
	fs.readFile("./index.html", function(err,data){
		if(err) throw err
		
		templatesjs.set(data, function(err,data){
			if(err) throw err;
			
			templatesjs.renderAll(list, function(err,data){
				if(err) throw err;
				res.write(data);
				res.end(); // or Do something else with the data
				
				});
			});
		});	 
```  

**Sync Using `renderAllSync()`**
  
```js   
	var templatesjs = require('templatesjs'); 
	var list = {  
		firstname:"John",  
		lastname:"Doe",  
	}  
	var data = fs.readFileSync("./index.html");  
	templatesjs.setSync(data);   
	var output = templatesjs.renderAllSync(list);  
	res.write(output);  
	res.end();    
```  

	
	
this will print `"HELLO John Doe"` on the browser instead of `hello <%user%>`

templatesjs work with the data you set using set(). It modifies the data and returns the modified data.  
It will all `<%firstname%>` tags in the data with "John" and return the data.
	
## object
we can also render array or object value as
	
	
```html  

	<body>
		HELLO <%user.name%>
	</body>
	   
``` 
`in node.js file`

**Sync**

```js  
	var profile = {name:"John Doe",age:"18"};
	var data = fs.readFileSync("./index.html");
	
	templatesjs.setSync(data);
	data = templatesjs.renderSync("user", profile);
	   
```  
this will print "HELLO John Doe"

**Async**


```js   
	var profile = {name:"John Doe",age:"18"};
	var data = fs.readFile("./index.html", function(err,data){
		
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			
			templatesjs.render("user", profile, function(err,data){
				if(err) // Do something with the err
				
				//Output the data
				
				
			});
		});
		
	});
	    
```  
Templatesjs won't render the object `profile` to the page,   
it will only relace the `<%user.name%>` with the `name` property of `profile` object.

	
## array
	
for array:
	
	
```html  

	<body>
		HELLO <%user[0]%>
	</body>
	
```  
`in node.js file`

**Sync**

```js  

	var data = fs.readFileSync("./index.html");
	templatesjs.setSync(data);
	var profile =["John Doe", "18"];
	data = templatesjs.renderSync("user", profile);
	
```  

**Async**

```js  

	var profile =["John Doe", "18"];
	var data = fs.readFile("./index.html", function(err,data){
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			
			templatesjs.render("user", profile, function(err,data){
				if(err) //Do something with the error;
				
				//output the data
				
			});
		});
	});
	  
```  
this will print `"HELLO John Doe"`
	
	
## loop through array
	
or all values of an array :
	
```html  

	<body>
		HELLO <%user[]%>
	</body>
	
```  
`in node.js file`

**Sync**

```js  
	var profile =["John Doe", "18"];
	var data = fs.readFileSync("./index.html");

	templatesjs.setSync(data);
	data = templatesjs.renderSync("user", profile);
	 
```  
**Async**

```js

	var data = fs.readFile("./index.html", function(err,data){
		var profile =["John Doe", "18"];
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			
			templatesjs.render("user", profile, function(err,data){
				if(err) // do something with the error
				
				//output the data
				
				
			});
		});
	});
	
```


this will print `"HELLO John Doe18"`
	
	
## loop through specific index of array
	
all array values starting from an index to another one
	
```html

	<body>
		HELLO <%user[2,5]%> 
		
		<!-- 
		**in the bracket the first number indicates the index 
		**from where the values should start and the
		** second one indicates the index of stopping point
		-->
		
	</body>
	
```
`in node.js file`

**Sync**

```js

	var data = fs.readFileSync("./index.html");
	templatesjs.setSync(data);
	var profile =["John", "Doe", "18", "hello", "world", "JS"];
	data = templatesjs.renderSync("user", profile);

```
**Async**

```js

	var data = fs.readFile("./index.html", function(err,data){
	var profile =["John", "Doe", "18", "hello", "world", "JS"];
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			templatesjs.render("user", profile, function(err,data){
				if(err) // Do something with the error
				
				//Output the data
				
				
			});
		});
	});

```


this will print `"18helloworldJS"`

A loop will be performed which will start form `user[2]` and finish on `user[5]'.
No whitespace will be added before or after the values.
	
## format of output
	
suppose that we want a for each loop through our array values 
using templatesjs it can be done like
	
```html
	<body>
	
		<%user[] {<a href='user/*'>*</a>}%>  
		<!--
			**specify the format in curly braces
			** all "*" sign will be replaced by the actual
			**value with the format specified around it
			**remember not to use " inside the tag, use ' instead.
		-->
		
	</body>
	
	
```
`in node.js file`

**Sync**

```js
	var data = fs.readFileSync("./index.html");
	templatesjs.setSync(data);
	var profiles =["John", "Doe"]
	data = templatesjs.renderSync("user", profiles)
	
```

**Async**

```js
	var data = fs.readFile("./index.html", function(err,data){
	var profile =["John", "Doe"];
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			templatesjs.render("user", profile, function(err,data){
				if(err) // Do something with the error
				
				//Output the data
				
				
			});
		});
	});

```


output : `<a href="user/John">John</a> <a href="user/Doe">Doe</a> `
	
A loop will be performed and values will be added inside the specified format  
replacing all "*" with actual value. I foyu want a Linebreak at the end of every link  
you must specify the format as `{<a href="user/*">*</a> <br />}` 

#### for a loop through specified indexes of an array in specified format
```html
	<body>
	
		<%user[2,4] {<a href='user/*'>*</a>}%>  
		// not double quotes, I repeat. 
		
	</body>
	
```
`in node.js file`

**Sync**


```js

	var data = fs.readFileSync("./index.html");
	templatesjs.setSync(data);
	var profiles =["John", "Doe", "foo", "bar", "example"]
	data = templatesjs.renderSync("user", profiles)

```

**Asunc**


```js
	var data = fs.readFile("./index.html", function(err,data){
	var profiles =["John", "Doe", "foo", "bar", "example"]
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			templatesjs.render("user", profiles, function(err,data){
				if(err) // Do something with the error
				
				//Output the data
				
				
			});
		});
	});

```

output : `<a href="user/foo">foo</a>  <a href="user/bar">bar</a>  <a href="user/example">ecample</a> `
	
	
	
	
#### or specify format for only one array index if you want
```html
	<body>
		<%user[2] {<a href='user/*'>*</a>}%>  
		
	</body>
	
	
```
`in node.js file`

**Sync**

```js
	var data = fs.readFileSync("./index.html");
	templatesjs.setSync(data);
	var profiles =["John", "Doe", "foo", "bar", "example"]
	data = templatesjs.renderSync("user", profiles)
	
```

**Async**


```js
	var data = fs.readFile("./index.html", function(err,data){
	var profiles =["John", "Doe", "foo", "bar", "example"]
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			templatesjs.render("user", profiles, function(err,data){
				if(err) // Do something with the error
				
				//Output the data
				
				
			});
		});
	});

```

output : `<a href="user/foo">foo</a>`

	
## Specify case

**specify output to be UPPERCASE or Capitalized or lowercase**
	
you can specify whether the output will be in UPPERCASE, lowercase, Capitalized using a third optional `"style"` param 
in the `templatesjs.render()` function
	
the case param supports three values "CASE", "Case", or "case"
* `"CASE"` : for UPPERCASE output;
* `"Case"` : for Capitalized output
* `"case"` : for lowercase output
	
```html
	<body>
	
	UPPERCASE: <%uUser%> <br />
	Capitalized: <%cUser%> <br />
	lowercase: <%lUser%> <br />
		
	</body>
	
```
`in node.js file`

**Sync**

```js
	var data = fs.readFileSync("./index.html");
	templatesjs.setSync(data);
	data = templatesjs.renderSync("uUser", "john", "CASE") 
	// "CASE" for UPPERCASE output
	
	data = templatesjs.renderSync("cUser", "doE", "Case") 
	// "Case" for Capitalized output
	
	data = templatesjs.renderSync("l/user", "SMith", "Case") 
	// "case" for lowercase output
	
```
**Async**


```js
	var data = fs.readFile("./index.html", function(err,data){
	var profiles =["John", "Doe", "foo", "bar", "example"]
	
		templatesjs.set(data, function(err,data){
			if(err) //Do something with the error;
			
			templatesjs.render("uUser", "John","CASE", function(err,data){
				if(err) // Do something with the error
				
				templatesjs.render("cUser", "doE", "Case", function(err,data){
					if(err) // Do something with the error
					
					templatesjs.render("lUser", "SMith", "case", function(err,data){
						if(err) // Do something with the error
						
						//output the data
						
					});
				});
				
				
			});
		});
	});

```
output : `UPPERCASE: JOHN `;
		`Capitalized: Doe`;
		`lowercase: smith`;

Any value for the style parameter other than "CASE", "Case" or "case" will produce an error message on the console  
and consider the value of style as undefined.

NOTE: Output Styles can't be specified using `renderAll()` or `renderAllSync()` .
	
## Include file
	
templatesjs also has an include feature which can be used 
to include file or template parts just use the `<%include%>` tag in your file 
```html
	<body>
	
		<%include header.html%>
		
		<h3>Header is above</h3>
		
		<h1>content goes here : </h1>
		<%include posts/content.html%> 
		// the file is in ./post/ directory you can also 
		//use templatesjs.dir variable to set default
		
		<h2>footer is below</h2>
		
		<%include footer.html%>
		
	</body>
	
```
	
no need to render  anything in the node.js file, the files 	will be rendered 
automatically when you set data using `templatesjs.set()` function;
	
The `include` function gets invoked when you set the data for template.
It will look for every file specified inside <%inlude %> tag and replace the tag with Data read from those files.
Because include is performed at the very beginning **you can render data inside those included files as well**
If file not found an error will be thrown.

## Set default directory
	
before you set data for templatesjs using the `templatesjs.set()` function you can set the default directory where templatesjs will
look for files it needs to include ;
	
suppose that we have all our html files in the "public" directory 
	

`in node.js file`  

```js
	 
	 templatesjs.dir = "./public/";
```
the default directory (if needed to be set) must be set before setting the data using `set()`. 

## delimiter sign
	
**Don't like to use the "%" sign to define tags in html page you can change them :D :D :D** 
	
`in node.js file`

```js

	templatesjs.delim="$";
	
	// you can use any sign like ["!@#$%^&*"] or 
	//any combination like "#@" or "%$" or "*&" or "*!" 
	
```

In *1.2.12* or older versions `delim` was a function used like `templatesjs.delim("#");


## Shorthands for functions
	

are function names too long? Shorthands are availabe :D :D :D 
	
functions can also be used as :


* *render()* : `ren() r() rn`    
* *renderSync()* : `renSync() rSync() rnSync`    
		  
* *renderAll()* : `renAll() rAll() rnAll() rnall() renall() rall()`    
* *renderAll()* : `renAllSync() rAllSync() rnAllSync() rnallSync() renallSync() rallSync()`   
	
* *set()*    : `s() setData() sd() setdata()`  
* *setSync()*    : `sSync() setDataSync() sdSync() setdataSync()`  
	  
	
## Test

```sh

     $ npm test
   
```  
Report any bug or issue on https://github.com/ImtiazChowdhury/templatesjs/issues.
