/* greeting on home page
   prompts the user for their name once
   and shows a time-based greeting message */
function showGreeting() {
  var el = document.getElementById("greeting");
  if (!el) return; // if no greeting element on the page stop here

  var name = prompt("Enter your name:"); // asks user for their name
  if (!name || name.replace(/\s+/g, "").length == 0) {
    name = "Visitor"; // if empty name replace with "Visitor"
  }

  var now = new Date(); // gets the current date and time
  var hour = now.getHours(); // extracts only the hour
  var text = ""; // empty variable to store the greeting message

  // depending on the time of day assign greeting
  if (hour < 12) text = "Hi I am Remas Good morning";
  else if (hour < 18) text = "Hi I am Remas Good afternoon";
  else text = "Hi I am Remas Good evening";

  // put the greeting inside the element
  el.innerHTML = text + ", " + name + " Welcome to my website!";
}

/* used to make the gallery interactive
   when clicking on any image card it will glow pink for 0.7 seconds */
function setupGallery() {
  var cards = document.getElementsByClassName("gallery-card");
  var i;
  for (i = 0; i < cards.length; i++) {
    cards[i].onclick = function () {
      var c = this;
      c.style.boxShadow = "0 0 22px 6px rgba(245,155,191,0.6)";
      setTimeout(function () {
        c.style.boxShadow = "";
      }, 700); // remove glow after 700 milliseconds
    };
  }
}

/* quiz variables */
var qTotal = 3; // number of total questions
var qIndex = 0; // current question index
var qScore = 0; // total score
var waitingForSubmit = false; // control flag

var qN1 = 0; // first number
var qN2 = 0; // second number
var qOp = "+"; // operator (+ - × ÷)
var qAns = 0; // correct answer

/* sets up the quiz interface before starting */
function initQuizUI() {
  var box = document.getElementById("quiz");
  var question = document.getElementById("question");
  var progress = document.getElementById("progress");
  var answer = document.getElementById("answer");
  var startBtn = document.getElementById("start");
  var submitBtn = document.getElementById("submit");
  var nextBtn = document.getElementById("next");

  // if any important element not found stop here
  if (!box || !question || !progress || !answer || !startBtn || !submitBtn || !nextBtn) return;

  // hide everything at first
  question.style.display = "none";
  progress.innerHTML = "Press “Start Quiz” to begin";
  answer.value = "";
  answer.style.display = "none";

  // hide the label for answer
  var labels = document.getElementsByTagName("label");
  var i;
  for (i = 0; i < labels.length; i++) {
    if (labels[i].getAttribute("for") == "answer") {
      labels[i].style.display = "none";
    }
  }

  // only show start button
  startBtn.style.display = "inline-block";
  submitBtn.style.display = "none";
  nextBtn.style.display = "none";

  qIndex = 0;
  qScore = 0;
  waitingForSubmit = false;
}

/* starts the quiz
   shows the first question and displays input field */
function startQuiz() {
  var question = document.getElementById("question");
  var answer = document.getElementById("answer");
  var startBtn = document.getElementById("start");
  var submitBtn = document.getElementById("submit");
  var nextBtn = document.getElementById("next");

  if (!question || !answer || !startBtn || !submitBtn || !nextBtn) return;

  // show elements needed during quiz
  question.style.display = "block";
  answer.style.display = "inline-block";

  var labels = document.getElementsByTagName("label");
  var i;
  for (i = 0; i < labels.length; i++) {
    if (labels[i].getAttribute("for") == "answer") {
      labels[i].style.display = "block";
    }
  }

  // hide start and show others
  startBtn.style.display = "none";
  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";

  qIndex = 0;
  qScore = 0;
  makeQuestion();
}

/* creates a new random question each time */
function makeQuestion() {
  var question = document.getElementById("question");
  var progress = document.getElementById("progress");
  var answer = document.getElementById("answer");
  if (!question || !progress || !answer) return;

  // randomly pick which operation to use
  var kind = Math.floor(Math.random() * 4);
  var a = Math.floor(Math.random() * 10) + 1;
  var b = Math.floor(Math.random() * 10) + 1;

  // depending on the operation assign correct answer
  if (kind == 0) {
    qOp = "+";
    qN1 = a; qN2 = b;
    qAns = qN1 + qN2;
  } else if (kind == 1) {
    qOp = "-";
    qN1 = (a > b) ? a : b;
    qN2 = (a > b) ? b : a;
    qAns = qN1 - qN2;
  } else if (kind == 2) {
    qOp = "×";
    qN1 = a; qN2 = b;
    qAns = qN1 * qN2;
  } else {
    qOp = "÷";
    qN2 = Math.floor(Math.random() * 9) + 1;
    var res = Math.floor(Math.random() * 10) + 1;
    qN1 = qN2 * res;
    qAns = res;
  }

  // update text on page
  question.innerHTML = "Q" + (qIndex + 1) + ": " + qN1 + " " + qOp + " " + qN2 + " = ?";
  progress.innerHTML = "Question " + (qIndex + 1) + " of " + qTotal;
  answer.value = "";
  answer.focus();
  waitingForSubmit = true;
}

