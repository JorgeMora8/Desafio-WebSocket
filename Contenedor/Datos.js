class datos { 
    idProductos = 0
    constructor(){ 
        this.productos = [];

    }

    getAll(){ 
        return this.productos; 
    }

    getByOne(id){ 
        let objetoSeleccionado = this.productos.filter(producto=>producto.id == Number(id)); 
        return objetoSeleccionado
    }

    addOne(objeto){ 
        objeto.id = this.idProductos++; 
        this.productos=[...this.productos, objeto]
    }

    updateOne(id,objeto){ 
        this.productos.filter(producto=>{
            if(producto.id == Number(id)){ 
                producto = objeto
            }
        })
        return this.productos
    }

    deleteOne(id){ 
        let objetoSeleccionado = this.productos.filter(producto=>producto.id != Number(id)); 
        this.productos=objetoSeleccionado;
        return objetoSeleccionado
    }

}

module.exports=datos; 