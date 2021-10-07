const express = require("express");
const app = express();
const amqp = require("amqplib");
var channel, connection;

const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");
  } catch (error) {
    console.log(error);
  }
};

connect();

app.get("/send", async (req, res) => {
  const data = {
    name: "Elon Musk",
    company: "SpaceX",
  };

  await channel.sendToQueue("rabbit", Buffer.from(JSON.stringify(data)));
  // await channel.close();
  // await connection.close();
  return res.send("done");
});

app.listen(5001, () => {
  console.log("Server at 5001");
});
