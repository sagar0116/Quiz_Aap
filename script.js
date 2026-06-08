 const startScreen = document.getElementById("start-screen");
        const quizScreen = document.getElementById("quiz-screen");
        const resultScreen = document.getElementById("result-screen");
        const startButton = document.getElementById("start-btn");
        const questionText = document.getElementById("question-text");
        const answerContainer = document.getElementById("answers-container");
        const currentQuestionSpan = document.getElementById("current-question");
        const totalQuestionSpan = document.getElementById("total-questions");
        const scoreSpan = document.getElementById("score");
        const finalScoreSpan = document.getElementById("final-score");
        const maxScoreSpan = document.getElementById("max-score");
        const resultMessage = document.getElementById("result-message");
        const restartButton = document.getElementById("restart-btn");
        const progressBar = document.getElementById("progress");

        const quizQuestions = [
            {
                question: "What is the default execution model of JavaScript?",
                answers: [
                    { text: "Asynchronous", correct: false },
                    { text: "Multi-threaded", correct: false },
                    { text: "Synchronous", correct: true },
                    { text: "Non-blocking", correct: false },
                ],
            },
            {
                question: "In synchronous code, the next operation?",
                answers: [
                    { text: "Runs in parallel", correct: false },
                    { text: "Waits until the current operation is completed (Blocking)", correct: true },
                    { text: "Runs in the background", correct: false },
                    { text: "Never executes", correct: false },
                ],
            },
            {
                question: "What does it mean that JavaScript is single-threaded?",
                answers: [
                    { text: "It uses browser threads", correct: false },
                    { text: "Only asynchronous code can run", correct: false },
                    { text: "Multiple threads can run simultaneously", correct: false },
                    { text: "Only one piece of code can be executed at a time", correct: true },
                ],
            },
            {
                question: "Which of the following is an example of a synchronous function?",
                answers: [
                    { text: "setTimeout()", correct: false },
                    { text: "fetch()", correct: false },
                    { text: "A normal function with return statement", correct: true },
                    { text: "Promise", correct: false },
                ],
            },
            {
                question: "What happens when a heavy loop runs in synchronous JavaScript code?",
                answers: [
                    { text: "The page continues to run smoothly", correct: false },
                    { text: "It automatically becomes asynchronous", correct: false },
                    { text: "The UI freezes (Blocking behavior)", correct: true },
                    { text: "It throws an error", correct: false },
                ],
            },
            {
                question: "What does the Call Stack do in JavaScript?",
                answers: [
                    { text: "Handles asynchronous tasks", correct: false },
                    { text: "Stores only promises", correct: false },
                    { text: "Queues microtasks", correct: false },
                    { text: "Manages synchronous function calls (LIFO order)", correct: true },
                ],
            },
            {
                question: "What is the main difference between Synchronous and Asynchronous code?",
                answers: [
                    { text: "Synchronous code is always faster", correct: false },
                    { text: "Synchronous code is blocking, Asynchronous code is non-blocking", correct: true },
                    { text: "Both are the same", correct: false },
                    { text: "Error handling is difficult in asynchronous code", correct: false },
                ],
            },
            {
                question: "In which order does synchronous code execute?",
                answers: [
                    { text: "Random order", correct: false },
                    { text: "Bottom to top", correct: false },
                    { text: "Line by line from top to bottom", correct: true },
                    { text: "First async tasks, then sync tasks", correct: false },
                ],
            },
            {
                question: "What is the main advantage of synchronous programming in JavaScript?",
                answers: [
                    { text: "Easy to understand, debug, and predict", correct: true },
                    { text: "Better performance for heavy tasks", correct: false },
                    { text: "Non-blocking behavior", correct: false },
                    { text: "Multiple operations can run at the same time", correct: false },
                ],
            },
            {
                question: "What is the key difference between textContent and innerHTML?",
                answers: [
                    { text: "innerHTML is faster and safer", correct: false },
                    { text: "Both are exactly the same", correct: false },
                    { text: "textContent is faster and safer as it does not parse HTML", correct: true },
                    { text: "textContent can execute scripts while innerHTML cannot", correct: false },
                ],
            },
        ];

    // Quize state variables
    let currentQuestionIndex = 0;
    let score = 0;
    let answersDisabled = false;
    totalQuestionSpan.textContent = quizQuestions.length;
    maxScoreSpan.textContent = quizQuestions.length;


    // question dikhayega ye function 

    let showQuestion = () => {
        // reset state

        answersDisabled = false;
        const currentQuestion = quizQuestions[currentQuestionIndex];
        currentQuestionSpan.textContent = currentQuestionIndex +1;
        const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
        progressBar.style.width = progressPercent + "%";

        // ye line question la ke dega 
        questionText.textContent = currentQuestion.question;

        // Mushkil pado 

        answerContainer.innerHTML = "";

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.textContent = answer.text
            button.classList.add("answer-btn")


            // learn about dataset
            button.dataset.correct = answer.correct

            button.addEventListener("click", selectAnswer)

            answerContainer.appendChild(button);
        });
    }


    function selectAnswer(event) {

        if(answersDisabled) return;

        answersDisabled = true;

        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true";

        Array.from(answerContainer.children).forEach(button =>{
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            } else{
                button.classList.add("incorrect");
            }
        });

        if(isCorrect) {
            score++;
            scoreSpan.textContent = score;
        }

        setTimeout(() => {
            currentQuestionIndex++;

            if(currentQuestionIndex < quizQuestions.length){
                showQuestion()
            } else{
                showResults()
            }
        },1000)
    }


    function showResults () {
        quizScreen.classList.remove("active");
        resultScreen.classList.add("active");

        finalScoreSpan.textContent = score;

        const percentage = (score/quizQuestions.length) * 100;

        if(percentage === 100) {
            resultMessage.textContent = "Perfect! you're a genius!";
        }

        else if(percentage => 80) {
            resultMessage.textContent = "Great job! you know your stuff!";
        }

        else if(percentage => 60) {
            resultMessage.textContent = "Good effort! keep learning";
        }
        else if (percentage => 40 ) {
            resultMessage.textContent = "Not bad! Try again to improve!";
        }

        else {
            resultMessage.textContent = "Keep studying! you'll get better!";
        }
    }

    // Event listener

        let starQuiz = () => {
        // console.log("quiz started");
        // reset vairable
        currentQuestionIndex = 0;
        scoreSpan.textContent = score;


        startScreen.classList.remove("active");
        quizScreen.classList.add("active");
        
        showQuestion();
    };


    let restartQuiz = () => {
        resultScreen.classList.remove("active");
        // resultScreen.classList.add("active");
        

        starQuiz();
    };

    startButton.addEventListener("click", starQuiz);
    restartButton.addEventListener("click", restartQuiz);