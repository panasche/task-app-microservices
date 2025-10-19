import amqp from 'amqplib'

let channel, connection
export async function connectRabbitMqWithRetry(retries = 5, delay = 3000) {
	while(retries) {
		try {
			connection = await amqp.connect("amqp://rabbitmq")
			channel = await connection.createChannel()
			await channel.assertQueue("task_created")
			console.log("Connected to RabbitMQ")
		} catch(err) {
			console.error("RabbitMQ connection error: ", err.message);
			retries--
			console.error("Retrying again: ", retries);
			await new Promise(res => setTimeout(res, delay))
		}
	}
}

export {channel}