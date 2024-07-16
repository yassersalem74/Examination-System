import { User } from './modules/user.js';


let users = [];

document.getElementById("stripe-signUp").addEventListener("submit", valdet);

function valdet(e) {
  e.preventDefault();
  let flagfName = false;
  let flaglName = false;
  let flageEmail = false;
  let flageRPass = false;
  let flagePass = false;

  var fName = document.getElementById("fName");
  var lName = document.getElementById("lName");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var rePassword = document.getElementById("rePassword");

  var reqName = document.getElementById("reqName");
  var reqLName = document.getElementById("reqLName");
  var reqEmail = document.getElementById("reqEmail");
  var reqPass = document.getElementById("reqPass");
  var reqRePass = document.getElementById("repass"); // Corrected ID

  if (fName.value == "") {
    reqName.textContent = "you must be required";
    reqName.style.color = "red";
    reqName.style.display = "block";
  } else if (isFinite(fName.value)) {
    reqName.textContent = "you must be a valid character";
    reqName.style.color = "red";
    reqName.style.display = "block";
  } else {
    reqName.textContent = "";
    flagfName = true;
  }

  if (lName.value == "") {
    reqLName.textContent = "you must be required";
    reqLName.style.color = "red";
    reqLName.style.display = "block";
  } else if (isFinite(lName.value)) {
    reqLName.textContent = "you must be a valid character";
    reqLName.style.color = "red";
    reqLName.style.display = "block";
  } else {
    reqLName.textContent = "";
    flaglName = true;
  }

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.value == "") {
    reqEmail.textContent = "This input is required";
    reqEmail.style.color = "red";
    reqEmail.style.display = "block";
  } else if (!emailPattern.test(email.value)) {
    reqEmail.textContent = "You must enter a correct email";
    reqEmail.style.color = "red";
    reqEmail.style.display = "block";
  } else {
    reqEmail.textContent = "";
    flageEmail = true;
  }

  if (password.value === "") {
    reqPass.textContent = "Password is required.";
    reqPass.style.color = "red";
  } else if (password.value.length < 6) {
    reqPass.textContent = "Password must be at least 6 characters.";
    reqPass.style.color = "red";
  } else {
    reqPass.textContent = "";
    flagePass = true;
  }

  if (rePassword.value === "") {
    reqRePass.textContent = "Please re-enter your password.";
    reqRePass.style.color = "red";
  } else if (rePassword.value !== password.value) {
    reqRePass.textContent = "Passwords do not match.";
    reqRePass.style.color = "red";
  } else {
    reqRePass.textContent = "";
    flageRPass = true;
  }

  if (flaglName && flagfName && flageEmail && flagePass && flageRPass) {
    const newUser = new User(fName.value.trim(), lName.value.trim(), email.value.trim(), password.value.trim());
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    window.location.replace("login.html");
  }
}

let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
users = storedUsers.map(userData => new User(userData.firstName, userData.lastName, userData.email, userData.password));

console.log(users);