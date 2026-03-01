import {
  movies,
  initGame,
  initDataAttrSorting,
  initMemorySorting,
} from "./app";

describe("movies data", () => {
  test("has 5 movies", () => {
    expect(movies).toHaveLength(5);
  });

  test("each movie has required fields", () => {
    movies.forEach((m) => {
      expect(m).toHaveProperty("id");
      expect(m).toHaveProperty("title");
      expect(m).toHaveProperty("imdb");
      expect(m).toHaveProperty("year");
    });
  });
});

describe("initGame", () => {
  test("creates 16 cells in the container", () => {
    document.body.innerHTML = '<div class="game-field"></div>';
    const container = document.querySelector(".game-field");
    initGame(container);
    expect(container.querySelectorAll(".game-cell")).toHaveLength(16);
  });

  test("places goblin in exactly one cell", () => {
    document.body.innerHTML = '<div class="game-field"></div>';
    const container = document.querySelector(".game-field");
    initGame(container);
    const goblins = container.querySelectorAll(".goblin");
    expect(goblins).toHaveLength(1);
  });
});

describe("initDataAttrSorting", () => {
  function makeTable() {
    document.body.innerHTML = `
      <p class="sort-info"></p>
      <table id="t">
        <thead>
          <tr>
            <th data-field="id">ID</th>
            <th data-field="title">Title</th>
            <th data-field="imdb">IMDB</th>
            <th data-field="year">Year</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    return {
      table: document.querySelector("#t"),
      sortInfoEl: document.querySelector(".sort-info"),
    };
  }

  test("renders all movie rows", () => {
    const { table, sortInfoEl } = makeTable();
    initDataAttrSorting(table, sortInfoEl);
    expect(table.querySelectorAll("tbody tr")).toHaveLength(movies.length);
  });

  test("rows have data-* attributes", () => {
    const { table, sortInfoEl } = makeTable();
    initDataAttrSorting(table, sortInfoEl);
    const firstRow = table.querySelector("tbody tr");
    expect(firstRow.dataset.id).toBeDefined();
    expect(firstRow.dataset.title).toBeDefined();
    expect(firstRow.dataset.imdb).toBeDefined();
    expect(firstRow.dataset.year).toBeDefined();
  });
});

describe("initMemorySorting", () => {
  function makeTable() {
    document.body.innerHTML = `
      <p class="sort-info"></p>
      <table id="t">
        <thead>
          <tr>
            <th data-field="id">ID</th>
            <th data-field="title">Title</th>
            <th data-field="imdb">IMDB</th>
            <th data-field="year">Year</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    return {
      table: document.querySelector("#t"),
      sortInfoEl: document.querySelector(".sort-info"),
    };
  }

  test("renders all movie rows", () => {
    const { table, sortInfoEl } = makeTable();
    initMemorySorting(table, sortInfoEl);
    expect(table.querySelectorAll("tbody tr")).toHaveLength(movies.length);
  });
});
