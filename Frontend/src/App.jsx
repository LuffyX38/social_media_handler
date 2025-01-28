
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "./components/Context/Context.jsx";
// import './App.css'
import Header from "./components/PageComponents/Header.jsx"
// import Home from "./components/Home";

function App() {


  return (
    <AuthProvider>
      <Header />
      <div className="isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
        <div className="mx-auto mt-2 max-w-xl sm:mt-2">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App
