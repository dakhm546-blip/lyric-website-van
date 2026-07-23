const textInput = document.getElementById('textInput');
const rateRange = document.getElementById('rateRange');
const rateVal = document.getElementById('rateVal');

// បង្ហាញលេខល្បឿន
if (rateRange && rateVal) {
  rateRange.addEventListener('input', () => {
    rateVal.innerText = rateRange.value;
  });
}

// មុខងារចាក់សំឡេង
function speakText() {
  const text = textInput.value.trim();
  
  if (!text) {
    alert("សូមបញ្ចូលអត្ថបទខ្មែរជាមុនសិន!");
    return;
  }

  // ប្រសិនបើកំពុងចាក់ ត្រូវបញ្ឈប់សិន
  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel();
  }

  // ទាញយកតម្លៃល្បឿន
  const speed = parseFloat(rateRange.value);

  // បញ្ជាឱ្យ responsiveVoice អានជាភាសាខ្មែរ (Khmer Female)
  responsiveVoice.speak(text, "Khmer Female", {
    rate: speed,
    pitch: 1,
    volume: 1
  });
}

// មុខងារបញ្ឈប់
function stopText() {
  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel();
  }
}

// មុខងារលុបអត្ថបទ
function clearText() {
  stopText();
  textInput.value = '';
}
