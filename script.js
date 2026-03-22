// ===== SUBJECT DATA =====

const data = {
  English: {
    "Previous Year Questions": [
      { title: "Final Exam Paper", year: "2024", file: "pdfs/english-2024.pdf" },
      { title: "Pre-Board Paper", year: "2023", file: "pdfs/english-2023.pdf" }
    ],
    "Practice Paper": [
      { title: "Practice Paper 1", year: "2025", file: "9_english_2025_pp_english_annual.pdf" }
    ],
    "Notes": [
      { title: "Poetry Notes", year: "2025", file: "pdfs/english-notes.pdf" }
    ]
  },

  Science: {
    "Previous Year Questions": [
      { title: "Final Exam Paper", year: "2024", file: "pdfs/science-2024.pdf" },
      { title: "Pre-Board Paper", year: "2023", file: "pdfs/science-2023.pdf" }
    ],
    "Practice Paper": [
      { title: "Practice Paper 1", year: "2025", file: "9_science_2025_pp_english_annual.pdf" }
    ],
    "Notes": [
      { title: "Science Notes", year: "2025", file: "pdfs/science-notes.pdf" }
    ]
  },

  Mathematics: {
    "Previous Year Questions": [
      { title: "Final Exam Paper", year: "2024", file: "pdfs/math-2024.pdf" },
      { title: "Pre-Board Paper", year: "2023", file: "pdfs/math-2023.pdf" }
    ],
    "Practice Paper": [
      { title: "Practice Paper 1", year: "2025", file: "9_math_2025_pp_english_annual.pdf" }
    ],
    "Notes": [
      { title: "Math Notes", year: "2025", file: "pdfs/math-notes.pdf" }
    ]
  },

  "Social Science": {
    "Previous Year Questions": [
      { title: "Final Exam Paper", year: "2024", file: "pdfs/social-2024.pdf" },
      { title: "Pre-Board Paper", year: "2023", file: "pdfs/social-2023.pdf" }
    ],
    "Practice Paper": [
      { title: "Practice Paper 1", year: "2025", file: "9_socialscience_2025_pp_english_annual.pdf" }
    ],
    "Notes": [
      { title: "Social Science Notes", year: "2025", file: "pdfs/social-notes.pdf" }
    ]
  }
};

// ===== GLOBAL STATE =====

let selectedSubject = null;
let selectedCategory = null;
let currentFile = null;

// ===== DOM READY SAFETY =====

document.addEventListener("DOMContentLoaded", () => {

  // ===== DOM ELEMENTS =====

  const subjectsView = document.getElementById("subjects-view");
  const categoriesView = document.getElementById("categories-view");
  const papersView = document.getElementById("papers-view");

  const subjectsGrid = document.getElementById("subjects-grid");
  const categoriesGrid = document.getElementById("categories-grid");
  const papersList = document.getElementById("papers-list");

  const categoryTitle = document.getElementById("category-title");
  const papersTitle = document.getElementById("papers-title");

  const modal = document.getElementById("download-modal");
  const confirmDownload = document.getElementById("confirm-download");

  // ===== SUBJECT LIST =====

  Object.keys(data).forEach(subject => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${subject}</h3>
      <p>PYQs · Sample Papers · Notes</p>
    `;
    card.onclick = () => showCategories(subject);
    subjectsGrid.appendChild(card);
  });

  // ===== SHOW CATEGORIES =====

  function showCategories(subject) {
    selectedSubject = subject;

    subjectsView.classList.add("hidden");
    categoriesView.classList.remove("hidden");

    categoryTitle.innerText = subject;
    categoriesGrid.innerHTML = "";

    Object.keys(data[subject]).forEach(category => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${category}</h3>`;
      card.onclick = () => showPapers(category);
      categoriesGrid.appendChild(card);
    });
  }

  // ===== SHOW PAPERS =====

  function showPapers(category) {
    selectedCategory = category;

    categoriesView.classList.add("hidden");
    papersView.classList.remove("hidden");

    papersTitle.innerText = `${selectedSubject} — ${category}`;
    papersList.innerHTML = "";

    const papers = data[selectedSubject][selectedCategory];

    if (!papers || papers.length === 0) {
      papersList.innerHTML = `
        <div style="padding:20px;text-align:center;color:#6b7280">
          Papers coming soon...
        </div>
      `;
      return;
    }

    papers.forEach(paper => {
      const card = document.createElement("div");
      card.className = "pdf-card";

      card.innerHTML = `
        <div class="pdf-icon">📄</div>
        <div class="pdf-info">
          <h4>${paper.title}</h4>
          <p>${paper.year}</p>
        </div>
        <button class="download-btn">Download</button>
      `;

      card.querySelector(".download-btn").onclick = () => {
        currentFile = paper.file;
        openModal();
      };

      papersList.appendChild(card);
    });
  }

  // ===== NAVIGATION =====

  window.goBackSubjects = function () {
    categoriesView.classList.add("hidden");
    subjectsView.classList.remove("hidden");
  };

  window.goBackCategories = function () {
    papersView.classList.add("hidden");
    categoriesView.classList.remove("hidden");
  };

  // ===== DOWNLOAD MODAL =====

  function openModal() {
    modal.classList.add("show");
  }

  window.closeModal = function () {
    modal.classList.remove("show");
  };

  confirmDownload.onclick = () => {
    if (!currentFile) return;

    const link = document.createElement("a");
    link.href = currentFile;
    link.download = currentFile.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    closeModal();
  };

});
