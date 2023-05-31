# Virtual Time Capsule

The Virtual Time Capsule project allows users to create and bury virtual time capsules, and receive notifications when the specified timeout period expires. It provides a platform for users to preserve memories, thoughts, and messages that can be shared with future generations.

## Features

- Create and customize virtual time capsules: Users can create their own time capsules, set a timeout period, and add various digital content such as photos, videos, documents, and messages.
- Burial location tracking: Users can specify the location where they "bury" their virtual time capsule, providing an additional layer of personalization.
- Notification system: Users will receive notifications via email or other communication channels when the timeout period for their time capsule expires.
- Secure authentication: The project uses Next.js with NextAuth for authentication, ensuring secure user registration and login processes.
- Database integration: The project integrates with a specified database using the provided `DATABASE_URL` environment variable to store user information and time capsule details.

## Prerequisites

To run the Virtual Time Capsule project locally, you will need the following environment variables set in a `.env` file or your preferred environment configuration:

- `DATABASE_URL`: The URL for connecting to your chosen database.
- `NEXTAUTH_SECRET`: A secret key used for securing authentication in NextAuth.
- `NEXTAUTH_URL`: The URL where your application will be hosted.
- `SMTP_USER`: The username or email address for the SMTP server used to send email notifications.
- `SMTP_PASSWORD`: The password for the SMTP server.
- `SMTP_HOST`: The SMTP server host.
- `SMTP_PORT`: The SMTP server port.
- `EMAIL_FROM`: The email address from which the notifications will be sent.
- `DISCORD_CLIENT_ID`: The client ID for Discord integration, if applicable.
- `DISCORD_CLIENT_SECRET`: The client secret for Discord integration, if applicable.
- `GOOGLE_CLIENT_ID`: The client ID for Google integration, if applicable.

## Installation and Usage

1. Clone the repository and navigate to the project directory.
2. Install dependencies by running `npm install`.
3. Set up the required environment variables by creating a `.env` file or configuring your preferred environment configuration.
4. Start the application using `npm run dev`.
5. Access the Virtual Time Capsule application by visiting the specified `NEXTAUTH_URL` in your browser.

