const password = document.getElementById("passwordBox");

// verify password strength

let timeout;
let strengthBadge = document.getElementById("strength");
let strongPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
let mediumPassword = new RegExp(
  "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

function StrengthChecker(PasswordParameter) {
  if (strongPassword.test(PasswordParameter)) {
    strengthBadge.style.width = "100%";
    strengthBadge.style.border = "1px solid green";
    strengthBadge.style.backgroundColor = "green";
  } else if (mediumPassword.test(PasswordParameter)) {
    strengthBadge.style.width = "66.6%";
    strengthBadge.style.border = "1px solid blue";
    strengthBadge.style.backgroundColor = "blue";
  } else {
    strengthBadge.style.width = "33.3%";
    strengthBadge.style.border = "1px solid red";
    strengthBadge.style.backgroundColor = "red";
  }
}

password.addEventListener("input", () => {
  strengthBadge.style.display = "block";
  clearTimeout(timeout);
  timeout = setTimeout(() => StrengthChecker(password.value), 500);
  if (password.value.length !== 0) {
    strengthBadge.style.display != "block";
  } else {
    strengthBadge.style.display = "none";
  }
});

// show password
function togglePassword() {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
}

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

// remember me?
