import amqplib from "amqplib";

const queueKey = "mailQueue";
const consumeMail = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        channel.consume(queueKey, (message) => {
            console.log(message.content.toString());
            channel.ack(message);
        })

    } catch (error) {
        console.log(`An error occured ${error}`);
    }
}
consumeMail();