import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { Toaster } from "sonner";
import ApplicationContainer from "./components/ApplicationContainer/ApplicationContainer";
import { CategoryCreationContainer } from "./components/Categories/CategoryCreationContainer";
import ArchiveTabs from "./components/Archive/ArchiveTabs";
import { MovieDetail } from "./components/MovieDetail/MovieDetail";
import LoginPage from "./components/Login/LoginPage";
import { PersonalStatistics } from "./components/Statistics/PersonalStatistics";
import { TooltipProvider } from "./components/ui/tooltip";

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
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
