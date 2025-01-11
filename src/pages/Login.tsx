import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUserLogin } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "adminSecurePass123",
    },
  });
  const [login] = useLoginMutation();
  // const [login, { data, error }] = useLoginMutation();

  const onSubmit = async (userData: TUserLogin) => {
    const res = await login(userData).unwrap();
    const user = verifyToken(res?.data?.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="id">Id:</label>
          <input type="text" id="id" {...register("id")} />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" {...register("password")} />
        </div>

        <Button htmlType="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
