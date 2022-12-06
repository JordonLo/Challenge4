var beginButton = document.querySelector('.begin-button')
var nextBtn = document.getElementById('next-btn')
var questionBoxEl = document.getElementById('question-box')
var questionEl = document.getElementById('questions')
var answerEl = document.getElementById('answer-btns')
var countdownTimerEl = document.querySelector('.time')
var timeLeft = 60;
var saveButton = document.getElementById("save") 

let randomQuestions, currentQuestion

countdownTimerEl.addEventListener('click', setTime)
beginButton.addEventListener('click', beginGame)
nextBtn.addEventListener('click', () => {
    currentQuestion++
    pressNext()
})

function setTime() {
    var timerInterval = setInterval(function(){
        timeLeft--;
        countdownTimerEl.textContent = timeLeft + "time remaining";

        if(timeLeft === 0){
            clearInterval(timeInterval);
            alert("Failed to complete before time ran out!")
        }


    },1000)
}


function beginGame() {
    beginButton.classList.add('hide')
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionBoxEl.classList.remove('hide');
}

function pressNext() {
    presentNextQ(randomQuestions[currentQuestion])
} 

function presentNextQ(question) {
    questionEl.innerText= questions.questions
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectedAnswer)
        answerEl.appendChild(button)
    })
}

function pageReset() {
    clearStatus(document.body)
    nextBtn.classList.add('hide')
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    }
}

function selectedAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatus(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (randomQuestions.length > presentQ + 1) {
      nextBtn.classList.remove('hide')
    } else {
        beginButton.innerText = 'Restart'
        beginButton.classList.remove('hide')
    }
}

function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: 'Strings', correct: false},
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: true},
            { text: 'numbers', correct: false},
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed within ___',
        answers: [
            { text: 'quotes', correct: false},
            { text: 'curly brackets', correct: true},
            { text: 'parentheses', correct: false},
            { text: 'square brackets', correct: false},
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ___',
        answers: [
            { text: 'numbers and strings', correct: false},
            { text: 'other arrays', correct: false},
            { text: 'booleans', correct: false},
            { text: 'all of the above', correct: true},
        ]
    },
]

function saveLastTime() {
    var playerTime = {
        player: player.value,
        time: time.value
    };;
    localStorage.setItem("playerTime", JSON.stringify(playerScore));
}

function renderLastTime() {
    var lastTime = JSON.parse(localStorage.getItem("playerTime"))
    if (lastTime !== null) {
        document.getElementById("saved-name").innerHTML = lastTime.player
    }
}

saveButton.addEventListener('click', function(event) {
    event.preventDefault();
    saveLastTime();
    renderLastTime();
})
init();