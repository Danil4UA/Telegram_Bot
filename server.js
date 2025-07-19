import express from "express";
import axios from "axios";
import "dotenv/config";

const {
    TELEGRAM_BOT_TOKEN,
    SERVER_URL,
} = process.env;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const URI = `/webhook/${TELEGRAM_BOT_TOKEN}`;
const WEBHOOK_URL = `${SERVER_URL}${URI}`;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.post(URI, async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const chatId = message.chat.id;
    const text = message.text;
    
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `You said: ${text}`,
    });
    return res.sendStatus(200)
})

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await init();
})