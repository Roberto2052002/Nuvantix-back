// Main server entry point
// Loads environment variables, starts Express and mounts routes
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const app = express();

// parse JSON bodies
app.use(express.json());

// allow only the frontend during development
app.use(cors({ origin: 'http://www.nuvantix.net' }));

// mount the form route at /submit
// routes/form.js defines POST '/' so mounting at /submit gives POST /submit
app.use('/submit', require('./routes/form'));

// simple health endpoint so you can quickly verify the server is reachable
app.get('/health', (req, res) => res.status(200).send('ok'));

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});

// Optional: export handler for serverless (AWS Lambda)
try {
  // require lazily `to avoid adding it as mandatory dependency when not used
  const serverless = require('serverless-http');
  module.exports.handler = serverless(app);
} catch (err) {
  // serverless-http not installed or not needed; ignore
}
