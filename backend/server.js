const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/news', async (req, res) => {
  const { category = '', page = 1, pageSize = 12 } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category,
        page,         // ✅ Add this
        pageSize,     // ✅ And this
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.json(response.data); // This includes articles + totalResults
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
