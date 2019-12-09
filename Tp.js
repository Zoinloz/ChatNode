// Creation d'un serveur express avec envoie d'info 
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path'); //adapter le chemin d'acces en fonction de l'OS
const io = require('socket.io')(http);

//Fonction static
app.use(express.static(path.join(__dirname, 'express'))); // recupere l'index.html dans le dossier client

app.get('/', (req, res) => {

    console.log(req.url);


});

io.on('connection', client => {

                userNbr++;
                console.log(userNbr);
                io.sockets.emit('userConnect', userNbr);
    
                //Déconnexion d'un utilisateur quand il ferme la page et donc perd la connexion au serveur
                client.on('disconnect', () => {
                    userNbr--;
                    console.log(userNbr);
                    io.sockets.emit('userDisconnect', userNbr);
                })
    
                //Envoie une socket à tous les clients présent sur le site avec le message q'un utilisateur a envoyé
                client.on('envoyer', function recevoirMessage(message) {
                    console.log(message);
                    var monMessage = message;
                    io.sockets.emit('message', monMessage);
                });
            });

http.listen(3001);

var userNbr = 0;

//**Création du serveur en récupérant un fichier HTML déja créé**
// const http = require('http');
// const fs = require('fs');



// //Récupération du fichier HTML
// fs.readFile('./index.html', 'utf8', (err, data) => {

//     if (err) {
//         console.error(err);
//     }
//     if (data) {
//         const server = http.createServer((req, res) => {
//             console.log('Request !');
//             console.log(req.url);
//             res.end(data);
//         })
//         //Port sur lequel le serveur va écouter
//         server.listen(4000);

//         //Création d'une socket
//         const io = require('socket.io')(server);

//         //Connexion d'un client sur la page WEB
//         io.on('connection', client => {

//             userNbr++;
//             console.log(userNbr);
//             io.sockets.emit('userConnect', userNbr);

//             //Déconnexion d'un utilisateur quand il ferme la page et donc perd la connexion au serveur
//             client.on('disconnect', () => {
//                 userNbr--;
//                 console.log(userNbr);
//                 io.sockets.emit('userDisconnect', userNbr);
//             })

//             //Envoie une socket à tous les clients présent sur le site avec le message q'un utilisateur a envoyé
//             client.on('envoyer', function recevoirMessage(message) {
//                 console.log(message);
//                 var monMessage = message;
//                 io.sockets.emit('message', monMessage);
//             });

//         }
//         )
//     }
// });




//**Serveur avec du HTML directement écris**

// const index = ` 

// <html>
// <head>
// <title>Mon premier site en Node.js </title>
// </head>
// <body>
// <p>Hello World</p>
// </body>
// </html>
// `;

// const server = http.createServer((req, res)=> {
//    console.log('Request !');
//    console.log(req.url);
//    res.end(index);
// })

//server.listen(4000);