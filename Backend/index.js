const express = require('express');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const ConnectDB = require('./Database/db');
const router = require('./Router/Router');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const paymentrouter = require('./Router/PaymentRoute');

const port = process.env.PORT;
const url = process.env.db_url;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://terraquest.netlify.app'],
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/api', router);
app.use('/payment', paymentrouter);

app.get('/health', async (req, res) => {
  try {
    const response = await axios.post('https://api.uptimerobot.com/v2/getMonitors', {
      api_key: process.env.UPTIME_ROBOT_API_KEY,
      format: 'json',
    });

    const monitors = response.data.monitors.map((monitor) => ({
      name: monitor.friendly_name,
      status: monitor.status, // 2 = Up, 9 = Down, 0 = Paused
      uptime: monitor.all_time_uptime_ratio || 'N/A',
      type: getMonitorType(monitor.type), // e.g., "HTTP(s)"
      interval: `${monitor.interval / 60} min`,
      createdAt: formatUnixDate(monitor.create_datetime),
      responseTime: monitor.last_response_time ? `${monitor.last_response_time} ms` : 'N/A',
    }));

    res.json({ monitors });
  } catch (err) {
    console.error('UptimeRobot Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch uptime status' });
  }
});

// Helper to map monitor type codes to labels
function getMonitorType(type) {
  const typeMap = {
    1: 'HTTP(s)',
    2: 'Keyword',
    3: 'Ping',
    4: 'Port',
    5: 'Heartbeat',
  };
  return typeMap[type] || 'Unknown';
}

// Helper to convert UNIX timestamp to readable date
function formatUnixDate(unixTime) {
  return new Date(unixTime * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

app.listen(port, async () => {
  await ConnectDB(url);
  console.log(`The server is running on port:${port} Link: http://localhost:${port}`);
});
