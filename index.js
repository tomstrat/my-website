const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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
    element.classList.remove("raise", "raiseTop", "raiseLeft", "raiseRight", "raiseBottom");
  });

  const index = parseInt(e.target.dataset.index);
  const root = document.documentElement;
  const columnLength = document.querySelector(".row").querySelectorAll(".box").length;
  const rowLength = document.querySelectorAll(".row").length;
  const min = -7;
  const max = -1;

  if (index - columnLength > 0) {
    const top = document.querySelector(`.box[data-index="${index - columnLength}"]`);
    top.classList.add("raiseTop", "raise");
    setRandomHeight(root, top, "top", min, max);
  }
  if (index % columnLength > 0) {
    const right = document.querySelector(`.box[data-index="${index + 1}"]`);
    right.classList.add("raiseRight", "raise");
    setRandomHeight(root, right, "right", min, max);
  }
  if ((index - 1) % columnLength > 0) {
    const left = document.querySelector(`.box[data-index="${index - 1}"]`);
    left.classList.add("raiseLeft", "raise");
    setRandomHeight(root, left, "left", min, max);
  }
  if (index + columnLength < (columnLength * rowLength)) {
    const bottom = document.querySelector(`.box[data-index="${index + columnLength}"]`);
    bottom.classList.add("raiseBottom", "raise");
    setRandomHeight(root, bottom, "bottom", min, max);
  }

}

const setRandomHeight = (root, element, pos, min, max) => {
  const random = getRandomInt(min, max);
  root.style.setProperty(`--raise-${pos}`, random + "px");

  //Set BG Color 196 - 255 (196 is base color, must be higher depending on random height)
  const range = 255 - 196;
  const newValue = 196 + (range - Math.floor(range / random));
  element.style.backgroundColor = `rgb(${newValue}, ${newValue}, ${newValue})`
}

const viewChange = debounce(() => draw());

window.addEventListener("resize", viewChange);

draw();
