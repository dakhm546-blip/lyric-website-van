// ១. ទាញយកទិន្នន័យសៀវភៅចេញពី localStorage (បើគ្មានទេ ប្រើទិន្នន័យគំរូខាងក្រោម)
let defaultBooks = [
  {
    id: 1,
    title: "ទស្សនវិទ្យា ផ្ទៃមុខ",
    category: "អភិវឌ្ឍខ្លួន",
    author: "អ្នកនិពន្ធ៖ Create by van",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    link: "https://drive.google.com"
  }
];

// ពិនិត្យមើលថា តើមានទិន្នន័យក្នុង localStorage ឬនៅ?
let books = JSON.parse(localStorage.getItem("socheat_library_books")) || defaultBooks;

let currentCategory = "all";

// ២. មុខងាររក្សាទុកទិន្នន័យចូលក្នុង localStorage
function saveBooksToLocalStorage() {
  localStorage.setItem("socheat_library_books", JSON.stringify(books));
}

// ៣. បង្ហាញសៀវភៅលើអេក្រង់
function displayBooks(bookArray) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = "";

  if (bookArray.length === 0) {
    bookGrid.innerHTML = `<p style="color:#888; grid-column: 1/-1; text-align:center;">ពុំមានសៀវភៅក្នុងមុខវិជ្ជានេះទេ!</p>`;
    return;
  }

  bookArray.forEach((book) => {
    const bookHTML = `
      <div class="book-card" style="position: relative;">
        <!-- ប៊ូតុងលុបសៀវភៅ -->
        <button onclick="deleteBook(${book.id})" style="position: absolute; top: 10px; right: 10px; background: rgba(255,0,0,0.7); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; z-index: 5;" title="លុបសៀវភៅ">
          <i class="fa-solid fa-trash"></i>
        </button>

        <img src="${book.cover}" class="book-cover" alt="Cover" onerror="this.src='https://via.placeholder.com/200x250?text=No+Cover'">
        <span class="book-badge">${book.category}</span>
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="btn-read">
          <i class="fa-solid fa-book-open"></i> អានសៀវភៅ
        </a>
      </div>
    `;
    bookGrid.innerHTML += bookHTML;
  });
}

// ៤. តម្រងតាមមុខវិជ្ជា
function selectCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");
  filterBooks();
}

// ៥. ស្វែងរកសៀវភៅ (Search)
function filterBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = books.filter(book => {
    const matchesCategory = (currentCategory === "all") || (book.category === currentCategory);
    const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  displayBooks(filtered);
}

// ៦. បើក/បិទ Modal
function openUploadModal() { document.getElementById("uploadModal").classList.add("active"); }
function closeUploadModal() { document.getElementById("uploadModal").classList.remove("active"); }

// ៧. បន្ថែមសៀវភៅថ្មី និង Save ចូល localStorage
function handleUpload(event) {
  event.preventDefault();

  const newBook = {
    id: Date.now(), // បង្កើត ID ប្លែកៗគ្នាសម្រាប់សៀវភៅនីមួយៗ
    title: document.getElementById("bookTitle").value,
    category: document.getElementById("bookCategory").value,
    author: "អ្នកនិពន្ធ៖ " + document.getElementById("bookAuthor").value,
    cover: document.getElementById("bookCoverUrl").value,
    link: document.getElementById("bookPdfUrl").value
  };

  books.unshift(newBook); // បន្ថែមសៀវភៅថ្មីទៅខាងដើមគេ
  saveBooksToLocalStorage(); // រក្សាទុកចូលក្នុង Browser ភ្លាមៗ
  filterBooks();

  closeUploadModal();
  document.getElementById("uploadForm").reset();
  alert("បន្ថែមសៀវភៅ និងរក្សាទុកបានជោគជ័យ!");
}

// ៨. មុខងារលុបសៀវភៅ
function deleteBook(id) {
  if (confirm("តើអ្នកពិតជាចង់លុបសៀវភៅនេះមែនទេ?")) {
    books = books.filter(book => book.id !== id);
    saveBooksToLocalStorage();
    filterBooks();
  }
}

// ដំណើរការបង្ហាញសៀវភៅដំបូង
displayBooks(books);
    
