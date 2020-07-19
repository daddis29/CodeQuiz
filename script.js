const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Ham Tomato Mayo Lettuce",
        choice2: "Hyper Text Markup Language",
        choice3: "Happy To Meet Lori",
        choice4: "Have The Mets Lost?",
        answer: 2
    },
    {
        question: "What is the proper code for the first heading?",
        choice1: "<heading>",
        choice2: "<header>",
        choice3: "<h1>",
        choice4: "<head>",
        answer: 3
    },
    {
        question: "In CSS, what is the syntax for background color?",
        choice1: "background",
        choice2: "color-background",
        choice3: "color",
        choice4: "background-color",
        answer: 4
    },
    {
        question: "What are the main coding languages?",
        choice1: "Coffee, Bagel, HTML",
        choice2: "CSS, Javascript, JSON",
        choice3: "CSS, Javascript, HTML",
        choice4: "None of these",
        answer: 3
    },
    {
        question: "How should a string be defined in Javascript?",
        choice1: "With quotes around it",
        choice2: "A question mark at the end",
        choice3: "Two exclamation points before it",
        choice4: "All of these",
        answer: 1
    },
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();