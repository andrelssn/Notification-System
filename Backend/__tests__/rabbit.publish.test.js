const amqplib = require('amqplib');
jest.mock('amqplib');


describe('publish', () => {
    it('should publish to input queue', async () => {
        const fakeChannel = { assertQueue: jest.fn(), sendToQueue: jest.fn(), createChannel: jest.fn() };
        amqplib.connect.mockResolvedValue({ createChannel: async () => fakeChannel });

        const rabbit = require('../src/rabbit');
        const res = await rabbit.publishToInput({ messageId: '1', messageContent: 'x' });

        expect(fakeChannel.sendToQueue).toHaveBeenCalled();
    });
});