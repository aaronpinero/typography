function TYFY_ResponsiveTablesOn(){let e=Array.from(document.getElementsByTagName("table")),t=new Array;if(e.length&&(t=e.filter(e=>e.classList.contains("responsive")),t=t.filter(e=>!e.classList.contains("tyfy-responsive-processed")),t.length)){let e=0;for(;e<t.length;e++){let s=t[e];if(s.classList.add("tyfy-responsive-processed"),s.getElementsByTagName("thead").length){let e=s.getElementsByTagName("thead").item(0).getElementsByTagName("th"),t=s.getElementsByTagName("tbody").item(0).getElementsByTagName("tr"),l=0;for(;l<e.length;l++)if("col"==e.item(l).getAttribute("scope")){let s=e.item(l).innerHTML,n=0;for(;n<t.length;n++){let e=t.item(n).children.item(l);if("TD"==e.tagName){let t=document.createElement("span"),l=document.createTextNode(s);t.className="tyfy-td-label",t.appendChild(l),null!==e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}}}}}}}function TYFY_ResponsiveTablesOff(){let e,t=document.getElementsByClassName("tyfy-responsive-processed");for(e=t.length-1;e>=0;e--){let s=t.item(e).getElementsByClassName("tyfy-td-label");if(s.length>0){let e;for(e=s.length-1;e>=0;e--)s.item(e).remove()}t.item(e).classList.remove("tyfy-responsive-processed")}}TYFY_ResponsiveTablesOn();