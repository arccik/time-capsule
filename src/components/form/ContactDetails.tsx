import type { FormProps } from "~/types/formProps";
import Card from "../ui/FormCard";

export default function ContactDetails({
  register,
  errors,
}: Pick<FormProps, "register" | "errors">) {
  return (
    <>
      <Card
        title="Contact Details"
        subtitle="Enter details where you want to message be delivered"
        errors={errors}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs text-slate-400">
              Email Address
            </span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="example@mail.com"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs text-slate-400">
              Phone Number
            </span>
          </label>
          <input
            {...register("phone")}
            type="text"
            placeholder="+44 799999999"
            className="input input-bordered w-full"
          />
        </div>
      </Card>
    </>
  );
}
