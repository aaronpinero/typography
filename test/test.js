bod = document.getElementsByTagName('body').item(0);
toggle = document.createElement("div");
toggle.className = "tybutton button-rev";
toggle.innerHTML = 'Rev';
bod.appendChild(toggle);
toggle.addEventListener('click',function(){
  if (bod.classList.contains('reverse')) {
    bod.classList.remove('reverse');
  }
  else {
    bod.classList.add('reverse');
  }
});
