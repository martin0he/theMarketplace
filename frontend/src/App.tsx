import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./auth/AuthProvider";
import Navbar from "./components/Navbar";
import Masthead from "./components/Masthead";
import SellPage from "./pages/SellPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
        <Masthead />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
