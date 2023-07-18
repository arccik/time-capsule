import type { Capsule } from "~/types/capsule";
import type {
  FieldError,
  Merge,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

export type FormProps = {
  register: UseFormRegister<Capsule>;
  unregister: UseFormUnregister<Capsule>;
  setValue: UseFormSetValue<Capsule>;
  getValue: UseFormGetValues<Capsule>;
  errors: Merge<FieldError, FieldError | undefined> | undefined;
  clearErrors: UseFormClearErrors<Capsule>;
};
