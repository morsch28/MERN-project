import Layout from "./components/Layout";

import "./App.css";
import { useAuth } from "./context/auth.context";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
