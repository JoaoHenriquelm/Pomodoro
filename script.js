var pomodoroTimer = document.getElementById("pomodoro-timer")
var pomodoroStart = document.getElementById("pomodoro-start")
var pomodoroPause = document.getElementById("pomodoro-pause")
var pomodoroTimerTitle = document.getElementById("pomodoroTimer")
var shortBreakTimerTitle = document.getElementById("shortBreakTimer")
pomodoroTimerTitle.classList.add("ativo")
pomodoroTimer.innerText = "25:00"

var minutos = 0
var segundos = 0
var contador = 1

function shortBreakPage() {
  pomodoroStart.style.display = "block"
  pomodoroPause.style.display = "none"
  pomodoroTimerTitle.classList.remove("ativo")
  shortBreakTimerTitle.classList.add("ativo")
  contador = 2
  pomodoroTimer.innerText = "05:00"
  minutos = 5
  segundos = 0
}

function pomodoroPage() {
  pomodoroStart.style.display = "block"
  pomodoroPause.style.display = "none"
  shortBreakTimerTitle.classList.remove("ativo")
  pomodoroTimerTitle.classList.add("ativo")
  contador = 2
  pomodoroTimer.innerText = "25:00"
  minutos = 25
  segundos = 0
}

function startPomodoro() {
  let pausa = setInterval(() => {
    if (pomodoroTimerTitle.classList.contains("ativo")) {
      pomodoro()
      function pomodoro() {
        if (minutos == 0 && segundos == 0 && contador == 1) {
          minutos = 25
          segundos = 0
          contador = 2
        } else if (segundos <= 0 && minutos <= 0 && contador == 2) {
          contador = 1
          clearInterval(pausa)
          pomodoroPause.style.display = "none"
          pomodoroStart.style.display = "block"
          pomodoroTimerTitle.classList.remove("ativo")
          shortBreakTimerTitle.classList.add("ativo")
        } else if (pomodoroStart.style.display == "block") {
          clearInterval(pausa)
        } else if (
          segundos > 0 &&
          minutos > -1 &&
          pomodoroStart.style.display == "none"
        ) {
          --segundos
        } else if (segundos == 0) {
          --minutos
          segundos = 59
        }

        let timer =
          (minutos < 10 ? `0${minutos}` : minutos) +
          ":" +
          (segundos < 10 ? `0${segundos}` : segundos)

        pomodoroTimer.innerText = timer
        document.title = `${timer} - Tempo restante`
      }
    } 

    if (shortBreakTimerTitle.classList.contains("ativo")) {
      breakTime()
      function breakTime() {
        if (minutos == 0 && segundos == 0 && contador == 1) {
          minutos = 5
          segundos = 0
          contador = 2
        } else if (segundos <= 0 && minutos <= 0 && contador == 2) {
          contador = 1
          clearInterval(pausa)
          pomodoroPause.style.display = "none"
          pomodoroStart.style.display = "block"
          shortBreakTimerTitle.classList.remove("ativo")
          pomodoroTimerTitle.classList.add("ativo")
          add()
        } else if (pomodoroStart.style.display == "block") {
          clearInterval(pausa)
        } else if (
          segundos > 0 &&
          minutos > -1 &&
          pomodoroStart.style.display == "none"
        ) {
          --segundos
        } else if (segundos == 0) {
          --minutos
          segundos = 59
        }

        let timer =
          (minutos < 10 ? `0${minutos}` : minutos) +
          ":" +
          (segundos < 10 ? `0${segundos}` : segundos)

        pomodoroTimer.innerText = timer
        document.title = `${timer} - Tempo restante`
      }
    } 
  }, 1000)
}

function play() {
  if (pomodoroStart.style.display == "block") {
    pomodoroStart.style.display = "none"
    pomodoroPause.style.display = "block"
  } else {
    pomodoroPause.style.display = "none"
    pomodoroStart.style.display = "block"
  }

  if (pomodoroPause.style.display == "block") {
    startPomodoro()
  }
}

function add() {
  contador = 25
  minutos = 0
  segundos = 5
}