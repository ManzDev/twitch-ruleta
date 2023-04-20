const TOTAL_TIME_SPIN = 500; // MAX: 700

const clickSounds = [];
for (let i = 1; i < 7; i++) {
  clickSounds.push(new Audio(`sounds/click-${i}.ogg`));
}

const playClick = () => {
  clickSounds.forEach(sound => sound.pause());
  const index = ~~(Math.random() * clickSounds.length);
  const selectedSound = clickSounds[index];
  selectedSound.volume = 0.2;
  selectedSound.currentTime = 0;

  selectedSound.play();
};

const playFinish = () => {
  const finishSound = new Audio("sounds/alert.ogg");
  finishSound.currentTime = 0;
  finishSound.play();
};

const wheel = document.querySelector(".wheel");
const button = document.querySelector(".spin-button");
const select = document.querySelector("select");
const policeImage = document.querySelector("img.police");

select.addEventListener("change", () => {
  const selectedOption = select.selectedOptions[0].value;
  policeImage.src = `images/${selectedOption}.png`;
  policeImage.alt = selectedOption;
});

const items = [
  { text: "BAN 30s", subtext: "", color: "#fff", bgcolor: "#CFB1E4" },
  { text: "BAN 1m", subtext: "60s", color: "#fff", bgcolor: "#B68ED3" },
  { text: "BAN 5m", subtext: "300s", color: "#fff", bgcolor: "#9967BE" },
  { text: "BAN 15m", subtext: "900s", color: "#fff", bgcolor: "#8349AE" },
  { text: "BAN 30m", subtext: "1800s", color: "#fff", bgcolor: "#72389e" },
  { text: "BAN 1h", subtext: "3600s", color: "#fff", bgcolor: "#642D8D" },
  { text: "PERMABAN", subtext: "", color: "#fff", bgcolor: "#962338" },
  { text: "VIP", subtext: "", color: "#FFD700", bgcolor: "#2d5492" },
];

const getTimeToStop = () => TOTAL_TIME_SPIN + Math.floor(Math.random() * 200);

const ANGLE = 360 / items.length;
const INITIAL_SPIN = ANGLE + ANGLE / 2;
let spin = INITIAL_SPIN;
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
  itemContainer.innerHTML = `${item.text} <span>${item.subtext}</span>`;
  const itemAngle = (ANGLE / 2) + (ANGLE * index);
  itemContainer.style.setProperty("rotate", `${itemAngle}deg`);
  wheel.appendChild(itemContainer);
});

let delta = 15;

const updateSpin = () => {
  if (timeToStop < 0) {
    timeToStop = getTimeToStop();
    delta = 15;
    button.removeAttribute("disabled");
    playFinish();
    return;
  }
  const time = Math.log(285 - timeToStop) * 4; // 10

  if (timeToStop % 50 === 0) {
    delta--;
  }

  if (timeToStop % (10 - delta) === 0) {
    // console.log({ timeToStop, delta, spin });
    playClick();
  }

  spin += delta;
  timeToStop--;
  wheel.style.setProperty("--spin", spin + "deg");
  setTimeout(() => updateSpin(), time);
};

button.addEventListener("click", () => {
  button.setAttribute("disabled", "");
  updateSpin();
});
