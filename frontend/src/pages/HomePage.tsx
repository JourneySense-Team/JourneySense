// frontend/src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';

import "./HomePage.css";
import NavBar from "../components/NavBar.tsx";

const HomePage: React.FC = () => {
    const navigate = useNavigate();



    return (
        <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
            {/* Navigation Bar */}
            <NavBar/>

            {/* Main Content */}
            <div className="px-8 py-6">
                <div className="grid">

                    {/* Left Section - Workspace Hubs */}
                    <div className="col-12 lg:col-8">
                        <div className="flex align-items-center justify-content-between mb-5">
                            <h2 className="text-white text-4xl font-bold m-0 flex align-items-center gap-3">
                                <i className="pi pi-sitemap" style={{ color: '#6366f1', fontSize: '2rem' }}></i>
                                Workspace Hubs
                            </h2>
                        </div>

                        <div className="grid">
                            {/* Design Hub */}
                            <div className="col-12 md:col-6 mb-4">
                                <HubCard
                                    title="Design Hub"
                                    description="Dedicated space for all design assets, discussions, and mockups."
                                    icon="pi-palette"
                                    color="#ec4899"
                                    onClick={() => navigate('/hubs')}
                                />
                            </div>

                            {/* Development Hub */}
                            <div className="col-12 md:col-6 mb-4">
                                <HubCard
                                    title="Development Hub"
                                    description="Focus on development tasks, sprint updates, and technical documentation."
                                    icon="pi-code"
                                    color="#8b5cf6"
                                    onClick={() => navigate('/hubs')}
                                />
                            </div>

                            {/* Marketing & Sales */}
                            <div className="col-12 md:col-6 mb-4">
                                <HubCard
                                    title="Marketing & Sales"
                                    description="Central area for campaign strategies, sales reports, and customer insights."
                                    icon="pi-megaphone"
                                    color="#f59e0b"
                                    onClick={() => navigate('/hubs')}
                                />
                            </div>

                            {/* HR & Onboarding */}
                            <div className="col-12 md:col-6 mb-4">
                                <HubCard
                                    title="HR & Onboarding"
                                    description="Documents and resources for new hires and team policies."
                                    icon="pi-briefcase"
                                    color="#10b981"
                                    onClick={() => navigate('/hubs')}
                                />
                            </div>

                            {/* Infrastructure */}
                            <div className="col-12 md:col-6 mb-4">
                                <HubCard
                                    title="Infrastructure"
                                    description="Monitoring and configuration for cloud resources and services."
                                    icon="pi-server"
                                    color="#06b6d4"
                                    onClick={() => navigate('/hubs')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Team Reviews */}
                    <div className="col-12 lg:col-4">
                        <div className="flex align-items-center justify-content-between mb-5">
                            <h2 className="text-white text-4xl font-bold m-0 flex align-items-center gap-3">
                                <i className="pi pi-comments" style={{ color: '#6366f1', fontSize: '2rem' }}></i>
                                Team Reviews
                            </h2>
                        </div>

                        <div className="flex flex-column gap-4">
                            <ReviewCard
                                author="Alex"
                                text="The new feature documentation is clear and helpful."
                                avatar="A"
                                color="#ec4899"
                            />
                            <ReviewCard
                                author="Maya"
                                text="We should consider optimizing the image loading on the dashboard. It feels sluggish."
                                avatar="M"
                                color="#8b5cf6"
                            />
                            <ReviewCard
                                author="Chris"
                                text="Great work on the Q3 performance summary. Very detailed!"
                                avatar="C"
                                color="#f59e0b"
                            />
                            <ReviewCard
                                author="Ben"
                                text="The bug fix for the login screen has been deployed successfully."
                                avatar="B"
                                color="#10b981"
                            />
                        </div>

 
                    </div>
                </div>
            </div>
        </div>
    );
};

// Hub Card Component
interface HubCardProps {
    title: string;
    description: string;
    icon: string;
    color: string;
    onClick: () => void;
}

const HubCard: React.FC<HubCardProps> = ({ title, description, icon, color, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-5 border-round-xl cursor-pointer transition-all transition-duration-300 hover:scale-105 h-full"
            style={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
        >
            <div className="flex align-items-center mb-3">
                <div
                    className="flex align-items-center justify-content-center border-circle"
                    style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: `${color}20`,
                        border: `2px solid ${color}`
                    }}
                >
                    <i className={`pi ${icon} text-2xl`} style={{ color }}></i>
                </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-2 mt-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-height-3">{description}</p>
            <div className="flex align-items-center text-sm font-semibold" style={{ color }}>
                <span>Enter Hub</span>
                <i className="pi pi-arrow-right ml-2"></i>
            </div>
        </div>
    );
};

// Review Card Component
interface ReviewCardProps {
    author: string;
    text: string;
    avatar: string;
    color: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ author, text, avatar, color }) => {
    return (
        <div
            className="p-4 border-round-xl"
            style={{
                backgroundColor: '#16161f',
                border: '1px solid #25252f'
            }}
        >
            <div className="flex align-items-center gap-3 mb-3">
                <Avatar
                    label={avatar}
                    size="normal"
                    shape="circle"
                    style={{ backgroundColor: color, color: 'white' }}
                />
                <p className="text-sm font-bold m-0" style={{ color }}>{author}</p>
            </div>
            <p className="text-white text-sm italic line-height-3 m-0">"{text}"</p>
        </div>
    );
};

export default HomePage;