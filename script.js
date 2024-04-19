const pomodoroTimer = document.getElementById("pomodoro-timer");
const pomodoroStart = document.getElementById("pomodoro-start");
const pomodoroPause = document.getElementById("pomodoro-pause");
const pomodoroTimerTitle = document.getElementById("pomodoroTimer");
const shortBreakTimerTitle = document.getElementById("shortBreakTimer");
pomodoroTimerTitle.classList.add("ativo");
pomodoroTimer.innerText = "25:00";
let pausa;

let minutos = 0;
let segundos = 0;
let contador = 1;



function shortBreakPage() {
  clearInterval(pausa);
  pomodoroStart.style.display = "block";
  pomodoroPause.style.display = "none";
  pomodoroTimerTitle.classList.remove("ativo");
  shortBreakTimerTitle.classList.add("ativo");
  contador = 2;
  pomodoroTimer.innerText = "05:00";
  minutos = 5;
  segundos = 0;
}

function pomodoroPage() {
  clearInterval(pausa);
  pomodoroStart.style.display = "block";
  pomodoroPause.style.display = "none";
  shortBreakTimerTitle.classList.remove("ativo");
  pomodoroTimerTitle.classList.add("ativo");
  contador = 2;
  pomodoroTimer.innerText = "25:00";
  minutos = 25;
  segundos = 0;
}

function startPomodoro() {
  if (pomodoroTimerTitle.classList.contains("ativo")) {
    timer(25);
  }

  if (shortBreakTimerTitle.classList.contains("ativo")) {
    timer(5);
  }
}

function play() {
  if (pomodoroStart.style.display !== "block") {
    pomodoroPause.style.display = "none";
    pomodoroStart.style.display = "block";
    clearInterval(pausa);
  } else if (pomodoroStart.style.display == "block") {
    pomodoroStart.style.display = "none";
    pomodoroPause.style.display = "block";
    startPomodoro();
  }
}

function timer(tempo) {
  pausa = setInterval(() => {
    if (pomodoroStart.style.display == "block") {
      clearInterval(pausa);
    }
    if (minutos == 0 && segundos == 0 && contador == 1) {
      minutos = tempo;
      segundos = 0;
      contador = 2;
    } else if (segundos <= 0 && minutos <= 0 && contador == 2) {
      contador = 1;
      clearInterval(pausa);
      pomodoroPause.style.display = "none";
      pomodoroStart.style.display = "block";
      if (pomodoroTimerTitle.classList.contains("ativo")) {
        pomodoroTimerTitle.classList.remove("ativo");
        shortBreakTimerTitle.classList.add("ativo");
      } else {
        shortBreakTimerTitle.classList.remove("ativo");
        pomodoroTimerTitle.classList.add("ativo");
      }
    } else if (
      segundos > 0 &&
      minutos > -1 &&
      pomodoroStart.style.display == "none"
    ) {
      --segundos;
    } else if (segundos == 0) {
      --minutos;
      segundos = 59;
    }

    let timer =
      (minutos < 10 ? `0${minutos}` : minutos) +
      ":" +
      (segundos < 10 ? `0${segundos}` : segundos);

    pomodoroTimer.innerText = timer;
    document.title = `${timer} - Tempo restante`;
  }, 1000);
}