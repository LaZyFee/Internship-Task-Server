import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { PrimaryButton } from "../../Components/PrimaryButton";

const DisplayError = ({ message }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth(); // Accessing isAdmin from Zustand store

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mx-5">
      {isAdmin ? (
        <>
          <h1 className="text-4xl font-bold text-green-500">Welcome, Admin!</h1>
          <Link to="/dashboard">
            <PrimaryButton className="px-4 py-2 mt-4">
              Visit Dashboard
            </PrimaryButton>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-red-500">
            Sorry, You Are Not an Admin
          </h1>
          <p className="text-lg text-red-400 mt-4">
            {message || "Access denied"}
          </p>
          <div className="mt-4 flex gap-4">
            <PrimaryButton className="px-4 py-2" onClick={handleGoBack}>
              Go Back
            </PrimaryButton>
            <Link to="/login">
              <PrimaryButton className="px-4 py-2">
                Login as Admin
              </PrimaryButton>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayError;
