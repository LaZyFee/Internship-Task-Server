import { Helmet } from "react-helmet";
import Loader from "../Shared/Loader";

function Afilliate() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Afilliate | Internship Task</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-900">coming soon</h1>
        <Loader />
      </div>
    </div>
  );
}

export default Afilliate;
