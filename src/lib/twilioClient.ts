const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import { Twilio } from "twilio";

const twilioClient = new Twilio(accountSid, authToken);

export default twilioClient;
