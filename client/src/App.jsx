import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
