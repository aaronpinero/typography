var is_safari = (navigator.userAgent.indexOf('Safari') == -1) ? false : true;
var players = document.getElementsByClassName('tyfy-audio-player');

var x;
for(x=0;x<players.length;x++) {
	var player = players.item(x);
	var player_audio = player.getElementsByTagName('audio').item(0);
	player_audio.load();
	
	var player_ui = document.createElement("form");
	player_ui.setAttribute('class','player-ui');
	
	player_audio.classList.add('hidden');
	player.appendChild(player_ui);
	
	// show a loading indicator
	player_audio.addEventListener('loadstart',function(e){
	  var loading_indicator = document.createElement("span");
	  loading_indicator.setAttribute('class','loading');
	  loading_indicator.innerText = "Loading";
	  this.parentElement.getElementsByClassName('player-ui').item(0).appendChild(loading_indicator);
	});
		
	// show the play/pause button when the audio is ready to play through
	player_audio.addEventListener('canplaythrough',function(e){
	  if (!this.classList.contains('ui-processed')) {
  		this.classList.add('ui-processed');
  		var audio = this;
  		var ui = this.parentElement.getElementsByClassName('player-ui').item(0);
	
  		// duration indicator
  		var duration_indicator = document.createElement("span");
  		duration_indicator.setAttribute('class','duration');
  		duration_indicator.innerText = FormatDuration(audio.duration);
  		
  		// timeline slider
  		var timeline_control = document.createElement('input');
  		timeline_control.setAttribute('type','range');
  		timeline_control.setAttribute('class','timeline');
  		timeline_control.setAttribute('min','0');
  		timeline_control.setAttribute('max','1000');
  		timeline_control.setAttribute('step','1');
  		timeline_control.setAttribute('value','0');
  		
  		// current timeline position indicator
  		var current_indicator = document.createElement("span");
  		current_indicator.setAttribute('class','current');
  		current_indicator.innerText = FormatDuration(audio.currentTime);
  
  		// play/pause button
  		var play_pause = document.createElement("button");
  		play_pause.setAttribute('class','play-pause paused');
  		play_pause.innerText = "Play / Pause";
	
  		// remove the loading indicator
  		audio.parentElement.getElementsByClassName('loading').item(0).remove();
  		
  		// insert the player ui elements
  		ui.appendChild(play_pause);
  		ui.appendChild(current_indicator);
  		ui.appendChild(timeline_control);
  		ui.appendChild(duration_indicator);
	
  		// activate the play/pause button
  		play_pause.addEventListener('click',function(e){
  		  e.preventDefault();
  		  if (audio.paused) {
  			  audio.play();
  			  this.classList.add('playing');
  			  this.classList.remove('paused');
  		  }
  		  else {
  			  audio.pause();
  			  this.classList.add('paused');
  			  this.classList.remove('playing');
  		  }
  		});
	
  		// activate timeline control
  		timeline_control.addEventListener('input',function(e){
  		  v = this.value;
  		  audio.currentTime = (v / 1000) * audio.duration;
  		});
	
  		// volume
  		// volume doesnt work on ios, but I don't have a good way to detect for ios and safari
  		// the solution for now is to not provide the volume control for any flavor of safari
  		
  		if (!is_safari) {
  		  // mute button
  		  var sound = document.createElement("button");
  		  sound.setAttribute('class','audio sound');
  		  sound.innerText = "Sound / Mute";
  		  
  		  // volume slider
  		  var volume_control = document.createElement('input');
  		  volume_control.setAttribute('type','range');
  		  volume_control.setAttribute('class','volume');
  		  volume_control.setAttribute('min','0');
  		  volume_control.setAttribute('max','100');
  		  volume_control.setAttribute('step','1');
  		  volume_control.setAttribute('value','100');
  		  
  		  ui.appendChild(sound);
  		  ui.appendChild(volume_control);
  		  
  		  audio.volume = 1;
  		  
  		  // activate volume control
  		  volume_control.addEventListener('input',function(e){
    			v = this.value;
    			audio.volume = v/100;
    			
    			var s = this.parentElement.getElementsByClassName('audio').item(0);
    			
    			if (v < 0.001 && s.classList.contains('sound')) {
    			  s.classList.add('muted');
    			  s.classList.remove('sound');
    			}
    			else if (v > 0.001 && s.classList.contains('muted')) {
    			  s.classList.add('sound');
    			  s.classList.remove('muted');
    			}
	      });
	  
  		  // activate the play/pause button
  		  sound.addEventListener('click',function(e){
    			e.preventDefault();
    			if (audio.muted || audio.volume === 0) {
    			  audio.volume = 0.5;
    			  this.classList.add('sound');
    			  this.classList.remove('muted');
    			  this.nextElementSibling.value = 50;
    			}
    			else {
    			  audio.volume = 0;
    			  this.classList.add('muted');
    			  this.classList.remove('sound');
    			  this.nextElementSibling.value = 0;
    			}
  		  });

	    }
    }
  });

	// when audio ends
	player_audio.addEventListener('ended',function(e){
	  this.parentElement.getElementsByClassName('play-pause').item(0).classList.add('paused');
	  this.parentElement.getElementsByClassName('play-pause').item(0).classList.remove('playing');
	});

	// regularly update the current time indicator
	player_audio.addEventListener('timeupdate',function(e){
	  this.parentElement.getElementsByClassName('current').item(0).innerText = FormatDuration(this.currentTime);
	  this.parentElement.getElementsByClassName('timeline').item(0).value = (this.currentTime / this.duration) * 1000;
	});
}
  
function FormatDuration(s) {
	// given s sections, convert this into the format mm:ss
	var minutes = Math.floor(s/60);
	var seconds = Math.floor(s % 60);
	if (seconds < 10) { seconds = "0" + seconds; }
	return minutes + ":" + seconds;
}
