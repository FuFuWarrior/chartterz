// This is require if you are serving the client from the same server the socket is on
// Else input the url as argument let socket = io('http://test.com/')
let socket = io();
let html = document.querySelector('html');
let output = document.querySelector('#output');
let handle = document.querySelector('#handle input');
let message = document.querySelector('#message input');
let btn = document.querySelector('#btn-send');
let feedback = document.querySelector('#feedback');

// Sending message

 document.addEventListener('DOMContentLoaded', () => {
    
    handle.value = '';
    message.value = '';

    btn.addEventListener('click', () => {

        socket.emit('message', {
            handle: handle.value,
            message: message.value
        })

        message.value = '';
        handle.value = '';
    });
    
    message.addEventListener('keydown', () => {
        socket.emit('typing', handle.value)
    })
    
    // Listen to events
    socket.on('message', (msg) => {
        feedback.innerHTML = '';
        output.innerHTML += '<p><strong>'+ msg.handle + '</strong>: ' + msg.message + '</p>';
    });
    
    socket.on('typing', (data) => {
        feedback.innerHTML = `<p>${data} <em>is typing a message</em></p>`;
    });
 })
// Clear input on document ready
