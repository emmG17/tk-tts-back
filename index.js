const express = require('express');
const axios = require('axios');
const base64 = require('base64-js');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000; // You can change the port number if needed

app.use(bodyParser.json());

app.use(cors());

async function createUrl(voice, text) {
    const baseUrl = 'https://api22-normal-c-useast1a.tiktokv.com/media/api/text/speech/invoke/?';
    const mapping = '&speaker_map_type=0&aid=1233';

    // Concatenate arguments
    const voiceParam = `text_speaker=${voice}`;
    const textParam = `&req_text=${text}`;
    const url = `${baseUrl}${voiceParam}${textParam}${mapping}`;
    return url;
}

async function getJson(url, sessionId) {
    const headers = {
        'User-Agent': 'com.zhiliaoapp.musically/2022600030 (Linux; U; Android 7.1.2; es_ES; SM-G988N; Build/NRD90M;tt-ok/3.12.13.1)',
        'Cookie': `sessionid=${sessionId}`,
    };

    try {
        const response = await axios.post(url, null, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}

app.post('/api', async (req, res) => {
    const { voice, text, sessionId } = req.body;
    const fileName = `${voice}_${Date.now().toString()}`
    const url = await createUrl(voice, text);

try {
        const json = await getJson(url, sessionId);
        const data = json.data.v_str;
        const bytes = base64.toByteArray(data);
        res
        .setHeader('Content-Disposition', `attachment; filename=${fileName}.mp3`)
        .setHeader('Content-Type', 'audio/mpeg')
        .status(200)
        .send(Buffer.from(bytes));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred.');
    }
});

app.listen(port, () => {
    console.log(`Server should be running on port ${process.env.PORT}`);
    console.log(`Server is running on port ${port}`);
});

