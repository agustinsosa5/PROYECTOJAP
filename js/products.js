const boton_filtrar = document.getElementById("rangeFilter");
const boton_limpiar = document.getElementById("clearFilter");
const catalogo = document.getElementById("catalogo");
const ascen = document.getElementById('btnasc');
const descen = document.getElementById("btndesc");
const Rel = document.getElementById("btnrel");
const ORDER_ASC_BY_NAME = 'ascendente';
const ORDER_DESC_BY_NAME = 'descendente';
const ORDER_BY_SOLD_COUNT = 'rel.';
let art = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;



async function listado() {
  const respuesta = await fetch(`${PRODUCTS_URL + localStorage.catID + EXT_TYPE}`);
  if (respuesta.ok) {const data = await respuesta.json();return data;} 
  else {throw new Error(respuesta.status);}};


//LISTA LOS ARTICULOS//
document.addEventListener("DOMContentLoaded", async function cargarArt(){
  let datos = await listado();
  console.log(datos);
  let articulos = "";
  datos.products.forEach((articulo) => {
    document.querySelector("#titulo_product").innerHTML =
    `<h2>Productos</h2>
    <h4>Verás aqui todos los productos de la categoría `+ " " + `${datos.catName}</h4>`;
    articulos += `
    <div class="list-group" id="cat-list-container">
    <div class="list-group-item list-group-item-action">
    <div class="row">
    <div class="col-3">
    <img src=${articulo.image} alt="product image" class="img-thumbnail">
    </div>
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
    <div class="mb-1">
    <h4>${articulo.name} - ${articulo.currency} : ${articulo.cost}</h4> 
    <p> ${articulo.description}</p> 
    </div>
    <small class="text-muted">${articulo.soldCount} Vendidos </small> 
    </div>
    </div>
    </div>    
        </div>
        `;
        catalogo.innerHTML = articulos;
      });
      
      //FILTRADO POR PRECIO DE PRODUCTOS MIN Y MAX //
      
      boton_filtrar.addEventListener("click", () => {
        const Filtrado = Object.values(datos.products); //paso de obj a array
        let min = document.getElementById("min").value;
        let max = document.getElementById("max").value;
        let htmldeproduct = "";
        Filtrado.filter((articulo) => {
          if (articulo.cost >= min  &&  articulo.cost <= max) {
            htmldeproduct += ` <div class="list-group" id="cat-list-container">
            <div class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
            <img src= "${articulo.image}" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <div class="mb-1">
            <h4>${articulo.name} - ${articulo.currency} : ${articulo.cost}</h4> 
            <p> ${articulo.description}</p> 
            </div>
            <small class="text-muted text-align">${articulo.soldCount} Vendidos </small> 
            </div>
            </div>
            </div>    
          </div>
          `
          catalogo.innerHTML = htmldeproduct;
        }           
      });        
    });    
    
    
    //guardamos el array en art
    art = datos.products;
    
    // LIMPIAR INPUT Y MOSTRAR ARTICULOS//
    boton_limpiar.onclick = () => {
      document.getElementById("min").value = "";
      document.getElementById("max").value = "";
      cargarArt();
    };
    
  });
  
  
  //Funcion para Ordenar por precio ascendente, descendente, //   
  function sortCategories (criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
      result = array.sort(function(a, b) {
        if ( a.cost < b.cost ){ return -1 };
        if ( a.cost > b.cost ){ return 1};
        return 0;
      });
    }else if (criteria === ORDER_DESC_BY_NAME){
      result = array.sort(function(a, b) {
        if ( a.cost > b.cost ){ return -1};
        if ( a.cost < b.cost ){ return 1};
        return 0;
      });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
      result = array.sort(function(a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);
        
        if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
      });
    }      
    return result;  
  };
  
  //escucha de los botones para ordenar.
  ascen.addEventListener("click", function(){   
    sortAndShowCategories(ORDER_ASC_BY_NAME);    
  });
  
  descen.addEventListener("click", function(){
    sortAndShowCategories(ORDER_DESC_BY_NAME);
  });
  
  Rel.addEventListener("click", function(){
    sortAndShowCategories(ORDER_BY_SOLD_COUNT);
  });
  
  
  
//muestra las categorias 
  function showCategoriesList(){    
    let htmlContentToAppend = "";
    for(let i = 0; i < art.length; i++){
            let category = art[i];    
            if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){
    
                htmlContentToAppend += ` <div class="list-group" id="cat-list-container">
                <div class="list-group-item list-group-item-action">
                <div class="row">
                <div class="col-3">
                <img src= "${category.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${category.name} - ${category.currency} : ${category.cost}</h4> 
                <p> ${category.description}</p> 
                </div>
                <small class="text-muted text-align">${category.soldCount} Vendidos </small> 
                </div>
                </div>
                </div>    
              </div>
              `
            }    
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        }
      }


//llama a las dos funciones para ordenar y muestrar los productos.
    function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;
     
    if(categoriesArray != undefined){art = categoriesArray;}
        art = sortCategories(currentSortCriteria, art);  
    //Muestro las categorías ordenadas
    showCategoriesList();
  }
   

//BUSCADOR 
document.addEventListener('keyup' , e=>{
  if (e.target.matches('#buscador')) {
    document.querySelectorAll('.list-group-item').forEach(elem =>{
      elem.textContent.toLocaleLowerCase().includes(e.target.value)
      ? elem.classList.remove('filtro')
      : elem.classList.add('filtro');      
    })
  }
})
  