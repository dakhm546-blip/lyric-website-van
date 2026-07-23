let books = [
  {
    title: "សៀវភៅឱសថសាស្ត្រ (Pharmacology)",
    category: "ឱសថសាស្ត្រ",
    author: "អ្នកនិពន្ធ៖ Dr. Socheat",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

let currentCategory = "all";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function displayBooks(bookArray) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = "";

  if (bookArray.length === 0) {
    bookGrid.innerHTML = `<p style="color:#888; grid-column: 1/-1; text-align:center;">ពុំមានសៀវភៅក្នុងមុខវិជ្ជានេះទេ!</p>`;
    return;
  }

  bookArray.forEach((book, index) => {
    const bookHTML = `
      <div class="book-card">
        <img src="${book.cover}" class="book-cover" alt="Cover">
        <span class="book-badge">${book.category}</span>
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <button class="btn-read" onclick="openPdfModal(${index})">
          <i class="fa-solid fa-book-open"></i> អានសៀវភៅ
        </button>
      </div>
    `;
    bookGrid.innerHTML += bookHTML;
  });
}

function selectCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if(event) event.target.classList.add("active");
  filterBooks();
}

function filterBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = books.filter(book => {
    const matchesCategory = (currentCategory === "all") || (book.category === currentCategory);
    const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  displayBooks(filtered);
}

// បើក/បិទ Upload Form Modal
function openUploadModal() { document.getElementById("uploadModal").classList.add("active"); }
function closeUploadModal() { document.getElementById("uploadModal").classList.remove("active"); }

// បើក/បិទ ផ្ទាំងអាន PDF
function openPdfModal(index) {
  const selectedBook = books[index];
  document.getElementById("pdfTitle").innerText = selectedBook.title;
  
  // បញ្ចូល File PDF ទៅក្នុង iframe ផ្ទាល់ មិនឱ្យរត់ទៅ Tab ថ្មីនាំឱ្យ Block ឡើយ
  document.getElementById("pdfViewer").src = selectedBook.link;
  document.getElementById("pdfModal").classList.add("active");
}

function closePdfModal() {
  document.getElementById("pdfModal").classList.remove("active");
  document.getElementById("pdfViewer").src = "";
}

async function handleUpload(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerText = "កំពុងរក្សាទុក...";
  submitBtn.disabled = true;

  try {
    const coverFile = document.getElementById("bookCoverFile").files[0];
    const pdfFile = document.getElementById("bookPdfFile").files[0];

    const coverDataUrl = await readFileAsDataURL(coverFile);
    const pdfDataUrl = await readFileAsDataURL(pdfFile);

    const newBook = {
      title: document.getElementById("bookTitle").value,
      category: document.getElementById("bookCategory").value,
      author: "អ្នកនិពន្ធ៖ " + document.getElementById("bookAuthor").value,
      cover: coverDataUrl,
      link: pdfDataUrl
    };

    books.unshift(newBook);
    filterBooks();

    closeUploadModal();
    document.getElementById("uploadForm").reset();
    alert("បន្ថែមសៀវភៅជោគជ័យ!");
  } catch (error) {
    alert("មានបញ្ហាក្នុងការអាប់ឡូត File!");
  } finally {
    submitBtn.innerText = "រក្សាទុកសៀវភៅ";
    submitBtn.disabled = false;
  }
}

displayBooks(books);
