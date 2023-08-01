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
            className="btn-primary btn w-full"
          >
            Send to the Future
            <span className="badge-primary badge ml-4 text-base-100">£3</span>
          </button>
        </div>
      ) : (
        <button className="btn-primary btn w-full">
          Sign in to send the message
        </button>
      )}
    </div>
  );
}
