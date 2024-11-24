const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 路由
const chatRoute = require('./routes/chat');
const tarotRoute = require('./routes/tarot');
const imageRoute = require('./routes/image');

app.use('/api/chat', chatRoute);
app.use('/api/tarot', tarotRoute);
app.use('/api/image', imageRoute);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// init-db.js
// const Database = require('better-sqlite3');