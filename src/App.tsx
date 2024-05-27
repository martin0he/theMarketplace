// App.tsx
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider } from "./auth/AuthProvider";
import SellPage from "./pages/SellPage";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import Masthead from "./components/navigation/Masthead";
import Navbar from "./components/navigation/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Masthead />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="test" element={<TestPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="sell" element={<SellPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
