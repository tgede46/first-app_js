const Questions = [
  {
    question: ' Quel problème du millénaire avait résolu le Russe Grigoriy Perelman ?  ',
    answers: ['Laconjoncture de Poincaré', 'le nombre d or', 'le probleme a trois corps'],
    correct: 'Laconjoncture de Poincaré',
  },
  {
    question:
      ' Entre quels deux pays eut lieu la guerre des Toyota liés à la bande d’Aozou ? ',
    answers: [' Tchad et Lybie', 'Japoon et Chine', 'France et Italie '],
    correct: ' Tchad et Lybie',
  },
  {
    question: 'Quel est plus grand lac d’Afrique ? ',
    answers: [ 'Lac Togo', 'Lac Victoria', 'Lac tanganigare'],
    correct: 'Lac Victoria',
  },
  {
    question: "Combien pesait le premier ordinateur au monde?",
    answers: ['10 Tonnes', '1 kg', '30 Tonnes'],
    correct:'30 Tonnes',
  },
  {
    question: 'Quel océan détient le plus d’eau ? ?',
    answers: ['Atlantique', 'Oceanie', 'Pacifique '],
    correct: 'Pacifique ',
  },
  {
    question:'A quel héros de l’Ouest rattachez-vous Jolly Jumper ?  ?',
    answers: ['Socrate', 'Lucky Luke', 'Joe'],
    correct: 'Lucky Luke',
  },
  {
    question: " Quel est la capitale de la Suède ",
    answers: [' Stockholm', 'Oslo', 'Helsinki'],
    correct: ' Stockholm',
  },
  {
    question: 'Quel écrivain nous a laissé le roman : L’enfant et la rivière ?  ' ,
    answers: ['Hugo ', 'Henri Bosco', 'Voltaire'],
    correct: 'Henri Bosco',
  },
  {
    question:

      'Dans quel pays se trouve la ville de Fès ?  ?',
    answers: ['Egypte', 'Tunisie', 'Maroc', 'Algerie'],
    correct: 'Maroc',
  },
  {
    question: 'A quel pays rattachez-vous la ville de Mossoul ? ',
    answers: ['Quatar', 'Iran', 'Yemen', 'Irak'],
    correct: 'Irak', }
]


const TIMEOUT = 4000;

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");

startButton.addEventListener("click", startQuiz);

function startQuiz(event) {
  event.stopPropagation();
  let currentQuestion = 0;
  let score = 0;

  displayQuestion(currentQuestion);

  function clean() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
    const progress = getProgressBar(Questions.length, currentQuestion);
    app.appendChild(progress);
  }

  function displayQuestion(index) {
    clean();
    const question = Questions[index];

    if (!question) {
      displayFinishMessage();
      return;
    }

    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);

    const submitButton = getSubmitButton();

    submitButton.addEventListener("click", submit);

    app.appendChild(submitButton);
  }

  function displayFinishMessage() {
    const h1 = document.createElement("h1");
    h1.innerText = "Bravo ! Tu as terminé le quiz.";
    const p = document.createElement("p");
    p.innerText = `Tu as eu ${score} sur ${Questions.length} point !`;

    app.appendChild(h1);
    app.appendChild(p);
  }

  function submit() {
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');

    disableAllAnswers();

    const value = selectedAnswer.value;

    const question = Questions[currentQuestion];

    const isCorrect = question.correct === value;

    if (isCorrect) {
      score++;
    }

    showFeedback(isCorrect, question.correct, value);
    displayNextQuestionButton(() => {
      currentQuestion++;
      displayQuestion(currentQuestion);
    });

    const feedback = getFeedbackMessage(isCorrect, question.correct);
    app.appendChild(feedback);
  }

  function createAnswers(answers) {
    const answersDiv = document.createElement("div");

    answersDiv.classList.add("answers");

    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answersDiv.appendChild(label);
    }

    return answersDiv;
  }
}

function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function formatId(text) {
  return text.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
}

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);
  return label;
}

function getSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  return submitButton;
}

function showFeedback(isCorrect, correct, answer) {
  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`
  );

  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );

  correctElement.classList.add("correct");
  selectedElement.classList.add(isCorrect ? "correct" : "incorrect");
}

function getFeedbackMessage(isCorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect
    ? "Bravo ! Tu as eu la bonne réponse"
    : `Désolé... mais la bonne réponse était ${correct}`;

  return paragraph;
}

function getProgressBar(max, value) {
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", value);
  return progress;
}

function displayNextQuestionButton(callback) {
  let remainingTimeout = TIMEOUT;

  app.querySelector("button").remove();

  const getButtonText = () => `Next (${remainingTimeout / 1000}s)`;

  const nextButton = document.createElement("button");
  nextButton.innerText = getButtonText();
  app.appendChild(nextButton);

  const interval = setInterval(() => {
    remainingTimeout -= 1000;
    nextButton.innerText = getButtonText();
  }, 1000);

  const timeout = setTimeout(() => {
    handleNextQuestion();
  }, TIMEOUT);

  const handleNextQuestion = () => {
    clearInterval(interval);
    clearTimeout(timeout);
    callback();
  };

  nextButton.addEventListener("click", () => {
    handleNextQuestion();
  });
}

function disableAllAnswers() {
  const radioInputs = document.querySelectorAll('input[type="radio"]');

  for (const radio of radioInputs) {
    radio.disabled = true;
  }
}

