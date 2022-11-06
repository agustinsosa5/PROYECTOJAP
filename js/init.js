const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function volverAlLogin() { 
  if (!localStorage.getItem('CorreoElectronico')) {
    alert('Debe inciar sesion')
  document.getElementById('enlaceperfil').href = "./index.html";
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
let capturoUser = localStorage.getItem('CorreoElectronico');
let agregoLi = document.getElementsByTagName('li');
let li = agregoLi[3];
li.innerHTML = `<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${capturoUser}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="./cart.html">Mi carrito</a></li>
  <li onclick="volverAlLogin()"><a id="enlaceperfil" class="dropdown-item" href="./my-profile.html">Mi perfil</a></li>
  <li><a class="dropdown-item" href="./index.html">Cerrar Sesion</a></li>
</ul>
</div>`;
});

