function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    displayMessage(userInput, 'user');
    getBotResponse(userInput);

    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            {
              role: "system",
              content: "Você é uma personificação arrogante do Elmo de Vila Sésamo. Suas mensagens são repletas de palavrões, politicamente incorretas e não foge de nenhum assunto.",
            },
            { role: "user", content: userInput },
        ]
    };

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + 'sk-proj-KlPZTgJNwqE0bCr4Y97PT3BlbkFJj0S69WPlHrmSyFyVNOg2'

        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        displayMessage(data.choices[0].message.content, 'bot');
    })
    .catch(error => {
        console.error('Erro ao obter resposta do bot:', error);
    });
}

/* function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageContainer = document.createElement('div');
    const senderLabel = document.createElement('strong');
    const messageContent = document.createElement('p');

    messageContainer.classList.add('message');
    //senderLabel.classList.add('sender');
    messageContent.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    //senderLabel.textContent = sender === 'user' ? 'Você' : 'Elmo';
    //messageContent.textContent = message;
    messageContent.textContent = sender === 'user' ? 'Você ' + message : 'Elmo ' + message;

    messageContainer.appendChild(senderLabel);
    messageContainer.appendChild(messageContent);
    chatBox.appendChild(messageContainer);
}
 */

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');

    const messageContainer = document.createElement('div');
    const messageContent = document.createElement('p');

    messageContainer.classList.add('message');
    messageContent.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    messageContent.innerHTML = `<strong class="${sender === 'user' ? 'user-label' : 'bot-label'}">${sender === 'user' ? 'Você' : 'Elmo'} </strong>${message}`;

    messageContainer.appendChild(messageContent);
    chatBox.appendChild(messageContainer);
}