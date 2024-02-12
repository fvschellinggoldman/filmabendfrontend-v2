import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Toaster } from "sonner";
import ApplicationContainer from "./components/ApplicationContainer/ApplicationContainer";
import { CategoryCreationContainer } from "./components/Categories/CategoryCreationContainer";
import ArchiveTabs from "./components/Archive/ArchiveTabs";

// Create a custom theme
const theme = createTheme({
  palette: {
    secondary: {
      main: "#000", // Set your desired secondary color
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" />
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Navbar></Navbar>

            <Routes>
              <Route path="/home" element={<ApplicationContainer />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/archive" element={<ArchiveTabs />} />
              <Route
                path="/createCategories"
                element={<CategoryCreationContainer />}
              />
              <Route path="*" element={<Navigate to="/home" />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
