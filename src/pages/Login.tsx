import { Button, Row } from "antd";
import { useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUserLogin } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "kakonray2000",
  //   },
  // });

  const [login] = useLoginMutation();
  // const [login, { data, error }] = useLoginMutation();

  const onSubmit = async (userData: TUserLogin) => {
    const tostId = toast.loading("Logging in");
    try {
      const res = await login(userData).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success(res?.message, { id: tostId });
      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "An unexpected error occurred";

      toast.error(errorMessage, { id: tostId });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <PhInput type="text" name="id" label="ID: " />

        <PhInput type="text" name="password" label="Password: " />

        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
