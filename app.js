const quiz = [
    {
        question: "When is Musia's birthday?",
        answers: ["January 1st", "February 2nd", "March 3rd", "April 21th"],
        correctAnswer: "April 21th"
    },
    {
        question: "What is Elisa's favorite word?",
        answers: ["A-wesome", "A-mazing", "Happiness", "Perfect"],
        correctAnswer: "A-mazing"
    }
];

const startbtn = document.querySelector(".start-button");
const startAgainbtn = document.querySelector(".start-again")
const nextBtn = document.querySelector(".next-btn") 

let currentQuestion = 0;
let score = 0;

function displayQuestion(){
    const questionElem = document.querySelector(".question");
    const answersElem = document.querySelector(".answers");

    startbtn.style.display = "none"
    startAgainbtn.style.display = "none"
    nextBtn.style.display="none"
    

    questionElem.innerHTML = quiz[currentQuestion].question;
    
    answersElem.innerHTML = '';
    quiz[currentQuestion].answers.forEach((answer) =>{
        const li = document.createElement('li')
        li.textContent = answer;
        li.addEventListener("click", ()=>{
            checkAnswer(li);
        })
        answersElem.appendChild(li)
    })
    if(currentQuestion === quiz.length -1){
         nextBtn.textContent = "See results"
    }
}

function checkAnswer(selectedAsnwer){
    if(selectedAsnwer.textContent === quiz[currentQuestion].correctAnswer){
        selectedAsnwer.classList.add('correct')
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        score++;
        nextBtn.style.display = "block"
    } else{
        selectedAsnwer.classList.add('incorrect')
        nextBtn.style.display = "block"
    }


    const answersElems = document.querySelectorAll('.answer li')
        answersElems.forEach((answer) =>{
        answer.removeEventListener("click", checkAnswer)
    }) 

    currentQuestion++;

        nextBtn.addEventListener("click",()=>{
            if(currentQuestion < quiz.length){
             displayQuestion()
         }else{
             displayScore()
         }
        })
}

function displayScore(){
    const quizContainer = document.querySelector('.quiz-container')
    quizContainer.innerHTML = `<h2>Quiz Complete</h2>
                                <p>You scored ${score} out of ${quiz.length}</p>`;
    startAgainbtn.style.display = "block"
    if(score === quiz.length){
        const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
    return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
    );
    confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
    );
    }, 250);
    }
    
    }

startbtn.addEventListener("click", displayQuestion)
startAgainbtn.addEventListener("click", ()=>{
    location.reload();

})


