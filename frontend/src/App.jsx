import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Table from "./Pages/Table";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/table" element={<Table />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
