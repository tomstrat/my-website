const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const draw = () => {
  const content = document.querySelector("#content");

  content.innerHTML = "";

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const columns = Math.floor(vw / 100);
  const rows = Math.ceil(vh / 100);

  //Data reference count
  let count = 1;

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList = "row";
    for (let j = 0; j < columns; j++) {
      const box = document.createElement("div");
      box.classList = "box";
      box.dataset.index = count;
      box.addEventListener("mouseenter", raiseElements);
      row.appendChild(box);
      count++;
    }
    content.appendChild(row);
  }
  drawIcons();
}

const drawIcons = () => {
  const rows = document.querySelectorAll(".row");
  const middleRow = rows[Math.floor(rows.length / 2)];
  const middleRowPlus = rows[Math.floor(rows.length / 2) - 1];

  const columns = middleRow.querySelectorAll(".box");
  const middleColumn = columns[Math.floor(columns.length / 2)];
  const columnsPlus = middleRowPlus.querySelectorAll(".box");

  const github = document.createElement("i");
  github.classList = "fab fa-github";
  const linkedin = document.createElement("i");
  linkedin.classList = "fab fa-linkedin";
  const email = document.createElement("i");
  email.classList = "fas fa-envelope";
  const code = document.createElement("i");
  code.classList = "far fa-file-code";
  const about = document.createElement("i");
  about.classList = "fas fa-info-circle";

  middleColumn.appendChild(github);
  columns[Math.floor(columns.length / 2) - 2].appendChild(email);
  columns[Math.floor(columns.length / 2) + 2].appendChild(about);
  columnsPlus[Math.floor(columns.length / 2) - 1].appendChild(linkedin);
  columnsPlus[Math.floor(columns.length / 2) + 1].appendChild(code);
}

const raiseElements = e => {
  const raised = document.querySelectorAll(".raise");

  raised.forEach(element => {
    element.classList.remove("raise");
  });

  const index = parseInt(e.target.dataset.index);
  const columnLength = document.querySelector(".row").querySelectorAll(".box").length;
  const rowLength = document.querySelectorAll(".row").length;

  if (index - columnLength > 0) {
    const top = document.querySelector(`.box[data-index="${index - columnLength}"]`);
    top.classList.add("raise");
  }
  if (index % columnLength > 0) {
    const right = document.querySelector(`.box[data-index="${index + 1}"]`);
    right.classList.add("raise");
  }
  if ((index - 1) % columnLength > 0) {
    const left = document.querySelector(`.box[data-index="${index - 1}"]`);
    left.classList.add("raise");
  }
  if (index + columnLength < (columnLength * rowLength)) {
    const bottom = document.querySelector(`.box[data-index="${index + columnLength}"]`);
    bottom.classList.add("raise");
  }

}

const viewChange = debounce(() => draw());

window.addEventListener("resize", viewChange);

draw();
