//Modulos
const express = require('express');
const nocache = require('nocache');
const bodyParser = require('body-parser');

const config = require('./config');

//Inicio
const app = express();

//Variables
let users = [];

//Funciones
const listUsers = (users)=> {
    let cadena = '';
    for (u in users){
        cadena += `\n id: ${users[u].id} - nombre: ${users[u].name}`;
    }
    return cadena;
}

//config
app.use(nocache());
app.use(bodyParser.json());

//rutas
app.get('/', (req, res)=>{
    res
    .sendStatus(500);
});

//ListarUsuario
app.get('/users', (req, res)=>{
    res
    .status(200)
    .send(`Usuarios Listados: ${listUsers(users)}`);
});

app.get('/users/:id', (req, res)=>{
    res
    .status(200)
    .send(`Este es el usuario ${req.params.id}`)
});

//CrearUsuario
app.post('/users',(req, res)=>{
    let person = {
        id: req.body.id,
        name: req.body.name
    };
    users.push(person);
    res
    .status(200)
    .send(`El usuario ${person.name} con id ${person.id} fue creado`);
});

//Actualizar
app.put('/users',(req, res)=>{    
    let person = {
        id: req.body.id,
        name: req.body.name
    };    
    let cadena1 = '';
    let cadena2 = '';    
    var swmod = 'N';
    for (u in users) {
        if (users[u].id ===  person.id) {
           cadena1 += `\n Antes id: ${users[u].id} - nombre: ${users[u].name} `; 
           users.splice(u,1,person);
           cadena2 += `\n Despues id: ${users[u].id} - nombre: ${users[u].name} \n\n`;            
           var swmod = 'S';
        }
    }
    swmod == 'S' ?
        res
        .status(200)                
        .send(`Usuario Actualizado: ${cadena1} ${cadena2}`)       
    : 
        res
        .status(200)
        .send(`Id No Existe, ${person.id} No se puede modificar`);        
});

//Eliminar
app.delete('/users',(req, res)=>{
    let person = {
        id: req.body.id
    };
    let cadena = '';
    var swdel = 'N';
    for (u in users) {
        if (users[u].id ===  person.id) {
           cadena += `\n id: ${users[u].id} - nombre: ${users[u].name} \n\n`;           
           users.splice(u,1);
           var swdel = 'S';
        }
    }
    swdel == 'S' ?
        res
        .status(200)
        .send(`Usuarios Eliminado: ${cadena} Usuarios Listados: ${listUsers(users)}`)
    : 
        res
        .status(200)
        .send(`Id No Existe: ${person.id} No se puede eliminar`);    
});

//server
app.listen(config.port, ()=>{
    console.log('Servidor iniciado...');
});