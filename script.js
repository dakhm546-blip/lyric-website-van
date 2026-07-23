// បញ្ជីទិន្នន័យសៀវភៅ (អ្នកអាចថែមសៀវភៅថ្មីៗនៅត្រង់នេះបានតាមចិត្ត)
const books = [
  {
    title: "សៀវភៅឱសថសាស្ត្រ (Pharmacology)",
    author: "អ្នកនិពន្ធ៖ វេជ្ជបណ្ឌិត",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // ដាក់ Link File PDF សៀវភៅ
  },
  {
    title: "កាយវិភាគសាស្ត្រ (Anatomy & Physiology)",
    author: "អ្នកនិពន្ធ៖ Va Socheat",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "ការអភិវឌ្ឍន៍ខ្លួនឯង (Self Improvement)",
    author: "អ្នកនិពន្ធ៖ គំនិតជោគជ័យ",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "មូលដ្ឋានគ្រឹះ Web Development",
    author: "អ្នកនិពន្ធ៖ IT Master",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

// មុខងារបង្ហាញសៀវភៅនៅលើ Website
function displayBooks(bookArray) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = "";

  if (bookArray.length === 0) {
    bookGrid.innerHTML = `<p style="color:#888;">រកមិនឃើញសៀវភៅដែលអ្នកស្វែងរកទេ!</p>`;
    return;
  }

  bookArray.forEach(book => {
    const bookHTML = `
      <div class="book-card">
        <img src="${book.cover}" class="book-cover" alt="Cover">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <a href="${book.link}" target="_blank" class="btn-read"><i class="fa-solid fa-book-open"></i> អានសៀវភៅ</a>
      </div>
    `;
    bookGrid.innerHTML += bookHTML;
  });
}

// មុខងារស្វែងរកសៀវភៅ
function searchBooks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
}

// ដំណើរការបង្ហាញសៀវភៅពេលបើក Page
displayBooks(books);