/* when the user clicks “Submit” 
   it checks if the answer is correct */
function submitAnswer() {
  var answer = document.getElementById("answer");
  if (!answer) return;

  if (!waitingForSubmit) {
    alert("Please enter your answer, then click Submit.");
    return;
  }

  var val = parseFloat(answer.value);
  if (isNaN(val)) {
    alert("Please enter a number.");
    answer.focus();
    return;
  }

  if (val == qAns) qScore++; // add to score if correct
  waitingForSubmit = false;
}

/* moves to the next question after submitting */
function nextQuestion() {
  if (waitingForSubmit) {
    alert("Please submit your answer first.");
    return;
  }

  qIndex++;
  if (qIndex >= qTotal) {
    finishQuiz();
    return;
  }
  makeQuestion();
}

/* ends the quiz and shows final score */
function finishQuiz() {
  var question = document.getElementById("question");
  var progress = document.getElementById("progress");
  var answer = document.getElementById("answer");
  var startBtn = document.getElementById("start");
  var submitBtn = document.getElementById("submit");
  var nextBtn = document.getElementById("next");

  if (!question || !progress || !answer || !startBtn || !submitBtn || !nextBtn) return;

  question.innerHTML = "Finished! Your score is " + qScore + " / " + qTotal + ".";
  progress.innerHTML = "";

  // hide answer field and buttons
  answer.style.display = "none";
  var labels = document.getElementsByTagName("label");
  var i;
  for (i = 0; i < labels.length; i++) {
    if (labels[i].getAttribute("for") == "answer") {
      labels[i].style.display = "none";
    }
  }
  submitBtn.style.display = "none";
  nextBtn.style.display = "none";
  startBtn.style.display = "inline-block";

  waitingForSubmit = false;
}

/* creates random numbers for the captcha and shows it in the form */
var captchaAnswer = null;
function setupCaptcha() {
  var span = document.getElementById("captchaText");
  if (!span) return;

  var x = Math.floor(Math.random() * 10);
  var y = Math.floor(Math.random() * 10);
  captchaAnswer = x + y;
  span.innerHTML = x + " + " + y + " = ?";
}

/* checks that all fields in contact form are filled
   also checks that captcha is correct */
function validateForm() {
  var nameEl = document.getElementById("name");
  var emailEl = document.getElementById("email");
  var subjectEl = document.getElementById("subject");
  var messageEl = document.getElementById("message");
  var capEl = document.getElementById("captchaInput");

  if (!nameEl || !emailEl || !subjectEl || !messageEl || !capEl) return true;

  if (nameEl.value.replace(/\s+/g, "").length < 3) {
    alert("Please provide a name with at least 3 characters.");
    nameEl.focus();
    return false;
  }

  if (nameEl.value == "" || emailEl.value == "" || subjectEl.value == "" || messageEl.value == "") {
    alert("All fields must be filled out.");
    return false;
  }

  var v = parseInt(capEl.value, 10);
  if (isNaN(v) || v != captchaAnswer) {
    alert("Captcha incorrect. Try again.");
    setupCaptcha();
    capEl.value = "";
    capEl.focus();
    return false;
  }

  alert("Message sent successfully!");
  return true;
}

/* main function runs automatically when page loads 
   checks which page is open and runs correct setup */
window.onload = function () {
  var path = window.location.pathname;

  // home page greeting
  if (path.indexOf("index.html") != -1 || path.slice(-1) == "/") {
    showGreeting();
  }

  // gallery interactivity
  if (path.indexOf("gallery.html") != -1) {
    setupGallery();
  }

  // quiz setup
  if (path.indexOf("quiz.html") != -1) {
    initQuizUI();

    var startB = document.getElementById("start");
    var submitB = document.getElementById("submit");
    var nextB = document.getElementById("next");
    if (startB) startB.onclick = startQuiz;
    if (submitB) submitB.onclick = submitAnswer;
    if (nextB) nextB.onclick = nextQuestion;
  }

  // contact form setup
  if (path.indexOf("contact.html") != -1) {
    setupCaptcha();
    var ref = document.getElementById("refreshCaptcha");
    if (ref) ref.onclick = setupCaptcha;

    var forms = document.getElementsByTagName("form");
    if (forms && forms[0] && !forms[0].onsubmit) {
      forms[0].onsubmit = validateForm;
    }
  }
};
