import amqplib from "amqplib";

let channel;
const exchangeKey = "notificationExchange";
const queueKey = "notificationQueue";
const routeKey = "notification.route";

const startNotificationProducer = async () => {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertExchange(exchangeKey, "direct");
        await channel.assertQueue(queueKey);
        await channel.bindQueue(queueKey, exchangeKey, routeKey);
    } catch (error) {
        console.log(`An error occured while starting notification producer ${error}`);
    }
}

const sendNotification = (data) => {
    try {
        channel.publish(exchangeKey, routeKey, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(`An error occured while sending notification ${error}`);
    }
}

export {
    startNotificationProducer,
    sendNotification,
}