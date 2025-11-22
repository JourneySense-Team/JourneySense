import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/users');
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
    }, []);

    return (
        <div className="hub-page-container">
            {/* HEADER */}
            <div className="hubs-header">
                <h2>Hub: Users</h2>
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
    );
}