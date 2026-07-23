// ទាញយក UI Elements ពី HTML
const textInput = document.getElementById('textInput');
const rateRange = document.getElementById('rateRange');
const rateVal = document.getElementById('rateVal');

// បង្កើត Global Variable សម្រាប់ទប់ស្កាត់ Audio កុំឲ្យចាក់ជាន់គ្នា
let currentAudio = null;

// បង្ហាញលេខល្បឿនអាននៅលើអេក្រង់
if (rateRange && rateVal) {
  rateRange.addEventListener('input', () => {
    rateVal.innerText = rateRange.value;
    if (currentAudio) {
      currentAudio.playbackRate = parseFloat(rateRange.value);
    }
  });
}

// មុខងារចាក់សំឡេង (Google TTS)
function speakText() {
  const text = textInput.value.trim();
  
  if (!text) {
    alert("សូមបញ្ចូលអត្ថបទខ្មែរជាមុនសិន!");
    return;
  }

  // ប្រសិនបើកំពុងចាក់សំឡេងចាស់ ត្រូវបញ្ឈប់វាសិន
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // បង្កើត URL សំឡេងខ្មែរតាម Google Translate
  const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=km&client=tw-ob`;
  
  // បង្កើត Audio Object ថ្មី
  currentAudio = new Audio(audioUrl);
  
  // កំណត់ល្បឿននៃការចាក់សំឡេង
  if (rateRange) {
    currentAudio.playbackRate = parseFloat(rateRange.value);
  }

  // ចាប់ផ្ដើមចាក់សំឡេង
  currentAudio.play().catch(error => {
    console.error("Audio playback error:", error);
    alert("មិនអាចចាក់សំឡេងបានទេ! សូមពិនិត្យមើលការភ្ជាប់អ៊ីនធឺណិតរបស់អ្នក។");
  });
}

// មុខងារបញ្ឈប់សំឡេង
function stopText() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// មុខងារលុបអត្ថបទ
function clearText() {
  stopText();
  textInput.value = '';
      }
