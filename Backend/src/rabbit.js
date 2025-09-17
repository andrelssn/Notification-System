const amqp = require('amqplib');
require('dotenv').config();

const RABBIT_URL = process.env.RABBIT_URL;
const INPUT_QUEUE = 'queue.notification.input.ander-sants';
const STATUS_QUEUE = 'queue.notification.status.ander-sants';

let connection;
let channel;

async function connect() {
    if (channel) return channel;

    try {
        connection = await amqp.connect(RABBIT_URL);
        channel = await connection.createChannel();

        await channel.assertQueue(INPUT_QUEUE, { durable: true });
        await channel.assertQueue(STATUS_QUEUE, { durable: true });

        console.log('Conexão com RabbitMQ estabelecida com sucesso.');
        return channel;
    } catch (error) {
        console.error('Falha na conexão com RabbitMQ:', error.message);
        throw error;
    }
}


async function publishToInput(message) {
    const ch = await connect();
    return ch.sendToQueue(INPUT_QUEUE, Buffer.from(JSON.stringify(message)), { persistent: true });
}


async function publishStatus(message) {
    const ch = await connect();
    return ch.sendToQueue(STATUS_QUEUE, Buffer.from(JSON.stringify(message)), { persistent: true });
}


module.exports = { connect, publishToInput, publishStatus, INPUT_QUEUE, STATUS_QUEUE };