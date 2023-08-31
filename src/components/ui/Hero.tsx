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
        <h1 className="inline-block rounded-xl p-2 text-center text-white drop-shadow-md ">
          Next Public Message will Open in
        </h1>
        <CountDown />
      </div>
    </div>
  );
}
