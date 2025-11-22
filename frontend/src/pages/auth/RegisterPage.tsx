import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { AuthService } from "../../services/AuthService";
import type { RegisterRequest } from "../../services/AuthService";

// --- TYPES ---
type RoleOption = {
    label: string;
    value: "APPRENTICE" | "HUBMASTER" | "ADMIN";
    icon: string;
};

// --- HELPER COMPONENTS ---
const SectionHeader = ({ icon, title }: { icon: string, title: string }) => (
    <div className="col-12 mb-2 mt-1">
        <h3 className="text-white m-0 flex align-items-center justify-content-center text-lg font-semibold">
            <i className={`${icon} mr-2 text-white`}></i>
            {title}
        </h3>
        <div className="mt-2 h-1 border-round mx-auto"
             style={{
                 width: '80%',
                 background: 'linear-gradient(90deg, rgba(31, 41, 55, 0) 0%, var(--primary-color) 50%, rgba(31, 41, 55, 0) 100%)',
                 opacity: 0.5,
                 height: '2px'
             }}>
        </div>
    </div>
);

export default function RegisterPage() {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    // --- STATE ---
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "APPRENTICE" as "APPRENTICE" | "HUBMASTER" | "ADMIN",
    });

    const [loading, setLoading] = useState(false);

    // --- OPTIONS ---
    const roleOptions: RoleOption[] = [
        { label: "Apprentice (Student)", value: "APPRENTICE", icon: 'pi pi-book' },
        { label: "Hubmaster (Teacher)", value: "HUBMASTER", icon: 'pi pi-briefcase' },
        { label: "Administrator", value: "ADMIN", icon: 'pi pi-cog' },
    ];

    // --- STYLES ---
    const inputClasses = "w-full py-3 border-round-xl bg-gray-800 border-1 border-gray-700 text-white shadow-none focus:border-primary transition-colors";
    const inputStyles = { paddingLeft: '2.5rem' };
    const iconStyle: React.CSSProperties = { left: '0.75rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2, fontSize: '1rem', position: 'absolute' };

    // --- VALIDATION ---
    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter your first name',
                life: 3000
            });
            return false;
        }

        if (!formData.lastName.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter your last name',
                life: 3000
            });
            return false;
        }

        if (!formData.username.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter a username',
                life: 3000
            });
            return false;
        }

        if (!formData.email.trim() || !formData.email.includes('@')) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter a valid email address',
                life: 3000
            });
            return false;
        }

        if (!formData.password || formData.password.length < 6) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Password must be at least 6 characters long',
                life: 3000
            });
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Passwords do not match',
                life: 3000
            });
            return false;
        }

        // Validate ADMIN role requires @journeysense.com email
        if (formData.role === "ADMIN" && !formData.email.endsWith("@journeysense.com")) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Admin role requires a @journeysense.com email address',
                life: 4000
            });
            return false;
        }

        return true;
    };

    // --- HANDLERS ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const registerRequest: RegisterRequest = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };

            await AuthService.register(registerRequest);

            toast.current?.show({
                severity: 'success',
                summary: 'Registration Successful',
                detail: 'Account created! Redirecting to login...',
                life: 2000
            });

            // Redirect to login after success
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error('Registration error:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Registration Failed',
                detail: error instanceof Error ? error.message : 'Unable to create account. Please try again.',
                life: 4000
            });
        } finally {
            setLoading(false);
        }
    };

    const roleOptionTemplate = (option: RoleOption) => {
        return (
            <div className="flex align-items-center gap-2">
                <i className={option.icon + " text-primary"}></i>
                <span>{option.label}</span>
            </div>
        );
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="flex flex-column md:flex-row h-screen w-full bg-gray-900 overflow-hidden">

                {/* LEFT SIDE - Branding & Info */}
                <div className="hidden md:flex md:w-6 flex-column p-6 shadow-6 z-2 justify-content-between relative"
                     style={{
                         background: 'radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%)',
                         borderRight: '1px solid rgba(255,255,255,0.05)'
                     }}>

                    {/* Background Overlay */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%', top: 0, left: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)',
                        pointerEvents: 'none'
                    }}></div>

                    <div className="z-1 px-4">
                        <Button
                            icon="pi pi-arrow-left"
                            label="Back to Login"
                            className="p-button-text pl-0 mb-4 text-white hover:text-gray-200"
                            style={{ color: 'white' }}
                            onClick={() => navigate('/login')}
                        />
                        <h1 className="text-6xl font-bold text-white mb-3 text-center">Journey<span className="text-primary">Sense</span></h1>
                        <p className="text-gray-400 line-height-3 text-xl text-center max-w-30rem mx-auto">
                            Join the collaborative network where peers review, learn, and grow together.
                        </p>
                    </div>

                    <div className="flex flex-column gap-4 z-1 px-6">
                        <div className="flex align-items-center gap-4 p-4 border-round-xl" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                            <i className="pi pi-users text-primary text-4xl"></i>
                            <div>
                                <h4 className="text-white m-0 text-lg mb-1">Community Driven</h4>
                                <span className="text-gray-400 text-sm line-height-2">Connect with a vibrant community of learners and educators.</span>
                            </div>
                        </div>

                        <div className="flex align-items-center gap-4 p-4 border-round-xl" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
                            <i className="pi pi-check-circle text-primary text-4xl"></i>
                            <div>
                                <h4 className="text-white m-0 text-lg mb-1">Verified Skills</h4>
                                <span className="text-gray-400 text-sm line-height-2">Earn badges and build a portfolio of reviewed work.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - Form Area */}
                <div className="w-full md:w-6 flex align-items-center justify-content-center bg-gray-900 relative overflow-y-auto">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
                         style={{ background: 'radial-gradient(circle at top right, #6366f1 0%, transparent 40%)' }}>
                    </div>

                    <div className="w-full max-w-30rem px-4 py-4">
                        <div className="mb-5 text-center">
                            <h2 className="text-3xl font-bold text-white m-0">Create Account</h2>
                            <p className="text-gray-400 m-0 mt-2">Enter your details to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid formgrid p-fluid">

                                <SectionHeader icon="pi pi-id-card" title="Identity" />

                                <div className="col-12 md:col-6 mb-3">
                                    <div className="relative w-full">
                                        <i className="pi pi-user text-gray-500" style={iconStyle}></i>
                                        <InputText
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            className={inputClasses}
                                            style={inputStyles}
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>

                                <div className="col-12 md:col-6 mb-3">
                                    <div className="relative w-full">
                                        <InputText
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            className={inputClasses}
                                            style={{ ...inputStyles, paddingLeft: '1rem' }}
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>

                                <div className="col-12 md:col-6 mb-3">
                                    <div className="relative w-full">
                                        <i className="pi pi-at text-gray-500" style={iconStyle}></i>
                                        <InputText
                                            value={formData.username}
                                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            className={inputClasses}
                                            style={inputStyles}
                                            placeholder="Username"
                                        />
                                    </div>
                                </div>

                                <div className="col-12 md:col-6 mb-3">
                                    <div className="relative w-full">
                                        <Dropdown
                                            value={formData.role}
                                            options={roleOptions}
                                            onChange={(e) => setFormData({...formData, role: e.value})}
                                            itemTemplate={roleOptionTemplate}
                                            placeholder="Select Role"
                                            className={`${inputClasses} flex align-items-center`}
                                            style={{ padding: '0' }}
                                            panelStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                                            pt={{
                                                root: { className: 'bg-gray-800 border-gray-700' },
                                                input: { className: 'text-white pl-3' },
                                                trigger: { className: 'text-gray-400' },
                                                wrapper: { className: 'bg-gray-900' },
                                                list: { className: 'bg-gray-900 p-0' },
                                                item: { className: 'text-gray-200 hover:bg-gray-800 hover:text-white p-3' }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 mt-2">
                                    <SectionHeader icon="pi pi-lock" title="Credentials" />
                                </div>

                                <div className="col-12 mb-3">
                                    <div className="relative w-full">
                                        <i className="pi pi-envelope text-gray-500" style={iconStyle}></i>
                                        <InputText
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className={inputClasses}
                                            style={inputStyles}
                                            placeholder="Email Address"
                                        />
                                    </div>
                                </div>

                                <div className="col-12 md:col-6 mb-3">
                                    <div className="relative w-full">
                                        <i className="pi pi-key text-gray-500" style={iconStyle}></i>
                                        <Password
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            toggleMask feedback={false}
                                            className="w-full"
                                            inputClassName={inputClasses}
                                            inputStyle={inputStyles}
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>

                                <div className="col-12 md:col-6 mb-4">
                                    <div className="relative w-full">
                                        <Password
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                            toggleMask feedback={false}
                                            className="w-full"
                                            inputClassName={inputClasses}
                                            inputStyle={{...inputStyles, paddingLeft: '1rem'}}
                                            placeholder="Confirm"
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <Button
                                        type="submit"
                                        label={loading ? "Creating Account..." : "Create Account"}
                                        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-check"}
                                        className="w-full btn-gradient p-3 text-lg font-bold border-round-xl shadow-none hover:shadow-lg transition-all transition-duration-200"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}