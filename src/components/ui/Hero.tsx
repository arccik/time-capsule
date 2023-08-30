import CountDown from "./CountDown";

export default function Hero() {
  return (
    <div className="grid grid-flow-row grid-cols-1 p-4 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-bold text-white  md:mt-5 md:text-5xl">
          Message To The Future
        </h1>
        <p className="italic text-base-300">
          Connecting Hearts, Inspiring Minds
        </p>
      </div>
      <div className="m-5 mx-auto">
        <h1 className="mb-2 inline-block rotate-2  rounded border p-2 text-center text-white md:mb-0 md:bg-secondary">
          Next Public Message open in
        </h1>
        <CountDown />
      </div>
    </div>
  );
}
