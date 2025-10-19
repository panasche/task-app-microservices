import amqp from 'amqplib'

let channel, connection

async function connectRabbitMqWithRetry(retries = 5, delay = 3000) {
    while (retries) {
        try {
            connection = await amqp.connect("amqp://rabbitmq")
            channel = await connection.createChannel()
            await channel.assertQueue("task_created")
            console.log("Connected to RabbitMQ")
            return { connection, channel }
        } catch (err) {
            console.error("RabbitMQ connection error:", err.message)
            retries--
            if (!retries) throw new Error("Failed to connect to RabbitMQ after retries")
            console.log(`Retrying in ${delay / 1000}s... (${retries} retries left)`)
            await new Promise(res => setTimeout(res, delay))
        }
    }
}

export async function start() {
    try {
        const { channel } = await connectRabbitMqWithRetry()
        console.log("Notification service listening to messages...")

        channel.consume("task_created", (msg) => {
            if (msg !== null) {
            const taskData = JSON.parse(msg.content.toString())
            console.log("Notification: New Task ->", taskData.title)
            channel.ack(msg)
            }
        })
    } catch (err) {
        console.error("Failed to start notification consumer:", err.message)
    }
}

start()
