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
  const signupConfirmPassword = document.getElementById(
    "signup-confirm-password"
  );

  // Constants
  const API_BASE_URL = "http://localhost:5000/api";
  const PASSWORD_MIN_LENGTH = 8;
  const PASSWORD_STRENGTH_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Utility Functions
  const showLoading = (button, text) => {
    button.disabled = true;
    button.textContent = text;
  };

  const resetButton = (button, text) => {
    button.disabled = false;
    button.textContent = text;
  };

  const clearAllErrors = () => {
    const errorElements = document.querySelectorAll(".error-message");
    const inputElements = document.querySelectorAll("input");

    errorElements.forEach((element) => {
      element.textContent = "";
      element.classList.remove("visible");
    });

    inputElements.forEach((input) => {
      input.classList.remove("error");
    });
  };

  const showError = (element, errorElement, message) => {
    element.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
    return false;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return false;
    }
    return PASSWORD_STRENGTH_REGEX.test(password);
  };

  const getPasswordStrengthMessage = () => {
    return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
  };

  // Form Validation Functions
  const validateLoginForm = () => {
    let isValid = true;
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    clearAllErrors();

    if (!email) {
      isValid = showError(
        loginEmail,
        document.getElementById("login-email-error"),
        "Email is required"
      );
    } else if (!validateEmail(email)) {
      isValid = showError(
        loginEmail,
        document.getElementById("login-email-error"),
        "Please enter a valid email address"
      );
    }

    if (!password) {
      isValid = showError(
        loginPassword,
        document.getElementById("login-password-error"),
        "Password is required"
      );
    }

    return isValid;
  };

  const validateSignupForm = () => {
    let isValid = true;
    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;

    clearAllErrors();

    if (!name) {
      isValid = showError(
        signupName,
        document.getElementById("signup-name-error"),
        "Full name is required"
      );
    } else if (name.length < 2) {
      isValid = showError(
        signupName,
        document.getElementById("signup-name-error"),
        "Name must be at least 2 characters"
      );
    }

    if (!email) {
      isValid = showError(
        signupEmail,
        document.getElementById("signup-email-error"),
        "Email is required"
      );
    } else if (!validateEmail(email)) {
      isValid = showError(
        signupEmail,
        document.getElementById("signup-email-error"),
        "Please enter a valid email address"
      );
    }

    if (!password) {
      isValid = showError(
        signupPassword,
        document.getElementById("signup-password-error"),
        "Password is required"
      );
    } else if (!validatePassword(password)) {
      isValid = showError(
        signupPassword,
        document.getElementById("signup-password-error"),
        getPasswordStrengthMessage()
      );
    }

    if (!confirmPassword) {
      isValid = showError(
        signupConfirmPassword,
        document.getElementById("signup-confirm-password-error"),
        "Please confirm your password"
      );
    } else if (password !== confirmPassword) {
      isValid = showError(
        signupConfirmPassword,
        document.getElementById("signup-confirm-password-error"),
        "Passwords do not match"
      );
    }

    return isValid;
  };

  // Form Toggle Functions
  const showLoginForm = () => {
    document.title = "Expense Tracker - Signin";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    successMessage.style.display = "none";
    clearAllErrors();
  };

  const showSignupForm = () => {
    document.title = "Expense Tracker - Signup";
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    loginTab.classList.remove("active");
    signupTab.classList.add("active");
    successMessage.style.display = "none";
    clearAllErrors();
  };

  // API Functions
  const handleApiError = (error, button, defaultText) => {
    console.error("API Error:", error);
    resetButton(button, defaultText);
    successMessage.textContent = "An error occurred. Please try again.";
    successMessage.style.display = "block";
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          showError(
            loginEmail,
            document.getElementById("login-email-error"),
            data.msg
          );
        } else if (response.status === 401) {
          showError(
            loginPassword,
            document.getElementById("login-password-error"),
            data.msg
          );
        }
        return false;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          showError(
            signupEmail,
            document.getElementById("signup-email-error"),
            data.msg
          );
        }
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  };

  // Event Listeners
  loginTab.addEventListener("click", showLoginForm);
  signupTab.addEventListener("click", showSignupForm);
  gotoSignup.addEventListener("click", showSignupForm);
  gotoLogin.addEventListener("click", showLoginForm);

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validateLoginForm()) return;

    const loginButton = document.getElementById("login-button");
    showLoading(loginButton, "Logging in...");

    try {
      const success = await handleLogin(loginEmail.value, loginPassword.value);

      if (success) {
        successMessage.textContent = "Login successful!";
        successMessage.style.display = "block";
        window.location.href = "/dashboard.html";
      } else {
        resetButton(loginButton, "Login");
      }
    } catch (error) {
      handleApiError(error, loginButton, "Login");
    }
  });

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!validateSignupForm()) return;

    const signupButton = document.getElementById("signup-button");
    showLoading(signupButton, "Creating account...");

    try {
      const success = await handleSignup(
        signupName.value,
        signupEmail.value,
        signupPassword.value
      );

      if (success) {
        successMessage.textContent =
          "Account created successfully! You can now log in.";
        successMessage.style.display = "block";
        showLoginForm();
        clearAllErrors();
      } else {
        resetButton(signupButton, "Create account");
      }
    } catch (error) {
      handleApiError(error, signupButton, "Create account");
    }
  });
});
