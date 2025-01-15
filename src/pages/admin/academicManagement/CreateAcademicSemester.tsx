import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { nameOptions } from "../../../constants/semester";

const currentYear = new Date().getFullYear();

const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data.name) - 1].label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
    };

    console.log(semesterData);
  };

  return (
    <Flex justify="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect label="Name" name="name" options={nameOptions} />
          <PhSelect label="Year" name="year" options={yearOptions} />
          <PhSelect label="Name" name="name" options={nameOptions} />
          <PhSelect label="Name" name="name" options={nameOptions} />

          <Button htmlType="submit">Login</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
