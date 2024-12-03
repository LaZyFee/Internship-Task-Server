import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { Helmet } from "react-helmet";
import PasswordStrengthMeter from "./PasswordStreantgMeter";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpError, setSignUPError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const handleSignUp = async (data) => {
    const { name, email, password } = data;

    try {
      await signup(email, password, name);
      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      setSignUPError(error.message || "Error signing up");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Helmet>
        <title>Signup | Internship Task</title>
      </Helmet>
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number, and special characters",
                },
              })}
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Capture the password input
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Render PasswordStrengthMeter only if password exists */}
          {password && <PasswordStrengthMeter password={password} />}

          {signUpError && <p className="text-red-500">{signUpError}</p>}

          <div className="form-control my-6 items-center">
            <PrimaryButton type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Create an account"}
            </PrimaryButton>
          </div>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            className="normal-case bg-text-gradient-2 bg-clip-text text-transparent"
            to="/login"
          >
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
