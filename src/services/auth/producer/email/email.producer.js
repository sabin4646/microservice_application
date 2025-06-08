import amqplib from "amqplib";

const exchangeKey = "mailExchange";
const queueKey = "mailQueue";
const routeKey = "mail.route";
let channel;

const startEmailProducer = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertExchange(exchangeKey, "direct");
        await channel.assertQueue(queueKey);
        await channel.bindQueue(queueKey, exchangeKey, routeKey);
    } catch (error) {
        console.log(`An error occured ${error}`);
    }
}

const sendMail = (data) => {
    try {
        const success = channel.publish(exchangeKey, routeKey, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(`An error occured while publishing a data ${error.message}`);
    }
}


export {
    startEmailProducer,
    sendMail,
}