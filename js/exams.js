import { Answer } from "./modules/Answer.js";
import { Question } from "./modules/Question.js";

if (!sessionStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
console.log('Logged in user:', loggedInUser);

var questions = [];
var answers = [];
var index = 0;
var marked = [];

questions.push(
  new Question("What is the correct way to declare a variable in JavaScript?", [
    new Answer("var myVariable;", true),
    new Answer("variable myVariable;", false),
    new Answer("v myVariable;", false),
    new Answer("let myVariable;", false),
  ])
);

questions.push(
  new Question("Which of the following is not a JavaScript data type?", [
    new Answer("string", false),
    new Answer("boolean", false),
    new Answer("float", true),
    new Answer("object", false),
  ])
);

questions.push(
  new Question("What is the output of the following code: console.log(typeof null);", [
    new Answer("null", false),
    new Answer("object", true),
    new Answer("undefined", false),
    new Answer("number", false),
  ])
);

questions.push(
  new Question("Which method is used to add an element to the end of an array?", [
    new Answer("push()", true),
    new Answer("append()", false),
    new Answer("addToEnd()", false),
    new Answer("insertEnd()", false),
  ])
);

questions.push(
  new Question("What is the result of the expression: '1' + 2 + 3;", [
    new Answer("123", true),
    new Answer("6", false),
    new Answer("15", false),
    new Answer("10", false),
  ])
);

questions.push(
  new Question("Which of the following is a valid JavaScript function declaration?", [
    new Answer("function myFunction() {}", true),
    new Answer("func myFunction() {}", false),
    new Answer("function = myFunction() {}", false),
    new Answer("myFunction() {}", false),
  ])
);

questions.push(
  new Question("What does the 'this' keyword refer to in JavaScript?", [
    new Answer("The current function", false),
    new Answer("The global object", false),
    new Answer("The object that is executing the current function", true),
    new Answer("The parent object", false),
  ])
);

questions.push(
  new Question("Which operator is used to compare both value and type?", [
    new Answer("==", false),
    new Answer("===", true),
    new Answer("!=", false),
    new Answer("!==", false),
  ])
);

questions.push(
  new Question("What is the purpose of the 'addEventListener' method in JavaScript?", [
    new Answer("To add a new HTML element", false),
    new Answer("To attach an event handler to an element", true),
    new Answer("To create a new event", false),
    new Answer("To remove an event handler", false),
  ])
);

questions.push(
  new Question("What is the output of the following code: console.log(0 == false);", [
    new Answer("true", true),
    new Answer("false", false),
    new Answer("undefined", false),
    new Answer("null", false),
  ])
);

console.log(questions);

answers = JSON.parse(sessionStorage.getItem('answers')) || new Array(questions.length).fill(null);

marked = JSON.parse(sessionStorage.getItem('marked')) || [];

function renderQuestion() {
  var q = questions[index];
  document.getElementById("q-title").textContent = `Question ${index + 1}:`;
  document.getElementById("q-text").innerText = q.question;
  var form = document.getElementById("ans-form");
  form.innerHTML = "";
  q.answers.forEach((ans, i) => {
    var div = document.createElement("div");
    div.className = "form-check mb-2 all-answers";
    div.innerHTML = `
      <input class="form-check-input " type="radio" name="answer-${index}" id="option-${i}"  ${
      answers[index] === i ? "checked" : ""
    }/>
      <label class="form-check-label" for="option-${i}">${ans.answer}</label>
      `;
    form.append(div);
  });

  // mark button
  if (marked.includes(index)) {
    document.getElementById("mark-question").checked = true;
  } else {
    document.getElementById("mark-question").checked = false;
  }

  ///pagenation
  document
    .getElementById("prev-page").classList.toggle("none", index === 0);

  document.getElementById("currentPage").textContent = index + 1;

  document
    .getElementById("next-page").classList.toggle("disabled", index === questions.length - 1);
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (index > 0) {
    index--;
    renderQuestion();
  }
});
document.getElementById("next-page").addEventListener("click", () => {
  if (index < questions.length - 1) {
    index++;
    renderQuestion();
  }
});

function updateMarkedQuestions() {
  const markedQuestionsList = document.getElementById("marked-questions");
  markedQuestionsList.innerHTML = "";
  marked.forEach((qIdx) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = `Question ${qIdx + 1}`;
    a.addEventListener("click", function () {
      index = qIdx;
      renderQuestion();
    });
    li.appendChild(a);
    markedQuestionsList.appendChild(li);
  });
}

document.getElementById("mark-question").addEventListener("click", () => {
  if (!marked.includes(index)) {
    marked.push(index);
  } else {
    marked.splice(marked.indexOf(index), 1);
  }
  // Store marked questions in sessionStorage
  sessionStorage.setItem('marked', JSON.stringify(marked));
  updateMarkedQuestions();
});

document.getElementById("ans-form").addEventListener("change", (e) => {
  const questId = Number(e.target.name.split("-")[1]);
  const answerId = Number(e.target.id.split("-")[1]);

  if (questId >= 0 && questId < questions.length && answerId >= 0 && answerId < questions[questId].answers.length) {
    answers[questId] = answerId;
    console.log(answers);

    sessionStorage.setItem('answers', JSON.stringify(answers));
  } else {
    console.error(`Invalid questId or answerId: questId=${questId}, answerId=${answerId}`);
  }
});

document.getElementById('submit-quiz').addEventListener('click', function() {
  let score = 0;

  questions.forEach((question, index) => {
    if (answers[index] !== null) {
      if (answers[index] >= 0 && answers[index] < question.answers.length) {
        if (question.answers[answers[index]].isCorrect) {
          score++;
        }
      } else {
        console.error(`Invalid answer index for question ${index}: ${answers[index]}`);
      }
    } else {
      console.log(`Question ${index} was not answered.`);
    }
  });

  sessionStorage.setItem('userScore', score);

  window.location.replace("result.html");
});

updateMarkedQuestions();

renderQuestion();


document.getElementById('submit-quiz').addEventListener('click', function () {
  let score = 0;
  questions.forEach((question, index) => {
    if (answers[index] !== null && question.answers[answers[index]].isCorrect) {
      score++;
    }
  });

  sessionStorage.setItem('userScore', score);

});

var timer = 60;

function startTimer() {
  var timeBar = document.querySelector(".progress-bar");
  var max = timer;
  var counter = setInterval(() => {
    console.log(((max - timer) / max) * 100);
    timeBar.style.width = ((max - timer) / max) * 100 + "%";
    if (timer <= 0) {
      clearInterval(counter);
      location.replace("login.html");
    } else {
      timer--;
    }
  }, 1000);
}

startTimer()