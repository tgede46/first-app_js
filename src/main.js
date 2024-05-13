const app = document.querySelector("#app");
const startButton = document.querySelector("#start");

startButton.addEventListener("click",startQuiz);
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
    correct: 'Irak',
   },
]
function startQuiz(event){
  console.log(event);
  let currentQuestion=0;
  let score=0;
   
  clean();
   displayQuestion(currentQuestion);
// pour suprimer le start
  function clean(){
    while(app.firstElementChild){
      app.firstElementChild.remove();
    }
    const progress = displyProgressBar(Questions.length,currentQuestion);
    app.appendChild(progress);
   
  }
  function displayQuestion(index){
    clean();
    const question = Questions[index];

    if(!question){
      //fin de question
      displayFinishMessage();
      return;
    }
    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);

    const submitButton=getSubmitButton();

    submitButton.addEventListener("click",subimt)
    app.appendChild(submitButton);
  }
  
  function displayFinishMessage(){
    const h1 = document.createElement("h1")
    h1.innerText="bravo!! vous avez termine le quiz."
    const p = document.createElement("p");
    p.innerText=`vous avez eu un score de ${score} sur ${Questions.length} point `;
    app.appendChild(h1)
    app.appendChild(p)
  }
  function subimt(){
    const selectedAnswers = app.querySelector('input[name="answer" ]:checked')
    const value = selectedAnswers.value;
    const question = Questions[currentQuestion]
    const isCorrect = question.correct === value;
    alert(`Submit ${isCorrect? "Correct":"Incorrect"}`);

    if (isCorrect){
      score++;
    }

    displayNextQuestionButton();

    showFeedback(isCorrect,question.correct,value);
    setTimeout(()=>{
      currentQuestion++;
      displayQuestion(currentQuestion)

    },4000)

    function displayNextQuestionButton(){
      let timeout = 4000;
      let interval;
      app.querySelector("button").remove();
      const nextbutton = document.createElement("button")

      app.appendChild(nextbutton);

      nextbutton.innerText=`Next (${timeout/1000}s)`
        interval= setInterval(()=>{
        timeout-=1000;
        nextbutton.innerText = `Next(${timeout/1000}s)`
      },1000);

    }

  }
  
  function showFeedback(isCorrect, correct, answer){
    const correctAnswerId = formatId(correct);
    const correctElement = document.querySelector(`label[for="${correctAnswerId}"]`);
    
    const selectedAnswerId = formatId(answer);
    const selectedElement = document.querySelector(`label[for="${selectedAnswerId}"]`);

    if (isCorrect){
      selectedElement.classList.add("correct");
    } else {
      selectedElement.classList.add("incorrect");
      correctElement.classList.add("correct");
    }

    
}


  // c'est une fonction qui definie la reponse 
  function createAnswers(answers){
    const answersDiv =document.createElement("div");

    answersDiv.classList.add("answers");
    for(const answer of answers){
      const label = getAnswerElement(answer)
      answersDiv.appendChild(label);
    }
    return answersDiv;
  }
}

function getTitleElement(text){
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function formatId(text){
  return  text.replaceAll(" ", "-").toLowerCase();
}
function getAnswerElement(text){
  const label = document.createElement("label");
  label.innerText = text; // Ici, utilisez label au lieu de answer
  const input = document.createElement("input");
  const id = formatId(text); // Assurez-vous également que toLowerCase est correctement orthographié
  input.id=id;
  label.htmlFor=id; // htmlfor doit être écrit comme htmlFor
  input.setAttribute("type","radio");
  input.setAttribute("name","answer")
  input.setAttribute("value",text)
  label.appendChild(input);
  return label;
}

function getSubmitButton(){
  
  const submitButton=document.createElement("button")
  submitButton.innerText="Submit";
  app.appendChild(submitButton);
  return submitButton;
}

function displyProgressBar(max,value){
  const progress =document.createElement("progress");
  progress.setAttribute("max",max);
  progress.setAttribute("value",value)
  return progress;
}
