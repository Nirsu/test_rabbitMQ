const amqp = require('amqplib/callback_api');

//Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    //Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        //Step 3: Create Assert Queue
        const queue_name = 'RabbitTEST'
        channel.assertQueue(queue_name);
        //Step 4: Receive Messages
        channel.consume(queue_name, (msg) => {
            console.log(`Message Received: ${msg.content.toString()}`);
        }, {
            noAck: true
        })
    })
})