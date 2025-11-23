// src/components/Header.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import type { CurrentUser } from '../services/AuthService';
import { Button } from 'primereact/button';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<CurrentUser | null>(null);

    // Routes where the header should be hidden
    const hiddenRoutes = ['/login', '/register', '/forgot-password'];
    const shouldHide = hiddenRoutes.includes(location.pathname);

    useEffect(() => {
        const syncUserState = () => {
            const currentUser = AuthService.getCurrentUser();
            setUser(currentUser);
        }
        syncUserState();
    }, [location]);

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
        navigate('/login');
    };

    if (shouldHide) return null;

    const navLinkClass = "text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-200 cursor-pointer no-underline";

    return (
        <header className="w-full bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-800">
            <div className="w-full text-left">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* Logo / Brand */}
                    <div
                        className="text-2xl font-extrabold text-white tracking-wider cursor-pointer flex items-center gap-2"
                        onClick={() => navigate('/')}
                    >
                        <i className="pi pi-compass text-indigo-500 text-xl"></i>
                        <span>Co<span className="text-indigo-500">Review</span></span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a onClick={() => navigate('/')} className={navLinkClass}>Home</a>
                        <a onClick={() => navigate('/hubs')} className={navLinkClass}>Hubs</a>
                        <a href="#" onClick={(e) => e.preventDefault()} className={navLinkClass}>My Work</a>
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="hidden md:flex flex-col text-right mr-2">
                                    <span className="text-sm font-semibold text-white">{user.username}</span>
                                    <span className="text-xs text-gray-400 uppercase">{user.role}</span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border border-indigo-400 cursor-pointer hover:bg-indigo-500 transition-colors">
                                    {user.firstName ? user.firstName[0] : user.username[0]}
                                </div>
                                <Button
                                    icon="pi pi-sign-out"
                                    className="p-button-rounded p-button-text p-button-secondary text-gray-400 hover:text-white"
                                    onClick={handleLogout}
                                    tooltip="Log Out"
                                    tooltipOptions={{ position: 'bottom' }}
                                />
                            </>
                        ) : (
                            <>
                                <Button
                                    label="Log In"
                                    className="p-button-text text-gray-300 hover:text-white font-semibold"
                                    onClick={() => navigate('/login')}
                                />
                                <Button
                                    label="Sign Up"
                                    className="btn-gradient border-none px-4 py-2 font-bold border-round-lg shadow-md"
                                    onClick={() => navigate('/register')}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};