// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import { Twilio } from "twilio";
const twilioClient = new Twilio(accountSid, authToken);

twilioClient.calls
  .create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: "+14155551212",
    from: "+15017122661",
  })
  .then((call) => console.log(call.sid))
  .catch((e) => console.error(e));
