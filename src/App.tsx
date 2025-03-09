import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "sonner";
import ApplicationContainer from "./components/ApplicationContainer/ApplicationContainer";
import { CategoryCreationContainer } from "./components/Categories/CategoryCreationContainer";
import ArchiveTabs from "./components/Archive/ArchiveTabs";
import { MovieDetail } from "./components/MovieDetail/MovieDetail";
import LoginPage from "./components/Login/LoginPage";
import { PersonalStatistics } from "./components/Statistics/PersonalStatistics";
import { TooltipProvider } from "./components/ui/tooltip";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#e92f6c",
    },
    secondary: {
      main: "#000", // Set your desired secondary color
    },
  },
});

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <TooltipProvider>
          <Toaster position="bottom-right" />
          <ThemeProvider theme={theme}>
            <div className="App">
              <Navbar />

              <Routes>
                <Route path="/home" element={<ApplicationContainer />}></Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/archive" element={<ArchiveTabs />} />
                <Route path="/statistics" element={<PersonalStatistics />} />
                <Route path="/movie/:slug" element={<MovieDetail />} />
                <Route
                  path="/createCategories"
                  element={<CategoryCreationContainer />}
                />
                <Route path="*" element={<Navigate to="/home" />}></Route>
              </Routes>
            </div>
          </ThemeProvider>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
