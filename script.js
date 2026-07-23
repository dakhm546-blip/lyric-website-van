const textInput = document.getElementById('textInput');
const rateRange = document.getElementById('rateRange');
const rateVal = document.getElementById('rateVal');

let currentAudio = null;

if (rateRange && rateVal) {
  rateRange.addEventListener('input', () => {
    rateVal.innerText = rateRange.value;
    if (currentAudio) {
      currentAudio.playbackRate = parseFloat(rateRange.value);
    }
  });
}

function speakText() {
  const text = textInput.value.trim();
  
  if (!text) {
    alert("សូមបញ្ចូលអត្ថបទខ្មែរជាមុនសិន!");
    return;
  }

  // បញ្ឈប់ Audio ចាស់ប្រសិនបើកំពុងចាក់
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // ប្រើ Proxy ដើម្បីកុំឱ្យ Google / GitHub Pages Block CORS
  const cleanText = encodeURIComponent(text);
  const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${cleanText}&tl=km&client=tw-ob`;
  
  currentAudio = new Audio();
  currentAudio.src = audioUrl;
  currentAudio.playbackRate = parseFloat(rateRange.value);

  // ចាក់សំឡេង
  const playPromise = currentAudio.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.error("Playback error:", error);
      // បើទូរស័ព្ទ Block autoplay ត្រូវចាក់តាមរៀប Audio Element
      const audioFallback = new Audio(`https://api.streamelements.com/kappa/v2/speech?voice=Khmer&text=${cleanText}`);
      audioFallback.play();
    });
  }
}

function stopText() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function clearText() {
  stopText();
  textInput.value = '';
}
  
