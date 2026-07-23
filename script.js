let books = [
  {
    title: "សៀវភៅឱសថសាស្ត្រ (Pharmacology)",
    category: "ឱសថសាស្ត្រ",
    author: "អ្នកនិពន្ធ៖ Dr. Socheat",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    link: "https://drive.google.com/your-pdf-link-here" // ដាក់ Link Google Drive នៅទីនេះ
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

displayBooks(books);
