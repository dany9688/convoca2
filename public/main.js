const socket = io.connect();

// RENDERIZADOS

function render(data) {
    const html = data.map((elem, index) => {
        return(`<tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Móvil</th>
                    <th scope="col">Dirección</th>
                </tr>
                <tr>
                    <td> ${elem.tipo} </td>
                    <td> ${elem.movil} </td>
                    <td> ${elem.direccion}  </td>
                </tr>`)
    }).join(" ");
    let idInter = document.getElementById('intervenciones')
    
    if (idInter != null){
        document.getElementById('intervenciones').innerHTML = html;

    } else {
        console.log('no existe id intervenciones')
    }
}

function renderUltima(data) {

    const htmlUltima = (`<p style="font-size: 100px; font-weight: bold;">Tipo: ${data.tipo}</p>
        <p style="font-size: 100px; font-weight: bold;">Móvil: ${data.movil}</p>
        <p style="font-size: 100px; font-weight: bold;">Dirección: ${data.direccion}</p>`)

        let idUltima = document.getElementById('ultima')
        
    
        if (idUltima != null && data.tipo != undefined){
            document.getElementById('ultima').innerHTML = htmlUltima;
            
        } else {
            console.log('no existe id ultima')
        }
}

function renderLimpiar(e) {
    let idUltima = document.getElementById('ultima')
        
    
    if (idUltima != null){
        document.getElementById('ultima').innerHTML = "";
        
    } else {
        console.log('no existe id ultima en limpiar')
    }

}

function renderConvocar(data) {
  console.log('esto es data: ' + data)
    const htmlUltima = (`<p style="font-size: 50px; font-weight: bold;">Tipo: ${data.tipo}</p>
        <p style="font-size: 100px; font-weight: bold;">Móvil: ${data.movil}</p>
        <p style="font-size: 100px; font-weight: bold;">Dirección: ${data.direccion}</p>
        <button type="button">ASISTO</button> `)

        let idConvocar = document.getElementById('convocar')
        
    
        if (idConvocar != null && data.tipo != undefined){
            document.getElementById('convocar').innerHTML = htmlUltima;
            console.log('paso por convocar')
        } else {
            console.log('no existe id convocar')
        }
}

// ACCIÓN DE BOTONES

function addIntervencion(e) {
    const intervencion = {
        tipo: document.getElementById('tipo').value,
        movil: document.getElementById('movil').value,
        direccion: document.getElementById('direccion').value
    };
    socket.emit('new-inter', intervencion);

    return false;
}

function limpiar(e) {
    socket.emit('limpiar');

}

socket.on('intervenciones', function(data) { render(data); }); 
socket.on('ultima', function(data) { renderUltima(data); });
socket.on('limpiar', function() { renderLimpiar(); });
socket.on('convocar', function(data) { renderConvocar(data); }); 