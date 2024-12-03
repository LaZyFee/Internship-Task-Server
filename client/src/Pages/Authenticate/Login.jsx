import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { Helmet } from "react-helmet";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { toast } from "react-hot-toast";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      await login(email, password);
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error logging in");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Helmet>
        <title>Login | Internship Task</title>
      </Helmet>
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <label className="label">
            <Link className="label-text" to="/forgot-password">
              Forget Password?
            </Link>
          </label>
          <div className="form-control my-6 items-center">
            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </PrimaryButton>
          </div>
          {error && <p className="text-red-600">{error}</p>}{" "}
          {/* Display error from Zustand */}
        </form>

        <p>
          New to Internship?{" "}
          <Link
            className="normal-case bg-text-gradient-2 bg-clip-text text-transparent"
            to="/signup"
          >
            Create new Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
