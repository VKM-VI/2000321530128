const axios = require('axios');
const express = require('express');

const port = 3000;
const app = express();

async function process(urls) {
  const promise = urls.map(fetchnum);
  const res = await Promise.all(promise);
  const arr=Array.from(new Set(res.flat()))
  const sorted = arr.sort((a, b) => a - b);
  return sorted;
}

async function fetchnum(url) {
  try {
    const answer = await axios.get(url, { timeout: 500 });
    return answer.data.numbers || [];
  } catch (error) {
    return [];
  }
}

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;
  if (!urls || !Array.isArray(urls)) {
    return res.status().json({ error: 'Error' });
  }
  const numbers = await process(urls);
  res.json({ numbers });
});

app.listen(port, () => {
});