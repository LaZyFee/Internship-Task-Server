import { Helmet } from "react-helmet";
import Loader from "../Shared/Loader";

function HelpCenter() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Help Center | Internship Task</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-900">coming soon</h1>
        <Loader />
      </div>
    </div>
  );
}

export default HelpCenter;