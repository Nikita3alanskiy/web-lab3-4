document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector("button");

  loginButton.addEventListener("click", function () {
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    const correctEmail = "admin@gmail.com";
    const correctPassword = "adminadmin";

    if (emailInput === correctEmail && passwordInput === correctPassword) {
      alert("Вхід успішний!");
      window.location.href = "admin_panel.html";
    } else {
      alert("Неправильний email або пароль!");
    }
  });
});
