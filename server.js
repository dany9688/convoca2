const express = require('express');
const res = require('express/lib/response');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const fs = require('fs');
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


httpServer.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
})

app.use(express.static('public'))

app.set('views', './public/views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {intervenciones})
})

app.get('/pantalla', (req, res) => {
    res.render('pantalla', {intervenciones})
})

app.get('/convocar', (req, res) => {
    res.render('convocar', {intervenciones})
})

let intervenciones = [
    {
    tipo: "Incendio",
    movil: 4,
    direccion: "Plaza 360",
    id: 0
},
{
    tipo: "Auxilio",
    movil: 15,
    direccion: "Plaza 11",
    id: 1
}
]

let ultima = []

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('intervenciones', intervenciones);
    
    socket.on('new-inter',data => {
        intervenciones.push(data);
        let guardar = JSON.stringify(data);
        const ruta = './intervenciones.txt';
        fs.writeFileSync(ruta, guardar)
        io.sockets.emit('intervenciones', intervenciones);
        let ultima = intervenciones[intervenciones.length-1];
        console.log('esto es ultima: ' + ultima)  
        io.sockets.emit('ultima', ultima)
        console.log(intervenciones)
        let ultimaConvo = JSON.stringify(ultima)
        console.log('esto es ultima2: ' + ultimaConvo)
        io.sockets.emit('convocar', ultimaConvo)
    });

    socket.on('limpiar',data => {
        console.log('paso por limpiar')
        io.sockets.emit('limpiar')
        ;
    });

});
