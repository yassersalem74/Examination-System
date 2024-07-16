if (!sessionStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

document.getElementById('score').textContent = sessionStorage.getItem('userScore');
const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

console.log('Logged in user:', loggedInUser);
console.log(loggedInUser.email);
document.getElementById('userEmail').textContent = loggedInUser.email;

const score = parseInt(sessionStorage.getItem('userScore'), 10);
console.log('Score:', score); 

const scoreText = document.getElementById("text-result");
if (score >= 6) {
  scoreText.textContent = "CONGRATS, You've Passed the exam ";
  scoreText.style.color = "green"
} else {
  scoreText.textContent = "Failed,  You did not pass the exam";
  scoreText.style.color = "red"

}

document.getElementById("back-home").addEventListener("click", function () {
  window.location.replace("login.html");
});