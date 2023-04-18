
//creating array to contain questions, answer choices and the answers
const quizData = [
	{
	  question: "Commonly used data types do NOT include:",
	  choices: ["Strings", "Booleans", "Alerts", "Numbers"],
	  answer: "Alerts",
	},
	{
	  question: "The condition of an if statement is closed within?",
	  choices: ["Commas", "Curly Brackets", "Quotes", "Square Brackets"],
	  answer: "Curly Brackets",
	},
	{
	  question: "Arrays in a javascript can be used to store _____.",
	  choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
	  answer: "All of the above",
	},
	{
	  question: "String values must be enclosed within ______ when being assigned to variables",
	  choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
	  answer: "Quotes",
	},
	{
	  question: "A very useful tool used during development and debugging for printing content",
	  choices: ["JavaScript", "Terminal/Bash", "For loops", "console.log"],
	  answer: "console.log",
	},
  ];
  
  // Global variables

  let currentQuestion = 0;
  let score = 0; 
  let highScore = 0;
  let timer = null;
  let timeLimit = 30;


  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const finalScoreElement = document.getElementById("final-score");
  const highScoreElement = document.getElementById("high-score");
  const startButton = document.getElementById("start-button");
  const playAgainButton = document.getElementById("play-again-button");
  const quizElement = document.getElementById("quiz");
  const gameOverElement = document.getElementById("game-over");
  const startElement = document.getElementById("start")
  const tryAgainButton = document.getElementById("try-again");
  const submit = document.getElementById("submit");
  const highScoresList = document.getElementById("high-scores-list");
  const highScoreForm = document.getElementById("high-score-form");
  const clearScoresButton = document.getElementById("clear-scores");

// display text correct or incorrect.
  const resultElement = document.getElementById("result")
  


// Start quiz function
  function startQuiz() {
	highScoreElement.style.display = "none";
	resultElement.innerHTML = "";
	currentQuestion = 0;
	score = 0;
	startElement.style.display = "none";
	// showHighScores(highScores);
	setScore(0);
	setTimer(timeLimit);
	showQuiz();
	showQuestion();
}
  
//show quiz function, quizElement has initially been set to display: none in the style sheet
  function showQuiz() {
	//will allow the quizElement to show once to function has been called
	quizElement.style.display = "block";
	//will allow the gameOverElement to hide once this function has been called
	gameOverElement.style.display = "none";
}
  
// Show question function
  function showQuestion() {

	const question = quizData[currentQuestion];
	//display the question property value in the quizData array
	questionElement.innerText = question.question;
	choicesElement.innerHTML = "";
	question.choices.forEach((choice) => {
	  const button = document.createElement("button");
	  button.innerText = choice;
	  button.classList.add("choice");
	  button.addEventListener("click", handleAnswer);
	  choicesElement.appendChild(document.createElement("li")).appendChild(button);
	});
}
  
  // Handle answer function
function handleAnswer(event) {

  //targeting the element by click 
  const selectedChoice = event.target;


  //getting the text content from the selectedChoice object event.
  const selectedAnswer = selectedChoice.innerText;

  //getting a chosen answer to see if it is correct
  const question = quizData[currentQuestion];
  //stating that the variable correctAnswer is equal to the property value of answer in the quizData array.
  const correctAnswer = question.answer;

  // if statement to check if the above is true
  if (selectedAnswer === correctAnswer) {
	//add to score
    score = (score + 10);
	//if correct, the html will say
    resultElement.innerHTML = "Correct!"
    setScore(score);
  } else {
	//if incorrect, the html will say and will deduct 5 seconds from the timer
  	resultElement.innerHTML = "Incorrect!"
  	timeLimit -= 5;	
  }
  //will stop the quiz once the last question has been answered
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
	//if there are no more questions, the endQuiz function will be called to display the gameOver screen
    endQuiz();
    showHighScores();
  }
}
  
//set score function
  function setScore(score) {
    scoreElement.innerText = `Score: ${score}`;
}
  
//set timer function
function setTimer(time) {
  timerElement.textContent = `Time Left: ${time.toFixed(1)}s`;
  if (time <= 0) {
    endQuiz();
  } else {
    timer = setTimeout(() => {
  	//set timer to split seconds
  	setTimer(time - 0.1);
    }, 100);
  }
}
  
//end quiz function
function endQuiz() {
  clearTimeout(timer);
  //will allow only the gameOver screen to display while it hides all other elements
  hideQuiz();
  showGameOver();
  setFinalScore(score)
  }
	
// Hide quiz function
function hideQuiz() {
  quizElement.style.display = "none";
}
	
//show game over function
function showGameOver() {
  gameOverElement.style.display = "block";
  };

//set and show final score function
function setFinalScore() {
  finalScoreElement.innerText = score;
} 

function showHighScore() {
  highScoreElement.style.display = "flex";
}

// highscore
highScoreForm.addEventListener("submit", function(event) {
  event.preventDefault();

  //make the game over screen hide upon entering initials
  gameOverElement.style.display = "none";

  showHighScore();
  

  const initialsInput = document.getElementById("initials");
  
  //sets initials to uppercase
  const initials = initialsInput.value.toUpperCase();
  //will only proceed if the rule is followed
  if (initials.length < 2 || initials.length > 3) {
  //alerts the user how to advance
  alert("Please enter 2 or 3 characters for your initials.");
  //checks if criteria is correct
  return;
  }
  const highScore = { initials: initials, score: score };
  addHighScore(highScore);
  //sets value to blank
  initialsInput.value = "";
  });

function addHighScore(highScore) {
  let highScores = getHighScores();
  //allow highest highScores to display
  highScores.push(highScore);
  highScores.sort(function(a, b) {
  return b.score - a.score;
  });
  //allows only 3 highScores to display
  highScores = highScores.slice(0, 3);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  showHighScores(highScores);
  }
  //getting high scores value from local storage
  function getHighScores() {
  let highScores = localStorage.getItem("highScores");
  if (highScores) {
  return JSON.parse(highScores);
  } else {
  return [];
  }
  }
  
//allows the higScores to append their individual elements
function showHighScores(highScores) {
  highScoresList.innerHTML = "";
  for (let i = 0; i < highScores.length; i++) {
    const li = document.createElement("li");
	//creating span element to textContent both initials and highScore
    const initialsSpan = document.createElement("span");
    initialsSpan.classList.add("initials");
    initialsSpan.textContent = highScores[i].initials;
    const scoreSpan = document.createElement("span");
    scoreSpan.classList.add("score");
    scoreSpan.textContent = highScores[i].score;
    li.appendChild(initialsSpan); 
    li.appendChild(scoreSpan);
    highScoresList.appendChild(li);
  }
}

//startbutton event listener
startButton.addEventListener("click", startQuiz);

//playAgainButton event listener
playAgainButton.addEventListener("click", startQuiz);

//clearScoresButton event listener
clearScoresButton.addEventListener("click", clearHighScores);

//removes all highScores data and sets the innerHTML content to blank
function clearHighScores() {
	localStorage.removeItem("highScores");
	highScoresList.innerHTML = "";
}