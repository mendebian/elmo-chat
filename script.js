async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    displayMessage(userInput, 'user');
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
        });

        const data = await response.json();
        displayMessage(data.botResponse, 'bot');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }

    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageContainer = document.createElement('div');
    const senderLabel = document.createElement('strong');
    const messageContent = document.createElement('p');

    messageContainer.classList.add('message');
    senderLabel.classList.add('sender');
    messageContent.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    senderLabel.textContent = sender === 'user' ? 'Você' : 'Elmo';
    messageContent.textContent = message;

    messageContainer.appendChild(senderLabel);
    messageContainer.appendChild(messageContent);
    chatBox.appendChild(messageContainer);
}
