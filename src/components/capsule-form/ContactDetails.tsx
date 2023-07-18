import type { FormProps } from "~/types/formProps";
import Card from "../layout/Card";

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
            <span className="label-text text-xs text-secondary">
              Email Address
            </span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="example@mail.com"
            className="input-bordered input w-full "
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs text-secondary">
              Phone Number
            </span>
          </label>
          <input
            {...register("phone")}
            type="text"
            placeholder="+44 799999999"
            className="input-bordered input w-full"
          />
        </div>
      </Card>
    </>
  );
}
