

async function carrito() {
    const respuesta = await fetch(`${CART_INFO_URL+ 25801 + EXT_TYPE}`);
    if (respuesta.ok){
        return await respuesta.json();
    } else {
        throw new Error(respuesta.status);
    }}; 

    
    document.addEventListener('DOMContentLoaded',async () =>{
        const imagen = document.querySelector('#imagen');        
        const nombre = document.querySelector('#nombre');
        const costo = document.querySelector('#cost');
        let subtotal = document.querySelector('#subtotal');
        let cantprod = document.querySelector('#cantProd');
        
        
        const compras = await carrito();        
        imagen.innerHTML = `<img width="100" src="${compras.articles[0].image}" alt="Autocargado">`;
        nombre.innerHTML = compras.articles[0].name
        costo.innerHTML = 'USD: '+`${compras.articles[0].unitCost}`       
        subtotal.innerHTML = `<b>USD: ${compras.articles[0].unitCost * cantprod.value}`
    });
    