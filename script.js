let books = [
  {
    title: "ទស្សនវិទ្យា ផ្ទៃមុខ",
    category: "អភិវឌ្ឍខ្លួន",
    author: "អ្នកនិពន្ធ៖ Create by van",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    link: "https://drive.google.com" // ដាក់ Link សៀវភៅ PDF របស់អ្នកនៅទីនេះ
  }
];

let currentCategory = "all";

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
        <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="btn-read">
          <i class="fa-solid fa-book-open"></i> អានសៀវភៅ
        </a>
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

function openUploadModal() { document.getElementById("uploadModal").classList.add("active"); }
function closeUploadModal() { document.getElementById("uploadModal").classList.remove("active"); }

function handleUpload(event) {
  event.preventDefault();

  const newBook = {
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
  alert("បន្ថែមសៀវភៅជោគជ័យ!");
}

displayBooks(books);
