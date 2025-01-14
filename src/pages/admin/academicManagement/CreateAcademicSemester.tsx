import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const numOptions = [
    { value: "Autumn", label: "Autumn" },
    { value: "Sammar", label: "Sammar" },
    { value: "Fall", label: "Fall" },
  ];
  return (
    <Flex justify="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect label="Name" name="name" options={numOptions} />

          <Button htmlType="submit">Login</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
