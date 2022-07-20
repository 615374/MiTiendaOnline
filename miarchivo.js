const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


let carrito = []


//Recorro el stock de productos con el forEach y creo un elemento div. 
//Inyecto el html y la descripcion del producto (img, nombre, descripcion, talle, precio).
//Creo un boton para agregar los productos.

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `

    //Inyecto el contenedor de productos a traves de un appendChild en el html.
    contenedorProductos.appendChild(div)

    //Obtengo el elemento del producto por id y le agrego un eventlistener para que se agreguen en el carrito al clickear. 
    const boton = document.getElementById(`agregar${producto.id}`)
   
    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
        
    })
})



//Creo una funcion para que se agreguen los productos al carrito y por parametro le doy la id del producto.
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId) //Comprobar si el elemento ya existe en el carro

    if (existe){ const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        }) //Con el find voy a traer aquel producto cuya propiedad id coincida con la propiedad Id que recibe por parametro.
    } else { const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}



//Creo una funcion para recorrer el carrito y que se vaya actualizando.
const actualizarCarrito = () => {
    
    //Para que no se repitan los productos en el carrito llamo al nodo contenedorCarrito, y lo borro a traves de un string vacio. 
    contenedorCarrito.innerHTML = "" 

    //Por cada producto creo un div con esta estructura y le hago un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito)) 

    })
    
    contadorCarrito.innerText = carrito.length // Creo una variable contadorCarrito, 
    //creo un texto a traves del innerText y lo igualo a la longitud del carrito.
   
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto que recorro en mi carrito, le digo al acumulador que le sume la propiedad precio, 
    //con el acumulador empezando en 0.

    console.log(carrito)
}


//Creo una funcion para eliminar los productos del carrito, le paso por parametro el prod.Id, 
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId) //Creo una condicion para que el prod.id sea igual al prodId que recibo por parametro.

    const indice = carrito.indexOf(item) // creo una constante indice y a traves del metodo indexOf me devuelve el elemento item.

    carrito.splice(indice, 1) //Para eliminar un elemento del array uso el metodo splice que recibe por parametro el indice (del item) y la cantidad de elementos a borrar.
    actualizarCarrito()

    console.log(carrito)
}


//Agrego un evento para que al clickear el boton Vaciar carrito se me eliminen los productos dentro 
//(igualo la longitud a 0)
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


//Agrego un evento para que al actualizar el DOM llame al localStorage, obtenga los item del carrito y me los conserve
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
