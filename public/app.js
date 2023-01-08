const messageTypes = {
    LEFT: 'left',
    RIGHT: 'right',
    LOGIN: 'login',
};

const chatWindow = document.getElementById('chat');
const messagesList = document.getElementById('messages-list');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

let username = '';

const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const loginWindow = document.getElementById('login');

const messages = [];

let socket = io();

socket.on('message', (message) => {
    if (message.type !== messageTypes.LOGIN) {
        if (message.author === username) {
            message.type = messageTypes.RIGHT;
        } else {
            message.type = messageTypes.LEFT;
        }
    }

    messages.push(message);
    displayMessages();

    // scroll to the buttom
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

createMessageHTML = message => {
    if (message.type === messageTypes.LOGIN) {
        return /*html*/`<p class="secondary-text text-center mb-2">${message.content}</p>`;
    }

    return /*html*/`
        <div class="message ${messageTypes.LEFT ? 'messsage-left' : 'message-right'}">
            <div class="message-detials flex">
                <p class="flex-grow-1 message-author>${message.type === messageTypes.LEFT ? message.author : ''}</p>
                <p class="message-date">${message.data}</p>
        `;
}