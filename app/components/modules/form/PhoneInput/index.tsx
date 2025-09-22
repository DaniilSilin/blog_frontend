import React, { ChangeEvent } from "react";
import { PhoneInput as BasePhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import Field from "./Field";

export interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string | undefined;
  defaultValue?: string;
  maxLength?: number;
  description?: any;
}

const countries = ["ru"];

export default function PhoneInput({
  label,
  description,
  value,
  onChange,
}: Props) {
  const phoneNumberHandleChange = React.useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <div>
      <Field label={label} description={description}>
        <BasePhoneInput
          defaultCountry="ru"
          value={value}
          onChange={(phone) => phoneNumberHandleChange(phone)}
          disableCountryGuess={true}
          disableDialCodePrefill={true}
        />
      </Field>
    </div>
  );
}
