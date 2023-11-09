import "./App.css";
import VotingPage from "./components/VotingPage/VotingPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navbar />}>
              <Route path="home" element={<VotingPage />} />
              {/* <Route path="Archive" element={<Archive />} />
            <Route path="Ranking" element={<Ranking />} /> */}
              <Route path="*" element={<Navigate to="home" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
