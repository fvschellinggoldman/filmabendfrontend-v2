import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { Toaster } from "sonner";
import ApplicationContainer from "./components/ApplicationContainer/ApplicationContainer";
import { CategoryCreationContainer } from "./components/Categories/CategoryCreationContainer";
import { MovieDetail } from "./components/MovieDetail/MovieDetail";
import LoginPage from "./components/Login/LoginPage";
import { PersonalStatistics } from "./components/Statistics/PersonalStatistics";
import { TooltipProvider } from "./components/ui/tooltip";
import { MovieArchive } from "./components/Archive/MovieArchive/MovieArchive";
import { EventArchive } from "./components/Archive/EventArchive";
import CategoryArchive from "./components/Archive/CategoryArchive";

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
              <Route path="/archive" element={<MovieArchive />} />
              <Route path="/archive/movie" element={<MovieArchive />} />
              <Route path="/archive/event" element={<EventArchive />} />
              <Route path="/archive/category" element={<CategoryArchive />} />
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
