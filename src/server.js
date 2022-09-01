const express = require("express"); 
const { appendFile } = require("fs");
const {Server:HttpServer} = require("http"); 
const {Server:IOServer} = require("socket.io"); 
const PORT = 5000; 

const app = express(); 
const httpServer = new HttpServer(app); 
const io = new IOServer(httpServer); 

app.use(express.static("public")); 
app.use(express.urlencoded({extended:true})); 
app.use(express.json()); 


//HandleBars SetUp
const handlebarsConfig = {defaultlayout: "main.handlebars"}
const {engine} = require("express-handlebars"); 
app.engine("handlebars", engine(handlebarsConfig)); 
app.set("view engine", ".handlebars"); 
app.set("views", "./views");

const Datos = require("../Contenedor/Datos"); 
const Contenedor = new Datos //=>Contenedor Productos; 
const Chat = new Datos //=>Contenedor Chat


const server = httpServer.listen(PORT, () => { 
    console.log("Usando el puerto: " + PORT)
})
server.on("error", (err) => { 
    console.log(err)
})

app.get("/", (req,res) => { 
    res.render("home.handlebars", {productos:Contenedor.getAll()})
})



io.on("connection", (socket) => { 
    socket.emit("productos", Contenedor.getAll()); 
    socket.emit("chat", Chat.getAll())

    socket.on("nuevoProducto", (data) => { 
       Contenedor.addOne(data); 
       io.sockets.emit('productos',Contenedor.getAll())
    })
    socket.emit("productos", Contenedor.getAll()); 

    socket.on("nuevoMensaje", (data) => { 
       Chat.addOne(data); 
       io.sockets.emit('chat',Chat.getAll())
    }); 
})