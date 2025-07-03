const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Przechowujemy ostatni sygnał w zmiennej w pamięci RAM
let lastSignal = null;

// Endpoint do odbioru webhooków z TradingView
app.post('/webhook', (req, res) => {
  const message = req.body.message;
  if (typeof message === 'string') {
    lastSignal = message;
    console.log(`Otrzymano sygnał: ${message}`);
    return res.status(200).send('Signal received');
  } else {
    return res.status(400).send('Invalid payload');
  }
});

// Endpoint do pobrania ostatniego sygnału
app.get('/signal', (req, res) => {
  if (lastSignal) {
    return res.status(200).json({ signal: lastSignal });
  } else {
    return res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
