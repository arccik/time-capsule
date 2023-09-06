import { env } from "~/env.mjs";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
      <div className=" w-full items-center py-2  md:w-2/3 ">
        <div className="border-3  rounded-lg bg-slate-100 p-6 pt-4 shadow-lg ">
          <p>
            <strong>MessageTTF Website Terms and Conditions</strong>
          </p>
          <p>
            <strong>Last Updated: September 6, 2023</strong>
          </p>
          <p>
            Welcome to MessageTTF (Message to the Future), a platform that
            allows you to send messages, images, and audio recordings to
            yourself, relatives, friends, or family members. Please carefully
            read and understand the following Terms and Conditions, as they
            govern your use of the MessageTTF website and services. By accessing
            or using MessageTTF, you agree to abide by these terms.
          </p>
          <p>
            <strong>1. User Account</strong>
          </p>
          <p>
            1.1 You must sign in or create an account to use the MessageTTF
            services.
          </p>
          <p>
            1.2 You are responsible for maintaining the confidentiality of your
            account credentials, including your email.
          </p>
          <p>
            1.3 You agree to provide accurate and up-to-date information during
            the registration process and to promptly update any changes to your
            information.
          </p>
          <p>
            1.4 MessageTTF reserves the right to suspend or terminate your
            account if you violate these Terms and Conditions or if we believe
            your actions are harmful to other users or the platform itself.
          </p>
          <p>
            <strong>2. Sending Messages</strong>
          </p>
          <p>
            2.1 You may use the MessageTTF platform to create and send messages
            to yourself or other recipients.
          </p>
          <p>
            2.2 To send a message, you will be required to provide the following
            information:
          </p>
          <ul>
            <li>Message Content</li>
            <li>Subject</li>
            <li>Recipient&#39;s Phone Number</li>
            <li>Recipient&#39;s Email Address</li>
            <li>Delivery Date</li>
            <li>Delivery Method (e.g., email, SMS, or physical mail)</li>
          </ul>
          <p>
            2.3 You may also have the option to upload images and record audio
            messages for inclusion in your message.
          </p>
          <p>
            <strong>3. Message Content</strong>
          </p>
          <p>
            3.1 You are solely responsible for the content of your messages.
          </p>
          <p>
            3.2 You must not send messages that violate our content guidelines
            or contain inappropriate, offensive, or illegal content. MessageTTF
            reserves the right to delete any message that does not comply with
            our policies.
          </p>
          <p>
            <strong>4. Service Fee</strong>
          </p>
          <p>
            4.1 MessageTTF charges a fee of £1.99 for each message sent using
            our platform.
          </p>
          <p>
            4.2 Payment for the service must be made using the available payment
            methods on the website.
          </p>
          <p>
            <strong>5. Delivery</strong>
          </p>
          <p>
            5.1 MessageTTF will make reasonable efforts to deliver your messages
            on the specified delivery date and using the chosen delivery method.
          </p>
          <p>
            5.2 However, we do not guarantee the exact timing or successful
            delivery of messages, as delivery may be subject to factors beyond
            our control, such as network issues, recipient availability, and
            technical limitations.
          </p>
          <p>
            <strong>6. Privacy</strong>
          </p>
          <p>
            6.1 MessageTTF takes your privacy seriously. We collect, store, and
            process personal information in accordance with our Privacy Policy,
            which you can review on our website.
          </p>
          <p>
            <strong>7. Intellectual Property</strong>
          </p>
          <p>
            7.1 You retain ownership of the content you submit to MessageTTF.
          </p>
          <p>
            7.2 By using our services, you grant MessageTTF a non-exclusive,
            worldwide, royalty-free license to use, modify, reproduce, and
            distribute your content for the purpose of delivering your messages.
          </p>
          <p>
            <strong>8. Termination</strong>
          </p>
          <p>
            8.1 You may terminate your account at any time by contacting our
            customer support.
          </p>
          <p>
            8.2 MessageTTF reserves the right to terminate your account and
            access to our services at our discretion, without notice, if you
            violate these Terms and Conditions.
          </p>
          <p>
            <strong>9. Modifications to Terms</strong>
          </p>
          <p>
            9.1 MessageTTF may update or modify these Terms and Conditions at
            any time. Your continued use of our services after such changes
            constitutes your acceptance of the updated terms.
          </p>
          <p>
            <strong>10. Contact Us</strong>
          </p>
          <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please contact us through contact form
            <a
              className="btn-link ml-2"
              href={env.NEXT_PUBLIC_CLIENT_URL + "/contactus"}
            >
              Contact US
            </a>
          </p>
          <p>
            By using MessageTTF, you acknowledge that you have read, understood,
            and agree to these Terms and Conditions. If you do not agree with
            these terms, please do not use our services.
          </p>
        </div>
      </div>
    </main>
  );
}
