async function listadoDeAutos() {
  const respuesta = await fetch(
    "https://japceibal.github.io/emercado-api/cats_products/101.json"
  );
  if (respuesta.ok) {
    const data = await respuesta.json();
    return data;
  } else {
    throw new Error(respuesta.status);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  let datos = await listadoDeAutos();
  let autos = "";
  datos.products.forEach((auto) => {
    autos += `
    <div class="list-group" id="cat-list-container">
    <div class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src= "${auto.image}" alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${auto.name} - ${auto.currency} : ${auto.cost}</h4> 
                <p> ${auto.description}</p> 
                </div>
                <small class="text-muted">${auto.soldCount} Vendidos </small> 
            </div>
        </div>
        </div>    
        </div>
       `;
    document.getElementById("catalogo").innerHTML = autos;
  });
});
