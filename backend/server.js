const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => res.send('vacc.me'));

// routes
app.use('/api/sites', require('./routes/sites'));

app.listen(port, async () => {
  console.log(`Starting server on port ${port}`);
});