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
}

document.addEventListener("DOMContentLoaded", async function () {
  let datos = await listado();
  let articulos = "";
  datos.products.forEach((articulo) => {
    document.querySelector("#titulo_product").innerHTML =
      `<h2>Productos</h2>
    <h4>Verás aqui todos los productos de la categoría` +
      " " +
      datos.catName +
      `</h4>`;
    articulos += `
    <div class="list-group" id="cat-list-container">
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
                <small class="text-muted">${articulo.soldCount} Vendidos </small> 
            </div>
        </div>
        </div>    
        </div>
       `;
    document.getElementById("catalogo").innerHTML = articulos;
  });
});
