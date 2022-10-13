async function carrito() {
    const respuesta = await fetch(`${CART_INFO_URL+ 25801 + EXT_TYPE}`);
    if (respuesta.ok){
        return await respuesta.json();
    } else {
        throw new Error(respuesta.status);
    }}; 

    async function change(){ 
        const calculo = await carrito()
        let cantprod = document.querySelector('#cantProd');   
        subtotal.innerHTML =  `<b>USD: ${calculo.articles[0].unitCost * cantprod.value}`;}        
        
        
        async function changeDelAgregado(){ 
            let calculo = await articuloElegido()
            let cantprod = document.querySelector('#nuevoprod');   
            subtotalnuevo.innerHTML =  `<b>USD: ${calculo.cost * cantprod.value}`;}

    document.addEventListener('DOMContentLoaded',async () =>{
        const imagen = document.querySelector('#imagen');        
        const nombre = document.querySelector('#nombre');
        const costo = document.querySelector('#cost');
        let subtotal = document.querySelector('#subtotal');   
                
        const compras = await carrito();        
        imagen.innerHTML = `<img width="100" src="${compras.articles[0].image}" alt="Autocargado">`;
        nombre.innerHTML = compras.articles[0].name
        costo.innerHTML = 'USD: '+`${compras.articles[0].unitCost}`     

        //agrego a la lista del carrito el producto que le di comprar.
        let carro = document.querySelector('#carro');
        let articuloCargado = JSON.parse(localStorage.getItem('articulo'))            
            carro.innerHTML+=`<div class="row align-items-center border-bottom">
            <div class="col-2" id="imagen">
            <img width="100" src="${articuloCargado.images[0]}" alt="Autocargado">         
            </div>
            <div class="col-2" id="nombre">
              ${articuloCargado.name}
            </div>
            <div class="col-2" id="cost">
            ${articuloCargado.currency}: ${articuloCargado.cost}
            </div>            
            <div class="col-2">
              <input required minlength="1" type="number" id="nuevoprod" oninput="changeDelAgregado()" class="text-center">
            </div>
            <div class="col-2" id="subtotalnuevo">
              0
            </div>            
            </div>`; 

            

        });
    