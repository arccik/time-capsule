import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-2">
      <main className="background-gradient mt-20 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        {/* <span className="mb-5 rounded-lg border border-primary px-4 py-2 text-sm text-gray-400 transition duration-300 ease-in-out">
          <span className="text-blue-600"> Message To The Future</span>
        </span> */}
        <h1 className="font-display mx-auto max-w-4xl text-3xl font-bold tracking-normal text-gray-300 md:text-5xl">
          Craft Your
          <span className="relative whitespace-nowrap text-primary">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-primary/60"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">Timeless </span>
          </span>
          Memories!
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg leading-7  text-gray-500 sm:text-gray-400">
          Embrace the power of the Digital Time Capsule, where you can store
          your cherished memories in the form of messages, photos, and audio
          files. Set a date range, and we`ll send your time capsule right when
          the future-you least expects it!
        </h2>
        <Link className="btn-primary btn mt-8" href="/new">
          Craft your digital capsule
        </Link>
        <div className="mt-6 flex w-full flex-col items-center justify-between sm:mt-10">
          <div className="mb-16 mt-4 flex flex-col space-y-10">
            <div className="flex flex-col sm:flex-row sm:space-x-8">
              <div>
                <h3 className="mb-1 text-lg font-medium">
                  Messages, Photos, Audio: Your Memories Preserved
                </h3>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-7  text-gray-500 sm:text-gray-400">
                  Write heartfelt messages, upload captivating photos, and
                  record unforgettable sound bites. The Digital Time Capsule
                  will preserve your memories for future enjoyment.
                </p>
              </div>
              <div className="mt-8 sm:mt-0">
                <h3 className="mb-1 text-lg font-medium">
                  Choose When Your Time Capsule Arrives!
                </h3>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-7  text-gray-500 sm:text-gray-400">
                  Select your desired date range using our intuitive date
                  picker, and let the suspense build! The joy of rediscovering
                  your memories is just a few clicks away
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-0">
          <h3 className="mb-1 text-lg font-medium">
            Choose How Your Time Capsule Arrives!
          </h3>
          <div className="markdown light prose w-full break-words text-left dark:prose-invert">
            <ol>
              <li>
                <p className="font-bold">Email Delivery:</p>
                <ul>
                  <li>
                    Provide your email address during the time capsule setup.
                  </li>
                  <li>
                    When the time comes, you will receive an email containing
                    your time capsule.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold">SMS Delivery:</p>
                <ul>
                  <li>
                    Enter your phone number and select SMS delivery as the
                    preferred method.
                  </li>
                  <li>
                    At the designated time, you will receive a text message with
                    a link to access your time capsule.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold">Call Delivery (with audio):</p>
                <ul>
                  <li>
                    If you wish to include an audio recording in your time
                    capsule, make sure to attach it while setting up.
                  </li>
                  <li>Choose call delivery as the preferred method.</li>
                  <li>
                    At the scheduled time, you will receive a phone call where
                    you can listen to your recorded audio message.
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-bold">WhatsApp Delivery:</p>
                <ul>
                  <li>
                    Provide your WhatsApp number during the setup process.
                  </li>
                  <li>
                    When it`s time to open the time capsule, you will receive a
                    WhatsApp message with a link to access it.
                  </li>
                </ul>
              </li>
            </ol>
            <p className="font-bold">
              Remember to specify your preferred delivery method when setting up
              your time capsule to ensure it arrives in the way you prefer.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
