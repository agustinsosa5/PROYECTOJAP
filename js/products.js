const boton_filtrar = document.getElementById("rangeFilter");
const boton_limpiar = document.getElementById("clearFilter");
const catalogo = document.getElementById("catalogo");
const ascen = document.getElementById("btn-asc");
const descen = document.getElementById("btn-desc");
const Rel = document.getElementById("btn-rel");

async function listado() {
  const respuesta = await fetch(
    `${PRODUCTS_URL + localStorage.catID + EXT_TYPE}`
  );
  if (respuesta.ok) {
    const data = await respuesta.json();
    return data;
  } else {
    throw new Error(respuesta.status);
  }
};
//LISTA LOS ARTICULOS//

document.addEventListener("DOMContentLoaded", async function cargarArt() {
  let datos = await listado();
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

  //FILTRADO POR PRECIO DE PRODUCTOS//

  boton_filtrar.addEventListener("click", () => {
    const Filtrado = Object.values(datos.products); //paso de obj a array
    let min = document.getElementById("min").value;
    let max = document.getElementById("max").value;
    let htmldeproduct = "";
    Filtrado.filter((filtro) => {
      if (filtro.cost >= min  &&  filtro.cost <= max) {
        htmldeproduct += ` <div class="list-group" id="cat-list-container">
      <div class="list-group-item list-group-item-action">
      <div class="row">
          <div class="col-3">
              <img src= "${filtro.image}" alt="product image" class="img-thumbnail">
          </div>
          <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <div class="mb-1">
                  <h4>${filtro.name} - ${filtro.currency} : ${filtro.cost}</h4> 
                  <p> ${filtro.description}</p> 
                  </div>
                  <small class="text-muted text-align">${filtro.soldCount} Vendidos </small> 
              </div>
          </div>
          </div>    
          </div>
         `
        catalogo.innerHTML = htmldeproduct;
      } 
      //ORDENAS DE FORMA ASCENDENTE//
      
    });










    });    
      // LIMPIAR INPUT Y MOSTRAR ARTICULOS//
        boton_limpiar.onclick = () => {
          document.getElementById("min").value = "";
          document.getElementById("max").value = "";
          cargarArt();
        };

  });






  


