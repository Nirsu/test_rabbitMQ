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
        const queue_name = 'Task_Queue'
        channel.assertQueue(queue_name, {durable: true});
        //Step 4: Receive Messages
        console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue_name);
        channel.consume(queue_name, (msg) => {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(`Message Received: ${msg.content.toString()}`);
            setTimeout(function() {
                console.log(`${queue_name} Done`);
            }, secs * 1000);
        }, {
            noAck: true
        })
    })
})