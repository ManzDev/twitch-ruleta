const TOTAL_TIME_SPIN = 500; // MAX: 700

const wheel = document.querySelector(".wheel");
const button = document.querySelector(".spin-button");

const items = [
  { text: "BAN 30s", color: "#fff", bgcolor: "#CFB1E4" },
  { text: "BAN 1m", color: "#fff", bgcolor: "#B68ED3" },
  { text: "BAN 5m", color: "#fff", bgcolor: "#9967BE" },
  { text: "BAN 15m", color: "#fff", bgcolor: "#8349AE" },
  { text: "BAN 30m", color: "#fff", bgcolor: "#72389e" },
  { text: "BAN 1h", color: "#fff", bgcolor: "#642D8D" },
  { text: "PERMABAN", color: "#fff", bgcolor: "#962338" },
  { text: "VIP", color: "#FFD700", bgcolor: "#2d5492" },
];

const getTimeToStop = () => TOTAL_TIME_SPIN + Math.floor(Math.random() * 200);

const ANGLE = 360 / items.length;
let spin = ANGLE + ANGLE / 2;
let timeToStop = getTimeToStop();
const gradient = items.map((item, index) => {
  const startStop = index * ANGLE;
  const endStop = (index + 1) * ANGLE;
  return item.bgcolor + " " + (startStop + 0.5) + "deg " + (endStop - 0.5) + "deg";
}).join(",");

wheel.style.setProperty("--slice-angle", ANGLE + "deg");
wheel.style.setProperty("--items", items.length);
wheel.style.setProperty("--spin", spin + "deg");
wheel.style.setProperty("--conic-gradient", `conic-gradient(${gradient})`);

items.forEach((item, index) => {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("text", "align");
  itemContainer.textContent = item.text;
  const itemAngle = (ANGLE / 2) + (ANGLE * index);
  itemContainer.style.setProperty("rotate", `${itemAngle}deg`);
  wheel.appendChild(itemContainer);
});

let delta = 15;

const updateSpin = () => {
  if (timeToStop < 0) {
    timeToStop = getTimeToStop();
    delta = 15;
    return;
  }
  const time = 10;

  if (timeToStop % 50 === 0) {
    delta--;
  }

  spin += delta;
  timeToStop--;
  wheel.style.setProperty("--spin", spin + "deg");
  setTimeout(() => updateSpin(), time);
};

button.addEventListener("click", () => updateSpin());
