import React, { ElementType } from "react";
import { Field } from "formik";
import { Form, FloatingLabel } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../../helpers";

interface INPUT {
  name: string;
  type?: string;
  label?: string;
  as?: ElementType;
  disableValidation?: boolean;
  [key: string]: string | any;
}

export const TextInput = ({ name, type, label, disableValidation, ...props }: INPUT) => {
  return (
    <>
      <Field name={name}>
        {({ field, meta }: any) => (
          <>
            {/* <FloatingLabel label={label || capitalizeFirstLetter(name)} className="mb-2"> */}
            <Form.Label>{label || capitalizeFirstLetter(name)} </Form.Label>
            <Form.Control
              type={type || `text`}
              isInvalid={!disableValidation && (meta.value || meta.touched) && meta.error}
              isValid={!disableValidation && (meta.value || meta.touched) && !meta.error}
              {...field}
              {...props}
            />
            {/* </FloatingLabel> */}
            {meta.touched && meta.error && <span className="text-danger">{meta.error}</span>}
          </>
        )}
      </Field>
    </>
  );
};
