// បង្កើត Object សម្រាប់ Web Speech API (សាកល្បងស្រាប់លើ Browser)
const synth = window.speechSynthesis;

// ទាញយក Elements ពី HTML
const textInput = document.getElementById('textInput');
const voiceTypeSelect = document.getElementById('voiceType');
const rateRange = document.getElementById('rateRange');
const pitchRange = document.getElementById('pitchRange');
const rateVal = document.getElementById('rateVal');
const pitchVal = document.getElementById('pitchVal');

// ធ្វើបច្ចុប្បន្នភាពកម្រិតបង្ហាញ Pitch & Speed លើអេក្រង់
rateRange.addEventListener('input', () => rateVal.innerText = rateRange.value);
pitchRange.addEventListener('input', () => pitchVal.innerText = pitchRange.value);

// មុខងារអានអត្ថបទ
function speakText() {
  if (synth.speaking) {
    console.error('កំពុងដំណើរការចាក់សំឡេង...');
    return;
  }

  const text = textInput.value.trim();
  if (text === '') {
    alert('សូមបញ្ចូលអត្ថបទជាមុនសិន!');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  // កំណត់ភាសាជាខ្មែរ (km-KH)
  utterance.lang = 'km-KH';

  // កំណត់ល្បឿន និង Pitch
  utterance.rate = parseFloat(rateRange.value);

  // កែប្រែ Pitch / Tone ទៅតាមការជ្រើសរើសសំឡេង (ស្រី / ប្រុស / ក្មេង)
  const selectedVoice = voiceTypeSelect.value;
  
  if (selectedVoice === 'female') {
    utterance.pitch = parseFloat(pitchRange.value) * 1.1; // សំឡេងស្រី Tone ខ្ពស់បន្តិច
  } else if (selectedVoice === 'male') {
    utterance.pitch = parseFloat(pitchRange.value) * 0.7; // សំឡេងប្រុស Tone ទាប/គ្រល
  } else if (selectedVoice === 'child') {
    utterance.pitch = parseFloat(pitchRange.value) * 1.6; // សំឡេងក្មេង Tone ស្រួចខ្ពស់
  }

  // ដំណើរការអាន
  synth.speak(utterance);
}

// មុខងារបញ្ឈប់
function stopText() {
  if (synth.speaking) {
    synth.cancel();
  }
}

// មុខងារលុបអត្ថបទ
function clearText() {
  stopText();
  textInput.value = '';
}
