import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import YourWork from "./pages/yourWork/YourWork.tsx";
import OthersWork from "./pages/othersWork/OthersWork.tsx";
import "primeicons/primeicons.css";
import "./App.css";
// Pages
import HomePage from './pages/homepage/HomePage.tsx';
import Hubs from './pages/hubs/Hubs.tsx';
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ReviewPage from './pages/review/ReviewPage.tsx';
import Hub from './pages/hub/Hub.tsx';
import PostPage from './pages/postsPage/PostPage.tsx';


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
                    {/* Auth Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reviews" element={<ReviewPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hubs"
                        element={
                            <ProtectedRoute>
                                <Hubs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hub/:id"
                        element={
                            <ProtectedRoute>
                                <Hub />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/your-work"
                        element={
                            <ProtectedRoute>
                                <YourWork />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/others-work"
                        element={
                            <ProtectedRoute>
                                <OthersWork />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/post/:postId"
                        element={
                            <ProtectedRoute>
                                <PostPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback and Redirects */}
                    <Route path="/home" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;