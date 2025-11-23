import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import React from "react";
import {useNavigate} from "react-router-dom";

const NavBar:React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (<nav className="flex justify-content-between align-items-center navbar">
        <div className="flex align-items-center gap-6">
            <h1 className="text-3xl font-bold m-0" style={{color: '#6366f1'}}>
                Share&View
            </h1>
            <div className="flex gap-4 ml-6">
                <a href="#" className="text-white transition-colors no-underline">Home</a>
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    navigate('/hubs');
                }}
                   className="text-gray-300 hover:text-white transition-colors no-underline">Hubs</a>
                <a href="#"
                   onClick={(e) => {
                       e.preventDefault();
                       navigate('/review');
                   }}
                   className="text-gray-300 hover:text-white transition-colors no-underline">Review</a>
                <a href="#"
                   onClick={(e) => {
                       e.preventDefault();
                       navigate('/your-work');
                   }}
                   className="text-gray-300 hover:text-white transition-colors no-underline">My Work</a>
                <a href="#"
                   onClick={(e) => {
                       e.preventDefault();
                       navigate('/others-work');
                   }}
                   className="text-gray-300 hover:text-white transition-colors no-underline">Other's Work</a>
            </div>
        </div>
        <div className="leftside-controls">

            <div className="user-wrapper">
                <Avatar
                    label={user.username ? user.username[0].toUpperCase() : 'U'}
                    size="large"
                    shape="circle"
                    style={{backgroundColor: '#6366f1', color: 'white'}}
                />
                <div>
                    <p className="text-white font-bold m-0 text-lg">{user.username || 'User'}</p>
                </div>
            </div>

            <Button
                label="Logout"
                icon="pi pi-sign-out"
                onClick={handleLogout}
                className="p-button-text p-button-plain text-gray-300 hover:text-white"
            />
        </div>
    </nav>)
}

export default NavBar;