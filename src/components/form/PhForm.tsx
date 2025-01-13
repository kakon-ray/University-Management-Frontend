import { FormProvider, useForm } from "react-hook-form";

const PhForm = ({ onSubmit, children }) => {
  const method = useForm();

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PhForm;
