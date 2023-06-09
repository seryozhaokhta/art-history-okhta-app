let quizQuestions = [
    {
        image: "url_of_image1",
        correctAnswer: "Proto",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image2",
        correctAnswer: "Proto",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image3",
        correctAnswer: "Early",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image4",
        correctAnswer: "Early",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image5",
        correctAnswer: "High",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image6",
        correctAnswer: "High",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image7",
        correctAnswer: "Mannerism",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image8",
        correctAnswer: "Mannerism",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
    {
        image: "url_of_image9",
        correctAnswer: "Mannerism",
        choices: ["Proto", "Early", "High", "Mannerism"]
    },
];

let currentQuestionIndex = 0;

function displayCurrentQuestion() {
    let quizContainer = document.getElementById('quiz-container');
    let currentQuestion = quizQuestions[currentQuestionIndex];

    quizContainer.innerHTML = "";

    let imageElement = document.createElement('img');
    imageElement.src = currentQuestion.image;
    quizContainer.appendChild(imageElement);

    for (let choice of currentQuestion.choices) {
        let button = document.createElement('button');
        button.textContent = choice;
        button.onclick = function () {
        
            if (choice === currentQuestion.correctAnswer) {
                console.log("Correct!");
            } else {
                console.log("Incorrect.");
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                displayCurrentQuestion();
            } else {
                console.log("Quiz is over!");
            }
        };
        quizContainer.appendChild(button);
    }
}

displayCurrentQuestion();
