// បញ្ជីសៀវភៅដើម
let books = [
  {
    title: "សៀវភៅឱសថសាស្ត្រ (Pharmacology)",
    category: "ឱសថសាស្ត្រ",
    author: "អ្នកនិពន្ធ៖ វេជ្ជបណ្ឌិត",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

let currentCategory = "all";

// មុខងារអាន File ទៅជា Base64 URL
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

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

// តម្រងតាមមុខវិជ្ជា
function selectCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
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

// ដំណើរការ Upload PDF & Cover រួចបង្ហាញភ្លាមៗ
async function handleUpload(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerText = "កំពុងរក្សាទុក...";
  submitBtn.disabled = true;

  try {
    const coverFile = document.getElementById("bookCoverFile").files[0];
    const pdfFile = document.getElementById("bookPdfFile").files[0];

    // អានរូបភាព និង File PDF
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
    alert("អាប់ឡូតសៀវភៅ PDF ជោគជ័យ!");
  } catch (error) {
    alert("មានបញ្ហាក្នុងការអាប់ឡូត File សូមសាកល្បងម្តងទៀត!");
  } finally {
    submitBtn.innerText = "រក្សាទុកសៀវភៅ";
    submitBtn.disabled = false;
  }
}

displayBooks(books);
