const resultInput = document.getElementById("result");

// បន្ថែមលេខ ឬប្រមាណវិធី
function appendValue(value) {
  resultInput.value += value;
}

// លុបទិន្នន័យទាំងអស់ (Clear)
function clearDisplay() {
  resultInput.value = "";
}

// លុបអក្សរ/លេខចុងក្រោយមួយ (Delete/Backspace)
function deleteChar() {
  resultInput.value = resultInput.value.slice(0, -1);
}

// គណនាលទ្ធផល
function calculateResult() {
  try {
    if (resultInput.value.trim() !== "") {
      resultInput.value = eval(resultInput.value);
    }
  } catch (error) {
    resultInput.value = "Error";
    setTimeout(() => {
      clearDisplay();
    }, 1500);
  }
}
