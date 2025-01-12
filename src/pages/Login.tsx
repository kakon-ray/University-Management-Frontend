import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { TUserLogin } from "../types";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "kakonray2000",
    },
  });
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
