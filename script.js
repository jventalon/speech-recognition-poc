var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var output = document.querySelector('.output');
var player = document.querySelector('.player');
var language = document.querySelector('.language');
var toggle = document.querySelector('.toggle');
var sessionText = '';
var listening = false;
var french = false;

player.onclick = function() {
  listening = !listening;
  if (listening) {
    recognition.start();
    console.log('Listening...');
    player.innerHTML = '&#9632; Stop';
    toggle.style.display = 'none';
  } else {
    recognition.stop();
    console.log('Stopped listening.');
    player.innerHTML = '&#9658; Play';
    toggle.style.display = 'inline-block';
  }
}

toggle.onclick = function() {
  french = !french;
  if (french) {
    recognition.lang = 'fr-FR';
    language.innerHTML = 'French';
    console.log('Switched to French.');
    toggle.innerHTML = 'Switch to English';
  } else {
    recognition.lang = 'en-US';
    language.innerHTML = 'English';
    console.log('Switched to English.');
    toggle.innerHTML = 'Switch to French';
  }
}

recognition.onresult = function(event) {
  if (!event.results.length > 0) {
    return;
  }
  var lastResult = event.results[event.results.length - 1];
  var firstAlernative = lastResult[0];
  var text = firstAlernative.transcript;
  console.log('Text: ' + text);
  console.log('Confidence: ' + firstAlernative.confidence);
  sessionText += text + '.';
  output.textContent = 'You said: ' + sessionText;
}

recognition.onnomatch = function(event) {
  output.textContent = "I didn't recognise what you said.";
  console.log(event);
}

recognition.onerror = function(event) {
  output.textContent = 'Error occurred in recognition: ' + event.error;
}