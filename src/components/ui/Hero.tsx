import CountDown from "./CountDown";

export default function Hero() {
  return (
    <div className="grid grid-flow-row grid-cols-1 p-4 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-bold text-white  md:mt-5 md:text-5xl">
          Message To The Future
        </h1>
        <p className="leading-5 text-base-300 md:w-96 md:p-1">
          Seal your thoughts and messages in your Time Capsule today, only to
          unveil and rediscover them in the future when the time is right
        </p>
      </div>
      <div className="mx-auto mt-5 ">
        <h1 className="inline-block rounded-xl pb-1 text-center font-thin text-white drop-shadow-md ">
          Next Public Message will be Open in
        </h1>
        <CountDown />
      </div>
    </div>
  );
}
