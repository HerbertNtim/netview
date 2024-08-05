import { Route, Routes } from "react-router-dom";
import { LoginPage, SignUpPage } from "./pages";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
