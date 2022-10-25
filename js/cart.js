async function carrito() {
    const respuesta = await fetch(`${CART_INFO_URL+ 25801 + EXT_TYPE}`);
    if (respuesta.ok){
        return await respuesta.json();
    } else {
        throw new Error(respuesta.status);
    }}; 

    
     //Calculo de Costos
     let premium = document.querySelector('#Premium');
     let express = document.querySelector('#Express');
     let standard = document.querySelector('#Standard');          
     let costenvio = document.querySelector('#costenvio')
     let total = document.querySelector('#total')
     

        //funcion cambia el valor de los campos en tiempo real y calcula segun opcion de envío.
    async function change(){ 
        const calculo = await carrito()
        let cantprod = document.querySelector('#cantProd'); 
        let sub = document.querySelector('#sub')

        let subtotalCalculo =  (calculo.articles[0].unitCost * cantprod.value)
        subtotal.innerHTML =  `<b>USD: ${subtotalCalculo}`;      
        sub.innerHTML =  `USD: ${subtotalCalculo}`;    

       let TipoPremium = (subtotalCalculo)*0.15
       let TipoExpress = (subtotalCalculo)*0.07
       let TipoStandard = (subtotalCalculo)*0.05
      
          premium.addEventListener ('focus', ()=>{    
            costenvio.innerHTML = `USD: ${TipoPremium}`;
            total.innerHTML = `USD:${TipoPremium + subtotalCalculo}`;
        })
     
        express.addEventListener ('focus', ()=>{            
            costenvio.innerHTML = `USD: ${TipoExpress}`;
            total.innerHTML = `USD:${TipoExpress + subtotalCalculo}`;
        })
        standard.addEventListener ('focus', ()=>{            
            costenvio.innerHTML = `USD: ${TipoStandard}`;
            total.innerHTML = `USD:${TipoStandard + subtotalCalculo}`;
        })
      
      
      } 
    
          //estos 2 son los radios
          const tarjcredito = document.querySelector('#tarjcredito');
          const transferencia = document.querySelector('#transferencia');
          //estos 3 son los input de tarjeta de credito
          let numerotarje = document.querySelector('.credito1')
          let codigoseg = document.querySelector('.credito2')
          let vencim = document.querySelector('.credito3')          
          //input de transferencia bancaria
          let transfer = document.querySelector('.transfer');       
          let inputCantidad = document.querySelector('#cantProd');


          //Alerta de compra exitosa!
      function alertSuccess (){
            let credito1 = document.querySelector('input.credito1');
            let credito2 = document.querySelector('input.credito2');
            let credito3 = document.querySelector('input.credito3');
           if (inputCantidad.value > 0 && inputCalle.value != '' && inputNumero.value != ''
                && inputEsquina.value != '' && credito1.value != ''
                && credito2.value != '' && credito3.value != '' || inputCantidad.value > 0 && inputCalle.value != '' && inputNumero.value != ''
                && inputEsquina.value != '' && transfer.value != '' ) {
                  document.getElementById('alert-success').style.display = 'block';                   
        };        
      } ;

        
        async function changeDelAgregado(){ 
            let calculo = await articuloElegido()
            let cantprod = document.querySelector('#nuevoprod');   
            subtotalnuevo.innerHTML =  `<b>USD: ${calculo.cost * cantprod.length}`;}

          

    document.addEventListener('DOMContentLoaded',async () => {
        const imagen = document.querySelector('#imagen');        
        const nombre = document.querySelector('#nombre');
        const costo = document.querySelector('#cost');
        let subtotal = document.querySelector('#subtotal');   
             
        const compras = await carrito();        
        imagen.innerHTML = `<img width="100" src="${compras.articles[0].image}" alt="Autocargado">`;
        nombre.innerHTML = compras.articles[0].name
        costo.innerHTML = 'USD: '+`${compras.articles[0].unitCost}`     

        //agrego a la lista del carrito el producto que le di comprar.
        
        /* let carro = document.querySelector('#carro');
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
 */


          //modal deshabilitar segun la opcion elegida         
         function desactivarTransf() {          
            transfer.disabled = true;
            numerotarje.disabled = false;
            codigoseg.disabled = false;
            vencim.disabled = false;
           };

           function desactivarCredito() {          
            transfer.disabled = false;
            numerotarje.disabled = true;
            codigoseg.disabled = true;
            vencim.disabled = true;
           };
           
         tarjcredito.addEventListener('focus', ()=>{
          desactivarTransf();
          transfer.value = '';
         })
           
         transferencia.addEventListener('focus', ()=>{
          desactivarCredito();
          numerotarje.value = '';
          codigoseg.value = '';
          vencim.value = '';
         })
              
                    
        //variables para boton Finalizar Compra
        const btnfinalizar = document.querySelector('#btnfinalizar');
        let inputCalle = document.querySelector('#inputCalle');
        let inputNumero = document.querySelector('#inputNumero');
        let inputEsquina = document.querySelector('#inputEsquina');
        let mostrardivcalle = document.querySelector('#street');
        let mostrardivnumber = document.querySelector('#number');
        let mostrardivcorner = document.querySelector('#corner');
        let mostrardivpago = document.querySelector('#pago');
        let pagoselect = document.querySelector('.pagoselect');
        let guardar = document.querySelector('#guardar');        
        
        
        btnfinalizar.addEventListener('click',(e)=>{
          
          if (inputCalle.value.length == 0) {            
            e.preventDefault()
            inputCalle.focus();
             mostrardivcalle.style.display = 'block';
             inputCalle.style.border = '1px solid red';
          } else {
            mostrardivcalle.style.display = 'none';
             inputCalle.style.border = '1px solid #ced4da';
          };

          if (inputNumero.value.length == 0) {
            e.preventDefault()
            inputNumero.focus();
            mostrardivnumber.style.display = 'block';
             inputNumero.style.border = '1px solid red';
          } else {
            mostrardivnumber.style.display = 'none';
            inputNumero.style.border = '1px solid #ced4da';
          };

          if (inputEsquina.value.length == 0 ) {
            e.preventDefault()
            inputEsquina.focus();
            mostrardivcorner.style.display = 'block';
             inputEsquina.style.border = '1px solid red';
          } else {
            mostrardivcorner.style.display = 'none';
            inputEsquina.style.border  = '1px solid #ced4da';
          };
          
          if(numerotarje.value == '' && codigoseg.value == '' && vencim.value == '' && transfer.value == ''){
            e.preventDefault();
            mostrardivpago.style.display = 'block';
          } else {
            mostrardivpago.style.display = 'none';
          };
          
          if (inputCantidad.value < 1) {            
            e.preventDefault();
            inputCantidad.style.border = ' 1px solid red';
          } else {
            inputCantidad.style.border = '1px solid black';
          };

            let costenvio = document.querySelector('#costenvio')
            console.log(costenvio.textContent)
           if (costenvio.textContent == "USD 0"){
            e.preventDefault()            
            document.querySelector('#envio').style.display = 'block';      
          } else {            
            document.querySelector('#envio').style.display = 'none';            
          };        
          
            alertSuccess();
        
        }) ;      
          


        guardar.addEventListener('click', ()=>{
          if (tarjcredito.focus){ 
            mostrardivpago.style.display = 'none';
            pagoselect.innerHTML = `<b>Tarjeta de Crédito</b> 
            <a type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">Seleccionar</a>`;
          }      
          if (transferencia.focus) {              
            mostrardivpago.style.display = 'none';
            pagoselect.innerHTML = `<b>Transferencia Bancaria</b> 
            <a type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">Seleccionar</a>`;
          };})  
        
        });
    