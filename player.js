function startRadio(){
	document.getElementById('radioTag').play();
}

function stopRadio(){
    document.getElementById('radioTag').pause();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.radio == "radio"){

      if(document.getElementById('radioTag').paused){
			startRadio();
			console.log("started");
			return 'started';
		}else{
			stopRadio();
			console.log("stopped");
			return 'stopped';
		}
    }

});

	

