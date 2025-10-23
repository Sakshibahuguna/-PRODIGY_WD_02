let startTime = 0;
let elapsed = 0;
let running = false;
let timer;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function format(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return (
    String(hrs).padStart(2, "0") + ":" +
    String(mins).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0")
  );
}

function update() {
  elapsed = Date.now() - startTime;
  display.textContent = format(elapsed);
}

document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(update, 100);
    running = true;
  }
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  running = false;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  elapsed = 0;
  running = false;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  if (running) {
    const li = document.createElement("li");
    li.textContent = format(elapsed);
    laps.prepend(li);
  }
});
