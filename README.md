# TikTok Text-to-Speech Node Server

This Node.js server utilizes the Express framework to provide a simple API for converting text to speech using TikTok's Text-to-Speech API. It receives requests with the voice type, text, and session ID, then returns an MP3 audio file.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:emmG17/tk-tts-back.git
   ```

2. Install dependencies:

   ```bash
   cd tiktok-tts-server
   npm install
   ```

### Usage

1. Start the server:

   ```bash
   npm start
   ```

   By default, the server runs on port 3000. You can change the port by setting the `PORT` environment variable.

2. Make a POST request to the `/api` endpoint with the following JSON payload:

   ```json
   {
     "voice": "some_voice_type",
     "text": "Your text to convert",
     "sessionId": "your_tiktok_session_id"
   }
   ```

   - `voice`: The desired voice type.
   - `text`: The text to convert to speech.
   - `sessionId`: Your TikTok session ID.

3. The server will respond with an MP3 file containing the converted speech.

## API Endpoint

### POST `/api`

Converts text to speech and returns the resulting MP3 file.

#### Request

- **Body:**
  ```json
  {
    "voice": "some_voice_type",
    "text": "Your text to convert",
    "sessionId": "your_tiktok_session_id"
  }
  ```

#### Response

- **Success:**
  - Status Code: 200
  - Headers:
    - `Content-Disposition`: Attachment with a filename.
    - `Content-Type`: audio/mpeg
  - Body: MP3 audio file.

- **Error:**
  - Status Code: 500
  - Body: "An error occurred."

## Configuration

- The TikTok API base URL and other parameters are pre-configured in the `createUrl` function.

## Dependencies

- [express](https://www.npmjs.com/package/express): Web application framework.
- [axios](https://www.npmjs.com/package/axios): HTTP client for making requests.
- [base64-js](https://www.npmjs.com/package/base64-js): Converts base64-encoded data to binary data.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse JSON requests.
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing.
