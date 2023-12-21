import { Route, Routes } from "react-router-dom";
import RegisterForm from "./layouts/register";
import LoginForm from "./layouts/login";
import Home from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
