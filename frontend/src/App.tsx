import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import YourWork from "./pages/yourWork/YourWork.tsx";
import OthersWork from "./pages/OthersWork.tsx";
import "primeicons/primeicons.css";
import "./App.css";
// Pages
import HomePage from "./pages/HomePage.tsx";
import Hubs from './pages/Hubs/Hubs.tsx';
import Hub from './pages/Hub/Hub.tsx';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

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
                    <Route path="/your-work" element={<YourWork />} />
                    <Route path="/others-work" element={<OthersWork />} />

                    {/* Auth Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Protected Routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    <Route path="/hubs" element={
                        <ProtectedRoute>
                            <Hubs />
                        </ProtectedRoute>
                    } />

                    <Route path="/hub/:id" element={
                        <ProtectedRoute>
                            <Hub />
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;