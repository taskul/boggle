const form = document.querySelector('.words-form')
const submitButton = document.querySelector('#check-word-button')
const userInput = document.querySelector('#word-input')
const userMesssages = document.querySelector('.user-messages')
const userWordList = document.querySelector('.words-found')
const userScoreDisplay = document.querySelector('#score')
const letterCubes = document.querySelectorAll('.letter')
const timerDisplay = document.querySelector('.timer-display')
const numberOfTries = document.querySelector('#visit-counter')

let userScore = 0
let timer = 60
const userWords = []

form.addEventListener('submit', function(e) {
    // sends user input to flask back end using getUserInput()
    e.preventDefault()
    getUserInput();
    userInput.value = ''
})

async function getUserInput() {
    // send user input to flask back end using JSON
    const data = userInput.value;
    const response = await axios.post("/add-word", {'message':data})

    // checks response from the server and provides feedback message to user
    server_response = response.data['result']
    checkTheWord(server_response, data)
    // clears out the feedback message to user
    setTimeout(()=>{
        userMesssages.textContent=''
        userMesssages.classList = []
        userMesssages.classList.add('user-messages')
    }, 3000)
}

function checkTheWord(response, word) {
    // checks response from flask and creates a feedback message for user
    // if response is ok, then updates the user score, adds word to the 
    // list of words user have found
    if (response === 'ok') {
        if (userWords.includes(word)) {
            userMesssages.textContent = 'You already found that word!';
            userMesssages.classList.add('error')
            return;
        }
        userMesssages.textContent = 'Great Job!!!!!'
        userMesssages.classList.add('success')
        // scores the word depending on word length
        userScore += scoreWord(word)
        userScoreDisplay.textContent = userScore
        userWords.push(word)
        addWordToList(word)
    } else if (response === 'not-on-board') {
        userMesssages.textContent = 'Sorry, that word is not on the board'
        userMesssages.classList.add('error')
    } else {
        userMesssages.textContent = 'Unfortunately that is not a valid word'
        userMesssages.classList.add('error')
    }
}

function scoreWord(word){
    // scores the word depending on word length
    if (word.length < 5) {
        return 1
    } else if (word.length === 5) {
        return 2
    } else if (word.length === 6) {
        return 3
    } else if (word.length === 7) {
        return 5
    } else if (word.length >= 8 ) {
        return 11
    }
}

function addWordToList(word){
    // adds word to a list of words user have found
    const newWord = document.createElement('li')
    newWord.textContent = word
    userWordList.append(newWord)
}



async function postUserScore() {
    // send user score to flask using post request
    const response = await axios.post('/record-score',{'score':userScore})
}

function countDown(){
    // count down that ends the game and disables any additional user input
    // then sends a post request to flask with user score.
    const timerInterval = setInterval(function() {
        timer--
        timerDisplay.textContent = timer
        if (timer === 0) {
            clearInterval(timerInterval)
            userMesssages.classList.add('game-over')
            userMesssages.textContent = 'Time is up!'
            submitButton.disabled = true;
            userInput.disabled = true;
            postUserScore()
        }
    },1000)
}

timerDisplay.textContent = timer;
countDown()


// storing high score in localStorge option.
// function recordHighScore() {
//     let scoreList = []
//     let highScoresList = JSON.parse(localStorage.getItem('highScores'));
//     if (highScoresList) {
//         scoreList = [...highScoresList, userScore]
//     } else {
//         scoreList.push(userScore)
//     }
//     localStorage.setItem('highScores', JSON.stringify(scoreList));
// }
