const despliegue = document.querySelector('#datosProducto');

//hacemos fetch para obtener los datos del JSON.
async function articuloElegido() {
  const respuesta = await fetch(`${PRODUCT_INFO_URL + localStorage.ID + EXT_TYPE}`);
  if (respuesta.ok) {const data = await respuesta.json();return data ;}     
  else {throw new Error(respuesta.status);}};    
  
  async function comentarios() {
    const respuesta = await fetch(`${PRODUCT_INFO_COMMENTS_URL + localStorage.ID + EXT_TYPE}`);
    if (respuesta.ok) {const datos = await respuesta.json();return datos ;}     
    else {throw new Error(respuesta.status);}}; 
    
    
    function setID(id) {
      localStorage.setItem("ID", id);
      window.location = "product-info.html"      
  }
    
    //cuando cargue la pagina , Crea el HTML con los datos del producto.
    document.addEventListener('DOMContentLoaded',async function mostrarArticulo(){ 
        let elemento = await articuloElegido(); 
        let htmlcontenido = "";
        htmlcontenido = `<div class="pt-4 mb-4">
        <h2>${elemento.name}</h2>
        <hr>
      </div>      
      <div class="datos">
        <h5 class="fw-bold">Precio</h5 class="fw-bold">
       <p>${elemento.currency}: ${elemento.cost}</p>
      </div>
      <div class="datos"> 
        <h5 class="fw-bold">Descripcion</h5 class="fw-bold">
        <p>${elemento.description}</p>
      </div>
      <div class="datos">
         <h5 class="fw-bold">Categoria</h5 class="fw-bold">
        <p>"${elemento.category}"</p>
      </div>
      <div class="datos">
         <h5 class="fw-bold">Cantidad de vendidos</h5 class="fw-bold">
        <p>${elemento.soldCount}</p>
      </div>
      <div class="datos"> 
      <h5 class="fw-bold">Imagenes Ilustrativas</h5 class="fw-bold">
        <div class="d-flex " id="imagenes_articulo">
        </div>            
        <div id="comentarios" class="mt-4"> 
        <h4>Comentarios</h4>     
        </div>        
        </div>
        </div>
        </div>`;
    
      despliegue.innerHTML = htmlcontenido;


        //Hacemos un FOR para obtener el Array de imagenes y las agregamos
        //al HTML que creamos mas arriba.        
        let imagenes = document.getElementById('imagenes_articulo');
        for (let i = 0; i < elemento.images.length; i++) {
            const element = elemento.images[i];
            let imgs = "";
            imgs = `<div> 
            <img src="${element}" class="img-thumbnail" alt="imagenes del producto">
            </div>`;
            imagenes.innerHTML += imgs;           
        } 
        
        
        //html para agregar estrellas.
        let estrellas = `<span class="fa fa-star checked"></span>`;
        let estrellasvacia = `<span class="fa fa-star"></span>`; 
               
        
        //Mostrar comentarios y estrellas segun el Score
        let variablecomentarios = document.getElementById('comentarios');
        let com = await comentarios();       
          for (let i = 0; i < com.length; i++){
            const comment = com[i]  
            let creacion = estrellas.repeat(comment.score);
             if (comment.score < 5) {
              let vacia = 5 - comment.score 
              creacion = creacion + estrellasvacia.repeat(vacia);
             }
            let htmlcomentario = "";
            htmlcomentario = `
            <div class="container border border-start-0 ps-3">
            <span><b>${comment.user}</b> - ${comment.dateTime} - ${creacion}         
            </span>
            <p>${comment.description}</p>
            </div>`;
            variablecomentarios.innerHTML += htmlcomentario;
        };
        
       
        // Obtener la fecha y la hora
        var today = new Date(); 
        var now = today.toLocaleString();
        
        //Agregar comentario al producto DESAFIATE!
          let comentario = document.getElementById('campocomentario');
          let puntuacion = document.getElementById('puntuacion');
          let enviar = document.getElementById('enviar');
          let nuevocomentario = "";
          
          enviar.addEventListener('click',() =>{
            let creacion = estrellas.repeat(puntuacion.value);
            if (puntuacion.value < 5) {
             let vacia = 5 - puntuacion.value
             creacion = creacion + estrellasvacia.repeat(vacia);
            }

          nuevocomentario = `<div class="container border border-start-0 ps-3">
          <span><b>${localStorage.CorreoElectronico}</b> - ${now} - ${creacion}         
          </span>
          <p>${comentario.value}</p>
          </div>`;
          variablecomentarios.innerHTML += nuevocomentario;
          comentario.value="";
          puntuacion.value= 1;
          });


         
          //Mostrar-imagenes-relacionadas                 
        let relacionadas= document.getElementById('imagenesrelacionadas');
        for (let i = 0; i < elemento.relatedProducts.length; i++) {
          const element = elemento.relatedProducts[i];
          let juguete = "";
          juguete = `
          <div class="card border-light mb-2" style="width: 20rem;">          
            <div onclick="setID(${element.id})"> 
              <img src="${element.image}" class="img-thumbnail card-img-top" alt="imagenes del producto">
              <span>${element.name}</span>
            </div>          
          </div>`;
          relacionadas.innerHTML += juguete; }



        
    });
    
        
    
    
        