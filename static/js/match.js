let level = 1;
let score = 0;
let matchedPairs = 0;
let totalPairs = 4;
let timer = 60;
let timerInterval;

const gameContainer = document.getElementById('gameContainer');
const levelDisplay = document.getElementById('levelDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');

function startGame() {
    matchedPairs = 0;
    totalPairs = 4 + (level - 1) * 2; // Increase pairs with level
    gameContainer.innerHTML = "";
    timer = 60 - (level - 1) * 5; // Less time for higher levels
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timer}s`;

    // Generate card values
    let values = [];
    for(let i=1;i<=totalPairs;i++){
        values.push(i);
        values.push(i);
    }
    values = shuffle(values);

    // Create cards
    values.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = "?";
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Time: ${timer}s`;
        if(timer <= 0){
            clearInterval(timerInterval);
            alert("Time's up! Game Over.");
            level = 1;
            score = 0;
            startGame();
        }
    }, 1000);
}

function shuffle(array) {
    for(let i = array.length -1; i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function flipCard() {
    if(lockBoard || this.classList.contains('matched') || this === firstCard) return;

    this.textContent = this.dataset.value;
    if(!firstCard){
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;

    if(firstCard.dataset.value === secondCard.dataset.value){
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        resetFlip();

        if(matchedPairs === totalPairs){
            clearInterval(timerInterval);
            if(level < 5){
                alert(`Level ${level} cleared! Next Level.`);
                level++;
                startGame();
            } else {
                alert("🎉 You cleared all levels! Congratulations!");
                level = 1;
                score = 0;
                startGame();
            }
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = "?";
            secondCard.textContent = "?";
            resetFlip();
        }, 800);
    }
}

function resetFlip() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start the game initially
startGame();
