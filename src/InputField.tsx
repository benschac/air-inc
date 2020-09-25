import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const Input: React.FC<InputFieldProps> = ({ size: _, label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <>
      <input id={field.name} {...field} {...props}></input>
      {error ? <div>{error}</div> : null}
    </>
  );
};

export default Input;
