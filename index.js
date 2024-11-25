// Speech recognition
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const colors = {
    красный: 'red',
    оранжевый: 'orange',
    желтый: 'yellow',
    зеленый: 'green',
    голубой: 'blue',
    синий: 'darkblue',
    фиолетовый: 'violet',
};

const colorsList = Object.keys(colors);

const grammar =
    '#JSGF V1.0; grammar colors; public <color> = ' +
    colorsList.join(' | ') +
    ' ;';

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'ru-RU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const microphoneIcon = document.querySelector('.microphone__image');
const microphoneWrapper = document.querySelector('.microphone-wrapper');
const audioRecordAnimation = document.querySelector('.audio-record-animation');
const speechRecognitionSection = document.querySelector(
    '.speech-recognition-section',
);
const recognitionTextResult = document.querySelector('.recognition-result');

function getColor(speechResult) {
    for (let index = 0; index < colorsList.length; index += 1) {
        if (speechResult.indexOf(colorsList[index]) !== -1) {
            const colorKey = colorsList[index];
            return [colorKey, colors[colorKey]];
        }
    }
    return null;
}

microphoneIcon.onclick = function () {
    recognition.start();
    console.log('Ready to receive a color command.');
};

recognition.onaudiostart = function () {
    microphoneWrapper.style.visibility = 'hidden';
    audioRecordAnimation.style.visibility = 'visible';
};

recognition.onresult = function (event) {
    const last = event.results.length - 1;
    const colors = getColor(event.results[last][0].transcript);

    recognitionTextResult.textContent =
        'Результат: ' + event.results[last][0].transcript;
    speechRecognitionSection.style.backgroundColor = colors[1];
    console.log('Confidence: ' + event.results[0][0].confidence);
};

recognition.onspeechend = function () {
    recognition.stop();
    microphoneWrapper.style.visibility = 'visible';
    audioRecordAnimation.style.visibility = 'hidden';
};

recognition.onnomatch = function (event) {
    alert("I didn't recognise that color.");
};

recognition.onerror = function (event) {
    alert(`Error occurred in recognition: ${event.error}`);
};
// end of speech recognition
