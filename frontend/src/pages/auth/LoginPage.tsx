import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { AuthService } from "../../services/AuthService";

export default function LoginPage() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.username.trim() || !formData.password.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter both username and password',
                life: 3000
            });
            return;
        }

        setLoading(true);

        try {
            // Call the actual AuthService login method
            const response = await AuthService.login({
                usernameOrEmail: formData.username,
                password: formData.password
            });

            // Show success message
            toast.current?.show({
                severity: 'success',
                summary: 'Login Successful',
                detail: `Welcome back, ${response.username}!`,
                life: 2000
            });

            // Navigate to home after short delay
            setTimeout(() => {
                navigate("/home");
            }, 500);

        } catch (error) {
            console.error('Login error:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Login Failed',
                detail: error instanceof Error ? error.message : 'Invalid credentials',
                life: 4000
            });
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full py-3 border-round-xl bg-gray-800 border-1 border-gray-700 text-white shadow-input focus:border-primary";
    const inputStyles = { paddingLeft: '3rem' };
    const iconStyle = { left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2, fontSize: '1.2rem' };

    return (
        <>
            <Toast ref={toast} />
            <div className="flex flex-column md:flex-row h-screen w-full overflow-hidden bg-gray-900">

                {/* LEFT SIDE - Branding */}
                <div className="hidden md:flex md:w-7 flex-column justify-content-center align-items-center relative"
                     style={{
                         background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)',
                     }}>
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)'
                    }}></div>

                    <div className="z-1 text-center px-6">
                        <div className="mb-6 inline-flex align-items-center justify-content-center border-circle shadow-4"
                             style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                            <i className="pi pi-compass text-6xl text-primary"></i>
                        </div>
                        <h1 className="text-5xl font-bold mb-3 text-white">CoReview</h1>
                        <p className="text-xl text-gray-400 line-height-3 max-w-30rem mx-auto">
                            Your collaborative hub for peer reviews, skill sharing, and academic growth.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - Form */}
                <div className="w-full md:w-5 flex align-items-center justify-content-center relative">
                    <div className="w-full max-w-26rem px-4">
                        <div className="mb-5 text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-gray-400">Please sign in to your hub.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-column gap-4 p-fluid">

                            <div className="field mb-0">
                                <label htmlFor="username" className="block text-gray-300 font-medium mb-2 text-center">Username</label>
                                <div className="relative w-full">
                                    <i className="pi pi-user absolute text-gray-400" style={iconStyle}></i>
                                    <InputText
                                        id="username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        placeholder="Enter username"
                                        className={inputClasses}
                                        style={inputStyles}
                                    />
                                </div>
                            </div>

                            <div className="field mb-0">
                                <div className="flex align-items-center justify-content-center relative mb-2">
                                    <label htmlFor="password" className="block text-gray-300 font-medium">Password</label>
                                    <span
                                        className="text-sm text-primary cursor-pointer hover:text-white transition-colors absolute right-0"
                                        onClick={() => navigate('/forgot-password')}
                                    >
                                        Forgot?
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <i className="pi pi-lock absolute text-gray-400" style={iconStyle}></i>
                                    <Password
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        toggleMask
                                        feedback={false}
                                        className="w-full"
                                        inputClassName={inputClasses}
                                        inputStyle={inputStyles}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                label={loading ? "Authenticating..." : "Sign In"}
                                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-right"}
                                className="w-full p-3 text-lg font-bold border-round-xl btn-gradient transition-all transition-duration-200 hover:shadow-lg mt-2"
                                disabled={loading}
                            />
                        </form>

                        <Divider className="my-5 bg-gray-700" />

                        <div className="text-center">
                            <p className="text-gray-400 mb-3">New to CoReview?</p>
                            <Button
                                label="Create an Account"
                                className="p-button-outlined p-button-secondary w-full border-round-xl p-3 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-600"
                                onClick={() => navigate('/register')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}