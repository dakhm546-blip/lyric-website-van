// បញ្ជីទិន្នន័យសៀវភៅដើម (Default Books)
let books = [
  {
    title: "សៀវភៅឱសថសាស្ត្រ (Pharmacology)",
    category: "ឱសថសាស្ត្រ",
    author: "អ្នកនិពន្ធ៖ វេជ្ជបណ្ឌិត",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "កាយវិភាគសាស្ត្រ (Anatomy)",
    category: "កាយវិភាគសាស្ត្រ",
    author: "អ្នកនិពន្ធ៖ Va Socheat",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
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
        <a href="${book.link}" target="_blank" class="btn-read"><i class="fa-solid fa-book-open"></i> អានសៀវភៅ</a>
      </div>
    `;
    bookGrid.innerHTML += bookHTML;
  });
}

// តម្រងតាមមុខវិជ្ជា (Filter Category)
function selectCategory(category) {
  currentCategory = category;
  
  // ប្តូរ Highlight ប៊ូតុង Category
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  filterBooks();
}

// មុខងារ Filter រួម (ទាំង Category និង Search Input)
function filterBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  
  const filtered = books.filter(book => {
    const matchesCategory = (currentCategory === "all") || (book.category === currentCategory);
    const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  displayBooks(filtered);
}

// បើក/បិទ Modal Upload
function openUploadModal() { document.getElementById("uploadModal").classList.add("active"); }
function closeUploadModal() { document.getElementById("uploadModal").classList.remove("active"); }

// Handle ការ Upload/បន្ថែមសៀវភៅថ្មី
function handleUpload(event) {
  event.preventDefault();

  const newBook = {
    title: document.getElementById("bookTitle").value,
    category: document.getElementById("bookCategory").value,
    author: "អ្នកនិពន្ធ៖ " + document.getElementById("bookAuthor").value,
    cover: document.getElementById("bookCover").value,
    link: document.getElementById("bookLink").value
  };

  // បន្ថែមសៀវភៅថ្មីទៅដើម Array
  books.unshift(newBook);
  
  // Update អេក្រង់ឡើងវិញ
  filterBooks();
  
  // បិទ Modal & Clear Form
  closeUploadModal();
  document.getElementById("uploadForm").reset();
  alert("បន្ថែមសៀវភៅជោគជ័យ!");
}

// បង្ហាញសៀវភៅដំបូង
displayBooks(books);
