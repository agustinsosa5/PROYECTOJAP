const emailError = document.querySelector("#email_error");
const passError = document.querySelector("#pass_error");
const correo = document.querySelector("#mail");
const password = document.querySelector("#pass");
const boton = document.querySelector("#mybtn");

boton.addEventListener("click", () => {
  if (correo.value == "") {
    validacionCorreo();
  } 
   else if (password.value == "") {
    validacionPass();
  } 
  else {
    window.location.replace("portada.html");
  }
});

function validacionCorreo() {
  correo.style.border = "1px solid red";
  emailError.style.display = "block";
}

function validacionPass() {
  password.style.border = "1px solid red";
  passError.style.display = "block";
}
