const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { startConsumer } = require('./consumer');
const { connect } = require('./rabbit');


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8000;

async function start() {
    await connect();
    startConsumer().catch(err => console.error('consumer error', err));
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

start();