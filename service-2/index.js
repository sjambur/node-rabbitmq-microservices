const express = require("express");
const app = express();
const amqp = require("amqplib");
var channel, connection;

const connect = async () => {
  try {
    const amqpserver = "amqp://localhost:5672";
    connection = await amqp.connect(amqpserver);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");

    channel.consume("rabbit", (data) => {
      console.log(`Received ${Buffer.from(data.content)}`);

      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();

app.listen(5002, () => {
  console.log("Server at 5002");
});
