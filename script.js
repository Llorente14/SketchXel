const drawBox = document.querySelector(".draw-box");
const gridBtn = document.querySelector(".grid-btn");
let warna = "#34d399";
let backgroundWarna = "#e2e8f0";

//List warna untuk random
const colorList = [
  "#f0fdfa",
  "#22c55e",
  "#ef4444",
  "#f97316",
  "#84cc16",
  "#3f6212",
  "#0ea5e9",
  "#a855f7",
  "#ec4899",
];

function generateGrid(rasio = 16) {
  while (drawBox.firstElementChild) {
    drawBox.removeChild(drawBox.lastElementChild);
  }
  for (let i = 0; i < rasio; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < rasio; j++) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.classList.add("no-drag");
      box.addEventListener("mouseover", handleHover);
      box.addEventListener("click", (e) => {
        e.target.style.background = warna;
      });
      row.appendChild(box);
    }
    drawBox.appendChild(row);
  }
}
gridBtn.addEventListener("mousedown", () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.classList.toggle("grid");
  });
});

//Range input
const sizes = document.querySelector(".size");
const inputSize = document.querySelector(".range");

inputSize.addEventListener("change", () => {
  sizes.textContent = inputSize.value;
  generateGrid(inputSize.value);
});

//Reset btn
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
  while (drawBox.firstElementChild) {
    drawBox.removeChild(drawBox.lastElementChild);
  }
  generateGrid(inputSize.value);
});
let isMouseDown = false;

drawBox.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  e.preventDefault();
});

drawBox.addEventListener("mouseup", () => {
  isMouseDown = false;
});

function handleHover(e) {
  if (!isMouseDown) return;

  e.target.style.background = warna;
}

//Eraser Button
const eraserBtn = document.querySelector(".eraser");

eraserBtn.addEventListener("click", () => {
  resetRandomState();
  warna = backgroundWarna;
});

//Ganti Warna Sesuai Tombol
const warnaBtn = document.querySelectorAll(".color");

warnaBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    resetRandomState();
    warna = window.getComputedStyle(e.target).backgroundColor;
  });
});

//Gradient Button
const grdBtn = document.querySelector(".gradasi");
let isGradient = false;

function handleGrad(e) {
  if (!isMouseDown) return;

  const box = e.target;
  let currentOpacity = parseFloat(box.style.opacity) || 0;

  if (currentOpacity < 1) {
    box.style.opacity = Math.min(currentOpacity + 0.1, 1).toFixed(2);
    box.style.background = warna;
  }
}

grdBtn.addEventListener("click", () => {
  isGradient = !isGradient;

  const boxs = document.querySelectorAll(".box");

  if (isGradient) {
    // Aktifkan gradasi
    boxs.forEach((box) => {
      box.style.opacity = "0";
      box.addEventListener("mouseover", handleGrad);
    });
  } else {
    boxs.forEach((box) => {
      box.style.opacity = "1";
      box.removeEventListener("mouseover", handleGrad);
      box.style.background = backgroundWarna;
    });
  }
});

//Random Button / Kanan-Bawah
const randomBtn = document.querySelector(".random");
let isRandom = false;

function handleRandom(e) {
  if (!isMouseDown) return;
  let box = e.target;
  const randomNum = Math.floor(Math.random() * colorList.length);
  box.style["background-color"] = colorList[randomNum];
}
randomBtn.addEventListener("click", () => {
  isRandom = !isRandom;
  const boxs = document.querySelectorAll(".box");
  if (isRandom) {
    boxs.forEach((box) => {
      box.addEventListener("mouseover", handleRandom);
    });
  } else {
    boxs.forEach((box) => {
      box.removeEventListener("mouseover", handleRandom);
    });
  }
});

//Buat Hapus Efek Random ketika menekan tombol lain
function resetRandomState() {
  isRandom = false;
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.removeEventListener("mouseover", handleRandom);
  });
}
generateGrid();
