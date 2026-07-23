// បញ្ជីសៀវភៅដែលមានក្នុង Website
let books = [
  {
    id: 1,
    title: "ទស្សនវិទ្យា ផ្ទៃមុខ",
    category: "អភិវឌ្ឍខ្លួន",
    author: "អ្នកនិពន្ធ៖ Create by van",
    cover: "https://lh3.googleusercontent.com/d/1qQfvqpC4DgtiTKPzgco2_ETeESjdiixj", // Direct Link រូប Cover របស់អ្នក
    link: "https://drive.google.com/file/d/1qQfvqpC4DgtiTKPzgco2_ETeESjdiixj/view?usp=sharing" // Link PDF សៀវភៅរបស់អ្នក
  }
];

let currentCategory = "all";

// មុខងារបង្ហាញសៀវភៅលើអេក្រង់
function displayBooks(bookArray) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = "";

  if (bookArray.length === 0) {
    bookGrid.innerHTML = `<p style="color:#888; grid-column: 1/-1; text-align:center;">ពុំមានសៀវភៅក្នុងមុខវិជ្ជានេះទេ!</p>`;
    return;
  }

  bookArray.forEach((book) => {
    const bookHTML = `
      <div class="book-card">
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

// មុខងារជ្រើសរើស Category
function selectCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");
  filterBooks();
}

// មុខងារ Search
function filterBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = books.filter(book => {
    const matchesCategory = (currentCategory === "all") || (book.category === currentCategory);
    const matchesSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  displayBooks(filtered);
}

// បើក/បិទ Modal បន្ថែមសៀវភៅ
function openUploadModal() { document.getElementById("uploadModal").classList.add("active"); }
function closeUploadModal() { document.getElementById("uploadModal").classList.remove("active"); }

// បន្ថែមសៀវភៅបណ្តោះអាសន្នតាម Form
function handleUpload(event) {
  event.preventDefault();

  const newBook = {
    id: Date.now(),
    title: document.getElementById("bookTitle").value,
    category: document.getElementById("bookCategory").value,
    author: "អ្នកនិពន្ធ៖ " + document.getElementById("bookAuthor").value,
    cover: document.getElementById("bookCoverUrl").value,
    link: document.getElementById("bookPdfUrl").value
  };

  books.unshift(newBook);
  filterBooks();

  closeUploadModal();
  document.getElementById("uploadForm").reset();
  alert("បន្ថែមសៀវភៅបានជោគជ័យ!");
}

// ដំណើរការបង្ហាញសៀវភៅដំបូង
displayBooks(books);
