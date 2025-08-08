import { Toaster } from "react-hot-toast";
import "./App.css";
import Display from "./Display";
import MetaTags from "./components/MetaTags";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <MetaTags />
      <Display />
    </div>
  );
}

export default App;
