document.getElementById("stripe-signUp").addEventListener("submit", function (event) {
    event.preventDefault();

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let email = document.getElementById("logEmail").value;
    let password = document.getElementById("logPassword").value;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
        return;
    }
    
    let user = storedUsers.find(user => user.email === email && user.password === password);
    if (user) {
        alert("Login successful!");

        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        sessionStorage.setItem('loggedIn', 'true');
        window.location.replace("exam.html");
    } else {
        alert("Invalid email or password. Please try again.");
    }
});