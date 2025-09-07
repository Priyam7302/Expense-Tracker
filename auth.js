// SIGNUP
let signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    if (localStorage.getItem(email)) {
      alert("User already exists!");
    } else {
      localStorage.setItem(email, password);
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
    }
  });
}

// LOGIN
let loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedPassword = localStorage.getItem(email);

    if (storedPassword === password) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", email);
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}
