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
import PostPage from "./pages/PostPage.tsx";

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
                    <Route path="/" element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/home" element={<Navigate to="/" replace />} />

                    {/* Feature Pages */}
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
                    <Route path="/your-work" element={
                        <ProtectedRoute>
                            <YourWork />
                        </ProtectedRoute>
                    } />
                    <Route path="/others-work" element={
                        <ProtectedRoute>
                            <OthersWork />
                        </ProtectedRoute>
                    } />

                    {/* NEW: Post Review Page */}
                    <Route path="/post/:postId" element={
                        <ProtectedRoute>
                            <PostPage />
                        </ProtectedRoute>
                    } />

                    {/* Auth Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;