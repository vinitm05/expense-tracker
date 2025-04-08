document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const loginTab = document.getElementById("login-tab");
  const signupTab = document.getElementById("signup-tab");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const gotoSignup = document.getElementById("goto-signup");
  const gotoLogin = document.getElementById("goto-login");
  const successMessage = document.getElementById("success-message");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const signupName = document.getElementById("signup-name");
  const signupEmail = document.getElementById("signup-email");
  const signupPassword = document.getElementById("signup-password");

  // Toggle between login and signup forms
  function showLoginForm() {
    document.title = "Expense Tracker - Signin";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    successMessage.style.display = "none";
    clearAllErrors();
  }

  function showSignupForm() {
    document.title = "Expense Tracker - Signup";
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    loginTab.classList.remove("active");
    signupTab.classList.add("active");
    successMessage.style.display = "none";
    clearAllErrors();
  }

  // Function to clear all errors
  function clearAllErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    const inputElements = document.querySelectorAll("input");

    errorElements.forEach((element) => {
      element.textContent = "";
      element.classList.remove("visible");
    });

    inputElements.forEach((input) => {
      input.classList.remove("error");
    });
  }

  // Function to show error
  function showError(element, errorElement, message) {
    element.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
    return false;
  }

  // Function to validate email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to validate password
  function validatePassword(password) {
    return password.length >= 8;
  }

  // Validate Login Form
  function validateLoginForm() {
    let isValid = true;
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    const emailError = document.getElementById("login-email-error");
    const passwordError = document.getElementById("login-password-error");

    // Clear previous errors
    email.classList.remove("error");
    password.classList.remove("error");
    emailError.textContent = "";
    passwordError.textContent = "";
    emailError.classList.remove("visible");
    passwordError.classList.remove("visible");

    // Validate email
    if (!email.value.trim()) {
      isValid = showError(email, emailError, "Email is required");
    } else if (!validateEmail(email.value.trim())) {
      isValid = showError(
        email,
        emailError,
        "Please enter a valid email address"
      );
    }

    // Validate password
    if (!password.value) {
      isValid = showError(password, passwordError, "Password is required");
    }

    return isValid;
  }

  // Validate Signup Form
  function validateSignupForm() {
    let isValid = true;
    const name = document.getElementById("signup-name");
    const email = document.getElementById("signup-email");
    const password = document.getElementById("signup-password");
    const confirmPassword = document.getElementById("signup-confirm-password");
    const nameError = document.getElementById("signup-name-error");
    const emailError = document.getElementById("signup-email-error");
    const passwordError = document.getElementById("signup-password-error");
    const confirmPasswordError = document.getElementById(
      "signup-confirm-password-error"
    );

    // Clear previous errors
    name.classList.remove("error");
    email.classList.remove("error");
    password.classList.remove("error");
    confirmPassword.classList.remove("error");
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    nameError.classList.remove("visible");
    emailError.classList.remove("visible");
    passwordError.classList.remove("visible");
    confirmPasswordError.classList.remove("visible");

    // Validate name
    if (!name.value.trim()) {
      isValid = showError(name, nameError, "Full name is required");
    } else if (name.value.trim().length < 2) {
      isValid = showError(
        name,
        nameError,
        "Name must be at least 2 characters"
      );
    }

    // Validate email
    if (!email.value.trim()) {
      isValid = showError(email, emailError, "Email is required");
    } else if (!validateEmail(email.value.trim())) {
      isValid = showError(
        email,
        emailError,
        "Please enter a valid email address"
      );
    }

    // Validate password
    if (!password.value) {
      isValid = showError(password, passwordError, "Password is required");
    } else if (!validatePassword(password.value)) {
      isValid = showError(
        password,
        passwordError,
        "Password must be at least 8 characters"
      );
    }

    // Validate confirm password
    if (!confirmPassword.value) {
      isValid = showError(
        confirmPassword,
        confirmPasswordError,
        "Please confirm your password"
      );
    } else if (password.value !== confirmPassword.value) {
      isValid = showError(
        confirmPassword,
        confirmPasswordError,
        "Passwords do not match"
      );
    }

    return isValid;
  }

  // Event Listeners
  loginTab.addEventListener("click", showLoginForm);
  signupTab.addEventListener("click", showSignupForm);
  gotoSignup.addEventListener("click", showSignupForm);
  gotoLogin.addEventListener("click", showLoginForm);

  // Handle form submissions
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (validateLoginForm()) {
      // Simulate API call with setTimeout
      const loginButton = document.getElementById("login-button");
      loginButton.disabled = true;
      loginButton.textContent = "Logging in...";

      try {
        await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail.value,
            password: loginPassword.value,
          }),
        });
      } catch (error) {
        console.error(error);
      }

      // Clear form
      document.getElementById("login-email").value = "";
      document.getElementById("login-password").value = "";
    }
  });

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (validateSignupForm()) {
      // Simulate API call with setTimeout
      const signupButton = document.getElementById("signup-button");
      signupButton.disabled = true;
      signupButton.textContent = "Creating account...";

      signupButton.disabled = false;
      signupButton.textContent = "Create account";

      try {
        await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
          }),
        });
      } catch (error) {
        console.error(error);
      }

      successMessage.textContent =
        "Account created successfully! You can now log in.";
      successMessage.style.display = "block";
      showLoginForm();

      // Clear form
      document.getElementById("signup-name").value = "";
      document.getElementById("signup-email").value = "";
      document.getElementById("signup-password").value = "";
      document.getElementById("signup-confirm-password").value = "";
    }
  });
});
