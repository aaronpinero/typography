const tyduration_collapse=500,heading_tags=new Array("H1","H2","H3","H4","H5","H6");let all_collapsables=Array.from(document.getElementsByClassName("collapsable")),ty_collapsables=new Array;if(all_collapsables.length){if(ty_collapsables=all_collapsables.filter(e=>heading_tags.includes(e.tagName)),ty_collapsables=ty_collapsables.filter(e=>!e.classList.contains("tyfy-collapsable-processed")),ty_collapsables.length){let e=ty_collapsables.length-1;for(;e>=0;e--){let t=document.createElement("button");t.setAttribute("aria-expanded","false"),t.innerHTML=ty_collapsables[e].innerHTML,ty_collapsables[e].innerHTML="",ty_collapsables[e].appendChild(t);let l=document.createElement("div");l.className="tyfy-collapsables closed hiding";let s=ty_collapsables[e].tagName,a=heading_tags.indexOf(s),n=new Array,i=0;do{n[i]=heading_tags[i],i++}while(i<=a);ty_collapsables[e].parentNode.insertBefore(l,ty_collapsables[e].nextElementSibling);let o=l.nextElementSibling;for(;o&&!n.includes(o.tagName);)l.appendChild(o),o=l.nextElementSibling;ty_collapsables[e].classList.add("closed"),ty_collapsables[e].addEventListener("click",(function(){var e=this.nextElementSibling,t=this.querySelector("button");if(this.classList.contains("closed")){this.classList.remove("closed"),t.setAttribute("aria-expanded","true"),e.classList.remove("hiding");let l=e.scrollHeight;e.setAttribute("style","height:"+l+"px;"),e.classList.remove("closed")}else{that=this,setTimeout("that.classList.add('closed');",25),setTimeout("that.querySelector('button').setAttribute('aria-expanded','false');",25);let t=e.clientHeight,l=window.getComputedStyle(e);t=t-parseInt(l.getPropertyValue("padding-bottom"))-parseInt(l.getPropertyValue("padding-top")),e.setAttribute("style","height:"+t+"px;"),setTimeout("that.nextElementSibling.classList.add('closed');",25)}})),ty_collapsables[e].nextElementSibling.addEventListener("transitionend",(function(){this.setAttribute("style",""),this.classList.contains("closed")&&this.classList.add("hiding")})),ty_collapsables[e].classList.add("tyfy-collapsable-processed")}}TYFY_DetectAnchorLink(),window.addEventListener("hashchange",TYFY_DetectAnchorLink)}function TYFY_DetectAnchorLink(){if(""!=window.location.hash){let e=window.location.hash.substring(1),t=null!==document.getElementById(e)?document.getElementById(e):Array.from(document.getElementsByTagName("a")).filter(t=>t.getAttribute("name")==e)[0];if(t){let e=new Array,l=t.parentNode;for(;l!==document;)l.classList.contains("tyfy-collapsables")&&e.push(l),l=l.parentNode;if(e.length){let t=0;for(;t<e.length;t++)e[t].classList.remove("closed"),e[t].classList.remove("hiding"),e[t].previousElementSibling.classList.remove("closed"),e[t].previousElementSibling.querySelector("button").setAttribute("aria-expanded","true");window.location.href=window.location.href}}}}