const client = require("twilio")(accountSid, authToken);
client.messages
  .create({
    body: "Hello from Twilio",
    from: "+447360265035",
    to: "+447943259694",
  })
  .then((message: any) => console.log(message.sid));
