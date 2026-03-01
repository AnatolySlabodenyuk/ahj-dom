import goblinSrc from "../img/goblin.png";

// ─── Constants ─────────────────────────────────────────────────────────────

const GRID_SIZE = 16;
const GOBLIN_MOVE_INTERVAL = 1000;

// ─── Task 1: Element Movement ───────────────────────────────────────────────

export function initGame(container) {
  const cells = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.className = "game-cell";
    container.append(cell);
    cells.push(cell);
  }

  const goblin = document.createElement("img");
  goblin.src = goblinSrc;
  goblin.alt = "goblin";
  goblin.className = "goblin";

  let currentIndex = Math.floor(Math.random() * GRID_SIZE);
  cells[currentIndex].append(goblin);

  const gameInterval = setInterval(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * GRID_SIZE);
    } while (newIndex === currentIndex);

    // append removes goblin from current parent automatically — no removeChild needed
    cells[newIndex].append(goblin);
    currentIndex = newIndex;
  }, GOBLIN_MOVE_INTERVAL);

  return () => clearInterval(gameInterval);
}

// ─── Movie data ───────────────────────────────────────────────────────────────

export const movies = [
  { id: 1, title: "Blade Runner", imdb: 8.1, year: 1982 },
  { id: 2, title: "Terminator", imdb: 8.0, year: 1984 },
  { id: 3, title: "The Matrix", imdb: 8.7, year: 1999 },
  { id: 4, title: "Inception", imdb: 8.8, year: 2010 },
  { id: 5, title: "Interstellar", imdb: 8.6, year: 2014 },
];

const sortCycle = [
  { field: "id", direction: "asc" },
  { field: "id", direction: "desc" },
  { field: "title", direction: "asc" },
  { field: "title", direction: "desc" },
  { field: "imdb", direction: "asc" },
  { field: "imdb", direction: "desc" },
  { field: "year", direction: "asc" },
  { field: "year", direction: "desc" },
];

// ─── Common Sorting System Factory ─────────────────────────────────────────

function createSortingSystem(
  tbody,
  headers,
  sortInfoEl,
  getSortedData,
  renderFn,
) {
  let cycleIndex = 0;

  function applySort() {
    const { field, direction } = sortCycle[cycleIndex];
    const sortedData = getSortedData(field, direction);

    renderFn(tbody, sortedData);

    // Update header indicators
    headers.forEach((th) => {
      th.classList.remove("active-asc", "active-desc");
      if (th.dataset.field === field) {
        th.classList.add(direction === "asc" ? "active-asc" : "active-desc");
      }
    });

    sortInfoEl.textContent = `Сортировка: ${field} ${direction === "asc" ? "↑" : "↓"}`;

    cycleIndex = (cycleIndex + 1) % sortCycle.length;
  }

  applySort();
  const sortInterval = setInterval(applySort, 2000);

  return () => clearInterval(sortInterval);
}

// ─── Task 2: Sorting via data-* attributes ───────────────────────────────────

function renderTableFromDataAttrs(tbody, sortedRows) {
  sortedRows.forEach((row) => tbody.append(row));
}

export function initDataAttrSorting(table, sortInfoEl) {
  const tbody = table.querySelector("tbody");
  const headers = table.querySelectorAll("thead th");

  // Initial render: create rows with data-* attributes
  movies.forEach((movie) => {
    const tr = document.createElement("tr");
    tr.dataset.id = movie.id;
    tr.dataset.title = movie.title;
    tr.dataset.imdb = movie.imdb;
    tr.dataset.year = movie.year;

    const td1 = document.createElement("td");
    td1.textContent = movie.id;
    tr.append(td1);

    const td2 = document.createElement("td");
    td2.textContent = movie.title;
    tr.append(td2);

    const td3 = document.createElement("td");
    td3.textContent = movie.imdb.toFixed(2);
    tr.append(td3);

    const td4 = document.createElement("td");
    td4.textContent = movie.year;
    tr.append(td4);

    tbody.append(tr);
  });

  const getSortedData = (field, direction) => {
    const rows = Array.from(tbody.querySelectorAll("tr"));

    return rows.sort((a, b) => {
      let valA = a.dataset[field];
      let valB = b.dataset[field];

      // Numeric fields
      if (field === "id" || field === "imdb" || field === "year") {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  return createSortingSystem(
    tbody,
    headers,
    sortInfoEl,
    getSortedData,
    renderTableFromDataAttrs,
  );
}

// ─── Task 3: Sorting via in-memory array ─────────────────────────────────────

function renderTableFromMemory(tbody, sortedMovies) {
  tbody.innerHTML = "";
  sortedMovies.forEach((movie) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = movie.id;
    tr.append(td1);

    const td2 = document.createElement("td");
    td2.textContent = movie.title;
    tr.append(td2);

    const td3 = document.createElement("td");
    td3.textContent = movie.imdb.toFixed(2);
    tr.append(td3);

    const td4 = document.createElement("td");
    td4.textContent = movie.year;
    tr.append(td4);

    tbody.append(tr);
  });
}

export function initMemorySorting(table, sortInfoEl) {
  const tbody = table.querySelector("tbody");
  const headers = table.querySelectorAll("thead th");

  let data = movies.map((m) => ({ ...m }));

  const getSortedData = (field, direction) => {
    const sorted = data.map((item) => ({ ...item }));

    return sorted.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  return createSortingSystem(
    tbody,
    headers,
    sortInfoEl,
    getSortedData,
    renderTableFromMemory,
  );
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const gameField = document.querySelector(".game-field");
  if (gameField) initGame(gameField);

  const table2 = document.querySelector("#table-data-attr");
  const sortInfo2 = document.querySelector(".task2-sort-info");
  if (table2 && sortInfo2) initDataAttrSorting(table2, sortInfo2);

  const table3 = document.querySelector("#table-memory");
  const sortInfo3 = document.querySelector(".task3-sort-info");
  if (table3 && sortInfo3) initMemorySorting(table3, sortInfo3);
});
