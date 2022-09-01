const socket = io(); 



//=> Función para limpiar los input; 
const limpieza = () => { 
    document.getElementById("nombre").value = ""; 
    document.getElementById("precio").value = ""; 
    document.getElementById("img").value = ""; 
}

const limpiezaChat = () => { 
    document.getElementById("textoMensaje").value=""
}


//=>Enviar productos al contenedor
const agregarProducto = () => { 
    const producto = { 
        nombre:document.getElementById("nombre").value,
        precio:document.getElementById("precio").value, 
        img:document.getElementById("img").value, 
    }

    socket.emit("nuevoProducto", producto); 
    limpieza()
    return false
   
}

//=>Renderiza los productos del contenedor
const renderizarProductos = (data) => { 
    const html = data.map((element, idx) => { 
        return(
            `
            <div class="productoItem">
                <h3 class="nombreItem">${element.nombre}</h3>
                <b class="precioItem">${element.precio}</b>
                <img src="${element.img}" width="200px" class="imgItem"/>
            </div>
            `
        )}).join(" "); 
        document.getElementById("productosContenedor").innerHTML=html; 
}


//=>Logica Mensajes; 
const agregarMensaje = () => { 

    let fecha = new Date().toLocaleDateString()+ ' ' +new Date().toTimeString()
    let fyh = fecha.split(' ');


    if(document.getElementById("nombreMensaje").value == ""){ 
      alert("No nombre")
      return false
    }else{ 
        const mensaje = { 
            nombre:document.getElementById("nombreMensaje").value,
            texto:document.getElementById("textoMensaje").value, 
            date:fyh[0]+' '+fyh[1]
        }
    
        socket.emit("nuevoMensaje", mensaje); 
        limpiezaChat()
        return false
    }

}


const renderizarChat = (data) => { 
    const html = data.map((element, idx) => { 
        return (
            `<div class="mensajeItem">
                <h2 class="nombreMensaje">${element.nombre}</h2>
                <h4 class="contenidoMensaje">${element.texto}</h4>
                <p class="fechaMensaje">${element.date}</p>
            </div>`
        )
    }).join(" "); 
    document.getElementById("chatContenedor").innerHTML = html; 

} 




socket.on("productos", (data) => {
    renderizarProductos(data)
})

socket.on("chat", (data) => { 
    renderizarChat(data)
})