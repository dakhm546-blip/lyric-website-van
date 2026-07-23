// ==================== ផ្នែក QCM & TIMER (សំណួរ ១០) ====================

// ១. បញ្ជីសំណួរ QCM ទាំង ១០ សំណួរ
const qcmQuestions = [
  {
    id: 1,
    question: "១. តើអង្គរវត្ត ត្រូវបានសាងសង់ក្នុងសម័យណា?",
    options: ["A. សម័យហ្វូណន", "B. សម័យចេនឡា", "C. សម័យអង្គរ", "D. សម័យបន្ទាយស្រី"],
    correct: 2 // C. សម័យអង្គរ
  },
  {
    id: 2,
    question: "២. តើព្រះបាទសូរ្យវរ្ម័នទី២ ជាអ្នកសាងសង់អ្វី?",
    options: ["A. ប្រាសាទបាយ័ន", "B. អង្គរវត្ត", "C. ប្រាសាទព្រះវិហារ", "D. ប្រាសាទតាព្រហ្ម"],
    correct: 1 // B. អង្គរវត្ត
  },
  {
    id: 3,
    question: "៣. តើរាជធានីអង្គរមានទីតាំងនៅទីណា?",
    options: ["A. ភ្នំពេញ", "B. សៀមរាប", "C. បាត់ដំបង", "D. កំពង់ចាម"],
    correct: 1 // B. សៀមរាប
  },
  {
    id: 4,
    question: "៤. តើសម័យហ្វូណនមានមុនសម័យណា?",
    options: ["A. ចេនឡា", "B. អង្គរ", "C. ឡុងវែក", "D. អ៊ុដុង្គ"],
    correct: 0 // A. ចេនឡា
  },
  {
    id: 5,
    question: "៥. តើប្រាសាទបាយ័នល្បីដោយសារអ្វី?",
    options: ["A. រូបព្រះវិហារ", "B. មុខព្រះច្រើន", "C. ទំហំធំ", "D. មានទឹកជុំវិញ"],
    correct: 1 // B. មុខព្រះច្រើន
  },
  {
    id: 6,
    question: "៦. តើព្រះបាទជ័យវរ្ម័នទី៧ មានឈ្មោះល្បីក្នុងអ្វី?",
    options: ["A. សាងសង់ប្រាសាទច្រើន", "B. សង្គ្រាមជាច្រើន", "C. ជាអ្នកជួសជុលអង្គរវត្ត", "D. បង្កើតភ្នំពេញ"],
    correct: 0 // A. សាងសង់ប្រាសាទច្រើន
  },
  {
    id: 7,
    question: "៧. តើសម័យណាដែលអាណាចក្រខ្មែរ មានអំណាចខ្លាំងបំផុត?",
    options: ["A. ហ្វូណន", "B. ចេនឡា", "C. អង្គរ", "D. បន្ទាយមានជ័យ"],
    correct: 2 // C. អង្គរ
  },
  {
    id: 8,
    question: "៨. តើប្រាសាទតាព្រហ្មល្បីដោយសារអ្វី?",
    options: ["A. មានសំណង់ថ្មស", "B. មានដើមឈើពាក់ជាប់", "C. មានទឹកជុំវិញ", "D. មានស្ពានធំ"],
    correct: 1 // B. មានដើមឈើពាក់ជាប់
  },
  {
    id: 9,
    question: "៩. តើអង្គរ ត្រូវបានទុកចោលក្នុងសម័យណា?",
    options: ["A. សតវត្សទី៩", "B. សតវត្សទី១២", "C. សតវត្សទី១៥", "D. សតវត្សទី២០"],
    correct: 2 // C. សតវត្សទី១៥
  },
  {
    id: 10,
    question: "១០. តើអង្គរវត្តត្រូវបានសាងសង់សម្រាប់អ្វីដំបូង?",
    options: ["A. ព្រះពុទ្ធសាសនា", "B. ព្រះហិណ្ឌូសាសនា", "C. សាសនាគ្រិស្ដ", "D. មិនមានសាសនា"],
    correct: 1 // B. ព្រះហិណ្ឌូសាសនា
  }
];

let timerInterval;
let timeLeft = 300; // កំណត់ ៥ នាទី (៥ x ៦០ = ៣០០ វិនាទី)

// បង្ហាញសំណួរ QCM លើ អេក្រង់
function renderQuestions() {
  const container = document.getElementById("questionContainer");
  container.innerHTML = "";

  qcmQuestions.forEach((q, index) => {
    let optionsHTML = "";
    q.options.forEach((opt, optIndex) => {
      optionsHTML += `
        <label class="opt-label">
          <input type="radio" name="q_${index}" value="${optIndex}">
          <span>${opt}</span>
        </label>
      `;
    });

    container.innerHTML += `
      <div class="q-card">
        <div class="q-title">${q.question}</div>
        ${optionsHTML}
      </div>
    `;
  });
}

// ចាប់ផ្តើម Timer រាប់ថយក្រោយ ៥ នាទី
function startTimer() {
  clearInterval(timerInterval);
  const timeDisplay = document.getElementById("timeDisplay");

  timerInterval = setInterval(() => {
    timeLeft--;
    
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    if (seconds < 10) seconds = "0" + seconds;
    if (minutes < 10) minutes = "0" + minutes;

    timeDisplay.innerText = `${minutes}:${seconds}`;

    // ពេលអស់ម៉ោង
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("អស់ពេល ៥ នាទីហើយ! ប្រព័ន្ធនឹងបញ្ជូនចម្លើយដោយស្វ័យប្រវត្តិ។");
      submitQcm();
    }
  }, 1000);
}

// បើក Modal QCM
function openQcmModal() {
  document.getElementById("qcmModal").classList.add("active");
  document.getElementById("qcmBody").style.display = "block";
  document.getElementById("qcmResult").style.display = "none";
  timeLeft = 300; // Reset មក ៥ នាទីវិញ (300 seconds)
  renderQuestions();
  startTimer();
}

// បិទ Modal QCM
function closeQcmModal() {
  document.getElementById("qcmModal").classList.remove("active");
  clearInterval(timerInterval);
}

// គណនាពិន្ទុ និងបញ្ជូនចម្លើយ
function submitQcm() {
  clearInterval(timerInterval);
  let score = 0;

  qcmQuestions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q_${index}"]:checked`);
    if (selectedOption && parseInt(selectedOption.value) === q.correct) {
      score++;
    }
  });

  document.getElementById("qcmBody").style.display = "none";
  document.getElementById("qcmResult").style.display = "block";
  document.getElementById("scoreText").innerText = `អ្នកទទួលបាន ${score} / ${qcmQuestions.length} ពិន្ទុ!`;
}

// ធ្វើម្តងទៀត
function restartQcm() {
  openQcmModal();
                              }
    
