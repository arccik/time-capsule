import { useSession } from "next-auth/react";

type Props = {
  disabled: boolean;
};

export default function SendButton({ disabled }: Props) {
  const { status } = useSession();

  return (
    <div className="grid grid-flow-col">
      {status === "authenticated" ? (
        <div>
          <button
            disabled={disabled}
            className="btn-secondary btn w-full"
            type="submit"
          >
            Send to the Future
          </button>
        </div>
      ) : (
        <button className="btn-secondary btn w-full">
          Sign in to send the message
        </button>
      )}
    </div>
  );
}
