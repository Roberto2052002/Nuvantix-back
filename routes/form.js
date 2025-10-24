const express = require('express');
const router = express.Router();
const axios = require('axios');

// Minimal validation helper: require fullName, email, phone, message
function validate(body) {
  const required = ['fullName', 'email', 'phone', 'message'];
  const missing = [];
  for (const field of required) {
    if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
      missing.push(field);
    }
  }
  return missing;
}

// POST /submit -> forward to n8n webhook
router.post('/', async (req, res) => {
  try {
    const missing = validate(req.body);
    if (missing.length) {
      return res.status(400).json({ success: false, message: 'Missing fields: ' + missing.join(', ') });
    }

    // Construct payload expected by your n8n workflow
    // n8n's expressions like {{$json.body.fullName}} will map to these keys
    const payload = {
      businessName: req.body.businessName || '',
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    };

    const webhookUrl = process.env.N8N_WEBHOOK_URL 

    const response = await axios.post(webhookUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    return res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error('Error forwarding to n8n:', err && err.response ? err.response.data : err.message || err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
