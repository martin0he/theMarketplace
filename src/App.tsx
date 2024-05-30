// src/App.tsx
import React, { useContext } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider } from "./auth/AuthProvider";
import SellPage from "./pages/SellPage";
import "bootstrap/dist/css/bootstrap.min.css";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import Masthead from "./components/navigation/Masthead";
import Navbar from "./components/navigation/Navbar";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import { GlobalStyles } from "@mui/system";
import ListingsPage from "./pages/ListingsPage";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Masthead />
    </>
  );
};

const AppContent: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const muiTheme = createTheme({
    palette: {
      customColors: {
        royalBlue: theme.royalBlue,
        celestialBlue: theme.celestialBlue,
        ghostWhite: theme.ghostWhite,
        cerise: theme.cerise,
        smallListing: theme.smallListing,
        inputBG: theme.inputBG,
        turquoise: theme.turquoise,
        listBoxBG1: theme.listBoxBG1,
        listBoxBG2: theme.listBoxBG2,
        priceSticker: theme.priceSticker,
        soldSticker: theme.soldSticker,
        submitButton: theme.submitButton,
        bodyBG: theme.bodyBG,
      },
    },
    typography: {
      fontFamily: "Josefin Sans",
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: muiTheme.palette.customColors.bodyBG,
          },
          "&::-webkit-scrollbar": {
            height: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "2px",
            backgroundColor: muiTheme.palette.customColors.bodyBG,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: muiTheme.palette.customColors.celestialBlue,
            borderRadius: "2px",
            "&:hover": {
              backgroundColor: muiTheme.palette.customColors.royalBlue,
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
