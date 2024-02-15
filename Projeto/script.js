import questionsRedes from "./quest/questionRedes.js";
import questionsSI from "./quest/questionsSI.js";
import questions from "./quest/questions.js"

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

let currentIndex = 0;
let questionsCorrect = 0;
let currentQuestions; // Armazena as perguntas atuais

// Função para inicializar o quizz com base no tipo de HTML
function initializeQuiz(type) {
  switch (type) {
    case "Redes":
      currentQuestions = questionsRedes;
      break;
    case "SI":
      currentQuestions = questionsSI;
      break;
    default:
      currentQuestions = questions; // Padrão para TI
  }
}

// Inicializa o quizz com base no tipo de HTML
initializeQuiz(type);

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

// Defina um array para armazenar as respostas erradas
let wrongAnswers = [];

function nextQuestion(e) {
  const answerButton = e.target;
  const isCorrect = answerButton.getAttribute("data-correct") === "true";

  if (isCorrect) {
    questionsCorrect++;
  } else {
    // Se a resposta estiver errada, armazene a questão e a resposta errada
    wrongAnswers.push({
      question: currentQuestions[currentIndex].question,
      wrongAnswer: answerButton.textContent.trim()
    });
  }

  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${currentQuestions.length}`;
  // Se houver respostas erradas, exiba-as
  if (wrongAnswers.length > 0) {
    const wrongAnswersContainer = document.querySelector(".wrong-answers");
    wrongAnswersContainer.innerHTML = "<h3>Respostas Erradas:</h3>";
    wrongAnswers.forEach((item, index) => {
      const div = document.createElement("div");
      div.textContent = `${index + 1}. ${item.question} - Resposta Errada: ${item.wrongAnswer}`;
      wrongAnswersContainer.appendChild(div);
    });
  }
  content.style.display = "none";
  contentFinish.style.display = "flex";
}


function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${currentQuestions.length}`;
  const item = currentQuestions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
