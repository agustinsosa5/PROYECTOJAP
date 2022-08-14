async function listadoDeAutos() {
    const respuesta = await fetch('https://japceibal.github.io/emercado-api/cats_products/101.json');
    if (!respuesta.ok) {
      throw new Error(respuesta.status);
    } else {
      const data = await respuesta.json();
      return data;
    } 
  } 
  
  document.addEventListener('DOMContentLoaded', async function(){
    let datos = await listadoDeAutos();
    console.log(datos.products);
    datos.products.forEach(autos => {
       const html= document.getElementsByClassName('.listadoAutos');
        html.innerHTML += 'hola';
        
    });

  })