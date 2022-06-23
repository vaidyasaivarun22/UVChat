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

    userName = prompt("Enter your name before you join the party!!!");
    socket.emit('new-user-joined',userName);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'center');
})

// This event fires when it receives a broadcasted message from the user 
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

// This event fire when it receives disconnnect signal from server .
socket.on('left',name=>{
    append(`${name} left the chat`,'center');
})

// After sending my own message it is appended as follows on right .
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message !== '')
    {
        append(`You : ${message}`,'right');
        socket.emit('send',message);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        messageInput.value = '';
    }
})