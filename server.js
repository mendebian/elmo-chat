const express = require('express');
let fetch;
try {
    fetch = require('node-fetch');
} catch (err) {
    fetch = require('node-fetch').default;
}
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const userInput = req.body.userInput;

        const apiUrl = 'https://api.openai.com/v1/chat/completions';
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

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.apiKey
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        res.json({ botResponse: responseData.choices[0].message.content });
    } catch (error) {
        console.error('Erro ao obter resposta do bot:', error);
        res.status(500).json({ error: 'Erro ao obter resposta do bot' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
