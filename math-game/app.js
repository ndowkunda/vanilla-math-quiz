import questions from './questions.js'

let isPlaying = false
let action
let score = 0
let currentQuestion = 0
let startResetButton = document.getElementById("startReset")
let scoreValue = document.getElementById("scoreValue")
let countdownBox = document.getElementById("countdownBox")
let timeRemainingValue = document.getElementById("timeRemaining")
let gameOverBox = document.getElementById("gameOverBox")
let finalScoreValue = document.getElementById("finalScoreValue")
let questionBox = document.getElementById("question")
let choices = Array.from(document.querySelectorAll("div .option-box"))
let correct = document.getElementById("correct")
let incorrect = document.getElementById("incorrect")

function showQA(question) {
  setElementValue(questionBox, question.question)
  let answers = Object.values(question.answers)
  answers.forEach((answer, index) => {
    setElementValue(choices[index], answer)
  })
  checkAnswer(question)
}

function checkAnswer(question) {
  choices.forEach(answer => {
    answer.addEventListener('click', () => {
      if (answer.innerHTML == question.answers[`${question.correctAnswer}`]) {
        // TO FIX: timeout function currently doesnt clear correct status and takes second to appear!!!
        setTimeout(() => { show(correct); hide(incorrect) }, 1000)
        score++
        setElementValue(scoreValue, score)
        setNextQuestion()
      }
      else {
        // TO FIX: timeout function currently doesnt clear incorrect status and takes a second to appear!!!
        setTimeout(() => { show(incorrect) }, 1000)
      }
    }, { once: true })
  })
}

function setNextQuestion() {
  if (currentQuestion < questions.length - 1) {
    showQA(questions[++currentQuestion])
  }
  else {
    endGame()
  }
}

function setElementValue(element, value) {
  return element.innerHTML = value
}

function show(element) {
  element.setAttribute("style", "visibility: visible")
}

function hide(element) {
  element.setAttribute("style", "visibility: hidden")
}

function switchStartResetButtonState() {
  if (startResetButton.innerText == "Start Game") {
    setElementValue(startResetButton, "Reset Game")
  } else {
    setElementValue(startResetButton, "Start Game")
  }
}

function startCountdown(timeRemaining) {
  action = setInterval(() => {
    setElementValue(timeRemainingValue, timeRemaining)
    --timeRemaining
    if (timeRemaining < 0) {
      stopCountdown()
      endGame()
    }
  }, 1000)
}

function stopCountdown() {
  clearInterval(action)
}

//TO DO: revise game reset logic after endGame() occurs
function endGame() {
  hide(countdownBox)
  //TO FIX: delay in removing correct and try again statuses
  hide(correct)
  hide(incorrect)
  show(gameOverBox)
  setElementValue(finalScoreValue, score)
  setElementValue(startResetButton, "Start Game")
  isPlaying = false
}

startResetButton.addEventListener("click", () => {
  if (isPlaying) {
    location.reload()
  } else {
    isPlaying = true
    hide(gameOverBox)
    setElementValue(scoreValue, score)
    show(countdownBox)
    startCountdown(30)
    switchStartResetButtonState()
    showQA(questions[currentQuestion])
  }
})
