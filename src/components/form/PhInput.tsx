import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const PhInput = ({ type, name, label }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : ""}

      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PhInput;
