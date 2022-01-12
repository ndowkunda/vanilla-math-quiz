import questions from './questions.js'

let isPlaying = false
let score, currentQuestion = 0
let action
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
        hide(incorrect)
        show(correct)
        setTimeout(() => { hide(correct) }, 1000)
        score++
        setElementValue(scoreValue, score)
        setNextQuestion()
      }
      else {
        hide(correct)
        show(incorrect)
        setTimeout(() => { hide(incorrect) }, 1000)
      }
    }, { once: true })
  })
}

function setNextQuestion() {
  if (currentQuestion < questions.length - 1) {
    console.log(currentQuestion)
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

function endGame() {
  isPlaying = false
  stopCountdown()
  hide(countdownBox)
  hide(correct)
  hide(incorrect)
  show(gameOverBox)
  setElementValue(finalScoreValue, score)
  setElementValue(startResetButton, "Start Game")
}

function resetGame() {
  isPlaying = true
  score = 0
  currentQuestion = 0
  hide(gameOverBox)
  show(countdownBox)
  setElementValue(scoreValue, score)
  switchStartResetButtonState()
  startCountdown(30)
  showQA(questions[currentQuestion])
}

function startGame() {
  startResetButton.addEventListener("click", () => {
    if (isPlaying) {
      location.reload()
    } else {
      resetGame()
    }
  })
}

startGame()

