var socket = io();

function envoyer(){
    const element = document.getElementById('usermsg');
    //console.log(element.value);
    socket.emit('envoyer',element.value);
}

socket.on('message', function afficherMessage(reponse){
    console.log(reponse);
    var maReponse = reponse;


    var ladate=new Date();
    var h=ladate.getHours();

if (h<10) {h = "0" + h}
    var m=ladate.getMinutes();
if (m<10) {m = "0" + m}
    var s=ladate.getSeconds();


    const element = document.getElementById('chatbox');
    let content = element.innerHTML;
    content = content +'</br>'+h+":"+m+'</br>'+'<div id=reponse>' +maReponse+'</div>';
    console.log(content);
    element.innerHTML = content;
});

socket.on('userConnect', function afficherMessage(user){

    const element = document.getElementById('user');
    let content = element.innerHTML;
    content = user;
    console.log(content);
    element.innerHTML = content;
    
    });
    
    socket.on('userDisconnect', function afficherMessage(user){
    
        const element = document.getElementById('user');
        let content = element.innerHTML;
        content = user;
        console.log(content);
        element.innerHTML = content;
    
    });