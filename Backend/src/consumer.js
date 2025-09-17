const { connect, INPUT_QUEUE, publishStatus } = require('./rabbit');
const store = require('./store');


async function startConsumer() { // consumer that processes messages and publishes status
    const ch = await connect();

    await ch.consume(INPUT_QUEUE, async (msg) => {
        if (!msg) return;
        try {
            const data = JSON.parse(msg.content.toString());
            const { messageId, messageContent } = data;

            // mark as processing
            store.setStatus(messageId, 'PROCESSING');

            // simulate async processing 1-2s
            await new Promise(r => setTimeout(r, 1000 + Math.random() * 1000));

            const rand = Math.floor(Math.random() * 10) + 1;
            const status = rand <= 2 ? 'PROCESSING_FAILED' : 'PROCESSED_SUCCESS';

            store.setStatus(messageId, status);

            // publish status to another queue
            await publishStatus({ messageId, status });

            ch.ack(msg);
        } catch (err) {
            console.error('Consumer error', err);
            ch.nack(msg, false, false);
        }
    });
}


module.exports = { startConsumer };