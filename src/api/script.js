const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const sendMessageButton = document.getElementById('send-button')

const name = prompt('Qual seu nome?')

function appendMessage(message) {

  const messageElement = document.createElement('div')
  messageElement.className = 'message-sent'
  messageElement.innerText = message
  messageContainer.append(messageElement)
  scroll(0, 9 * 9999);
}

appendMessage('Você entrou na sala')

socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} conectou`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} desconectou`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  if (!sendMessageButton.getAttribute("disabled") != "disabled") {
    sendMessageButton.setAttribute("disabled", "disabled");
    sendMessageButton.innerText = "Aguarde...";
    setTimeout(function () {
      sendMessageButton.removeAttribute("disabled");
      sendMessageButton.innerText = "Enviar";

    }, 3000);
    // do stuff ...
  }
  const message = messageInput.value
  if (message.length > 0) {
    appendMessage(`You: ${message}`)
  }
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

console.log('Desenvolvido por Enzo Spagnolli utilizando socketIO')