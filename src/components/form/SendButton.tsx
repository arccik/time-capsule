import { useSession } from "next-auth/react";


type Props = {
  disabled: boolean;
};

export default function SendButton({ disabled }: Props) {
  const { status } = useSession();

  return (
    <div className="mt-10 grid grid-flow-col">
      {status === "authenticated" ? (
        <div>
          <button
            type="submit"
            disabled={disabled}
            className="btn-[#88E0D0] btn w-full md:btn-primary"
          >
            Send to the Future
          </button>
        </div>
      ) : (
        <button className="btn w-full bg-[#88E0D0] md:btn-primary">
          Sign in to send the message
        </button>
      )}
    </div>
  );
}
