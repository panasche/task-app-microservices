import amqp from 'amqplib'

let channel, connection
export async function start() {
    try {
        connection = await amqp.connect("amqp://rabbitmq")
        channel = await connection.createChannel()
        await channel.assertQueue("task_created")
        console.log("Notification service listening to messages")

        channel.consume("task_created", (msg) => {
            const taskData = JSON.parse(msg.content.toString())
            console.log("Notification: New Task... ", taskData.title);
            channel.ack(msg)
        })
    } catch(err) {
        console.error("RabbitMQ connection error: ", err.message);
    }

}

start()