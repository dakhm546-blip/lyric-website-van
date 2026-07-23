// បញ្ជីសៀវភៅដើម
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

// បង្ហាញសៀវភៅ
function displayBooks(bookArray) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = "";

  if (bookArray.length === 0) {
    bookGrid.innerHTML = `<p style="color:#888; grid-column: 1/-1; text-align:center;">ពុំមានសៀវភៅក្នុងមុខវិជ្ជានេះទេ!</p>`;
    return;
  }

  bookArray.forEach(book => {
    const bookHTML = `
      <div class="book-card">
        <img src="${book.cover}" class="book-cover" alt="Cover">
        <span class="book-badge">${book.category}</span>
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <a href="${book.link}" target="_blank" class="btn-read">
          <i class="fa-solid fa-book-open"></i> អានសៀវភៅ
        </a>
      </div>
    `;
    bookGrid.innerHTML += bookHTML;
  });
}

// តម្រងតាមមុខវិជ្ជា
function selectCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");
  filterBooks();
}

// Search & Filter
function filterBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = books.filter(book => {
    const matchesCategory = (currentCategory === "all") || (book.category === currentCategory);
    const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  displayBooks(filtered);
}

// បើក/បិទ Modal
function openUploadModal() { document.getElementById("uploadModal").classList.add("active"); }
function closeUploadModal() { document.getElementById("uploadModal").classList.remove("active"); }

// ដំណើរការ Upload ដោយប្រើ Blob URL (ការពារមិនឱ្យ Browser Block)
function handleUpload(event) {
  event.preventDefault();

  const coverFile = document.getElementById("bookCoverFile").files[0];
  const pdfFile = document.getElementById("bookPdfFile").files[0];

  if (!coverFile || !pdfFile) {
    alert("សូមជ្រើសរើស File រូបភាព និង File PDF ឱ្យបានត្រឹមត្រូវ!");
    return;
  }

  // បង្កើត Blob URL ផ្ទាល់ពី File ក្នុងទូរស័ព្ទ (លឿន និងមិនគាំង)
  const coverUrl = URL.createObjectURL(coverFile);
  const pdfUrl = URL.createObjectURL(pdfFile);

  const newBook = {
    title: document.getElementById("bookTitle").value,
    category: document.getElementById("bookCategory").value,
    author: "អ្នកនិពន្ធ៖ " + document.getElementById("bookAuthor").value,
    cover: coverUrl,
    link: pdfUrl
  };

  books.unshift(newBook);
  filterBooks();

  closeUploadModal();
  document.getElementById("uploadForm").reset();
  alert("បន្ថែមសៀវភៅជោគជ័យ!");
}

displayBooks(books);
