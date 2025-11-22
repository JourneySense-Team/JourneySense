import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    // Shared Styles (Matches Login/Register)
    const inputClasses = "w-full py-3 border-round-xl bg-gray-800 border-1 border-gray-700 text-white shadow-input focus:border-primary transition-colors";
    const inputStyles = { paddingLeft: '3rem' };
    const iconStyle: React.CSSProperties = { left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2, fontSize: '1.2rem', position: 'absolute' };

    return (
        <div className="flex flex-column md:flex-row h-screen w-full overflow-hidden bg-gray-900">

            {/* LEFT SIDE - Branding (Updated to match Login Page "Fade") */}
            <div className="hidden md:flex md:w-7 flex-column justify-content-center align-items-center relative"
                 style={{
                     // EXACT Radial Gradient from Login Page
                     background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)',
                 }}>

                {/* Background Overlay Effect */}
                <div style={{
                    position: 'absolute', width: '100%', height: '100%',
                    background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)'
                }}></div>

                <div className="z-1 text-center px-6">
                    <div className="mb-5 inline-flex align-items-center justify-content-center border-circle shadow-4"
                         style={{ width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                        <i className="pi pi-lock text-5xl text-primary"></i> {/* Changed to primary color to match Login icon style */}
                    </div>
                    <h1 className="text-5xl font-bold mb-3 text-white">Password Recovery</h1>
                    <p className="text-xl text-gray-400 line-height-3 max-w-30rem mx-auto">
                        Don't worry, it happens to the best of us. Follow the steps to restore access to your hub.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="w-full md:w-5 flex align-items-center justify-content-center relative p-4">
                <div className="w-full max-w-26rem">

                    {/* Back Button */}
                    <Button
                        icon="pi pi-arrow-left"
                        label="Back to Login"
                        className="p-button-text p-button-plain pl-0 mb-5 text-gray-400 hover:text-white"
                        onClick={() => navigate('/login')}
                    />

                    <div className="mb-5 text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
                        <p className="text-gray-400 line-height-3">
                            {!submitted
                                ? "No worries, we'll send you reset instructions."
                                : "Check your email for the next steps."}
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-column gap-4 p-fluid">
                            <div className="field mb-0">
                                <label htmlFor="email" className="block text-gray-300 font-medium mb-2 text-center">Email Address</label>
                                <div className="relative w-full">
                                    <i className="pi pi-envelope absolute text-gray-400" style={iconStyle}></i>
                                    <InputText
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className={inputClasses}
                                        style={inputStyles}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                label={loading ? "Sending..." : "Send Reset Link"}
                                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-send"}
                                className="w-full p-3 text-lg font-bold border-round-xl btn-gradient shadow-lg transition-transform transition-duration-200 hover:scale-105 mt-2"
                                disabled={loading}
                            />
                        </form>
                    ) : (
                        // Success State
                        <div className="text-center animation-fade-in">
                            <div className="mb-4 inline-flex align-items-center justify-content-center border-circle"
                                 style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)' }}>
                                <i className="pi pi-check text-4xl text-green-500"></i>
                            </div>
                            <p className="text-gray-300 mb-4">
                                We sent a password reset link to <br/>
                                <span className="font-bold text-white">{email}</span>
                            </p>
                            <Button
                                label="Open Email App"
                                className="p-button-outlined p-button-secondary border-round-xl w-full mb-3 text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700"
                                onClick={() => window.open('mailto:')}
                            />
                            <div className="text-sm text-gray-500">
                                Didn't receive the email? <span className="text-primary cursor-pointer hover:underline" onClick={() => setSubmitted(false)}>Click to resend</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}