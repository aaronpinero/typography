var codeboxes=document.getElementsByClassName("codebox"),x;for(x=0;x<codeboxes.length;x++)lang=codeboxes[x].getAttribute("data-lang"),null!=lang&&""!=lang&&codeboxes[x].insertAdjacentHTML("beforebegin",'<div class="codebox-label">'+lang+"</div>");