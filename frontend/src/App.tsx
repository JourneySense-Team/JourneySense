import "primeicons/primeicons.css";
import Hubs from './pages/Hubs/Hubs.tsx';
import Hub from './pages/Hub/Hub.tsx';
import './App.css'
import  HomePage from "./pages/HomePage.tsx"
// import {Header} from "./components/Header.tsx";
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";


function App() {

    return (
        <div>
            {/*<Header />*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/hubs" element={<Hubs />}></Route>
                    <Route path="/hub/:id" element={<Hub />}></Route>

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Add this line */}

                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App