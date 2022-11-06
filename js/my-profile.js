//Mostrar el correo con el cual se loguea el usuario en su perfil
if(!localStorage.getItem('CorreoElectronico')) {
    document.getElementById('inputemail').value = ""
} else {
    document.getElementById('inputemail').value = localStorage.getItem('CorreoElectronico')
    document.getElementById('inputemail').disabled = true   
};


function validarInput() {
    if (prinom == "" || priape == "" || tel.value == "") {
       alert('Debes completar los datos obligatorios(*)')
    } else alert('Datos guardados con exito!')
};

//Cargo lo imagen y la muestro en miniatura
let imagenMiniatura = document.getElementById('fotoperfil');
let btnSeleccionaImagen = document.getElementById('inputimage');

btnSeleccionaImagen.addEventListener("change",()=>{
    let imagen = btnSeleccionaImagen.files[0];    
    let reader = new FileReader();
    reader.readAsDataURL(imagen);    
    reader.onload = function (){
        imagenMiniatura.src = reader.result;       
    }
});

//Completo datos de usuario y los guardo.
const btnguardar = document.getElementById('btnguardar');
btnguardar.addEventListener('click',()=>{
validarInput();
let prinom = document.getElementById('prinom').value;
let segnom = document.getElementById('segnom').value;
let priape = document.getElementById('priape').value;
let segape = document.getElementById('segape').value;
let tel = document.getElementById('tel').value;

    const usuario = {
        Pnombre : prinom,
        Snombre : segnom,
        Papellido : priape,
        Sapellido : segape,
        Telefono : tel,
        Foto : imagenMiniatura.src        
    };

localStorage.setItem('datosuser', JSON.stringify(usuario) );
});

function mostrarDatosGuardados() {    
    let arraydatos = [];
    const datosdelusuario = JSON.parse(localStorage.getItem('datosuser'));
    arraydatos.push(datosdelusuario)
    prinom.value = arraydatos[0].Pnombre;
    segnom.value = arraydatos[0].Snombre;
    priape.value = arraydatos[0].Papellido;
    segape.value = arraydatos[0].Sapellido;
    tel.value = arraydatos[0].Telefono;    
    imagenMiniatura.src = arraydatos[0].Foto;

};

document.addEventListener('DOMContentLoaded', mostrarDatosGuardados());