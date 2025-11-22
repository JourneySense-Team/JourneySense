// frontend/src/pages/Hub/Hub.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import "./Hub.css";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    level: number;
    experience: number;
}

export default function Hub() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token ? `Bearer ${token}` : ''
                    }
                });

                if (response.status === 403 || response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                    return;
                }

                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
            {/* Navigation Bar */}
            <nav className="flex justify-content-between align-items-center px-6 py-4"
                 style={{ backgroundColor: '#13131a', borderBottom: '1px solid #1f1f2e' }}>
                <div className="flex align-items-center gap-6">
                    <h1 className="text-3xl font-bold m-0 cursor-pointer"
                        style={{ color: '#6366f1' }}
                        onClick={() => navigate('/home')}>
                        Share&View
                    </h1>
                    <div className="flex gap-4 ml-6">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/home'); }}
                           className="text-gray-300 hover:text-white transition-colors no-underline">Home</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/hubs'); }}
                           className="text-white transition-colors no-underline">Hubs</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors no-underline">Review</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors no-underline">My Work</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors no-underline">Other's Work</a>
                    </div>
                </div>
                <Button
                    label="Logout"
                    icon="pi pi-sign-out"
                    onClick={handleLogout}
                    className="p-button-text p-button-plain text-gray-300 hover:text-white"
                />
            </nav>

            <div className="hub-page-container">
                {/* HEADER */}
                <div className="hubs-header">
                    <h2 className="text-white">Hub: Users</h2>
                    <Button
                        icon="pi pi-arrow-left"
                        label="Back to Hubs"
                        className="p-button-outlined"
                        onClick={() => navigate('/hubs')}
                    />
                </div>

                {/* CARD CONTAINER FOR TABLE */}
                <div className="hub-table-card">
                    <DataTable
                        value={users}
                        loading={loading}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        style={{ border: 'none' }}
                    >
                        <Column field="firstName" header="First Name" sortable style={{ width: '25%' }}></Column>
                        <Column field="lastName" header="Last Name" sortable style={{ width: '25%' }}></Column>
                        <Column field="level" header="Level" sortable style={{ width: '25%' }}></Column>
                        <Column field="experience" header="Experience" sortable style={{ width: '25%' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}