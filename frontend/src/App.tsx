import "primeicons/primeicons.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage.tsx";
import Hubs from './pages/Hubs/Hubs.tsx';
import Hub from './pages/Hub/Hub.tsx';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Main Workflow */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    {/* Feature Pages */}
                    <Route path="/hubs" element={<Hubs />} />
                    <Route path="/hub/:id" element={<Hub />} />

                    {/* Auth Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;