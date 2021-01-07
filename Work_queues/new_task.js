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
        const message = process.argv.slice(2).join(' ') || 'Hello from Task_Queue'
        channel.assertQueue(queue_name, {durable: true});
        //Step 4: Send Message to Queue
        channel.sendToQueue(queue_name, Buffer.from(message), {persistent: true});
        console.log(`Message send on ${queue_name} -> ${message}`);
    })
    setTimeout(function() {
        connection.close();
        process.exit(0)
    }, 500);
})