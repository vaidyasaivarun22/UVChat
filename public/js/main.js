const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append=(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const userName = prompt("Enter your name before you join the party!!!");
socket.emit('new-user-joined',userName);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'center');
})

socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat`,'center');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})