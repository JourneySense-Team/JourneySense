// frontend/src/pages/Hubs/Hubs.tsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import './Hubs.css';

interface HubDTO {
    id: string;
    name: string;
    description: string;
    isPrivate: boolean;
    password: string | null;
    tags: string[];
}

export default function Hubs() {
    const [hubs, setHubs] = useState<HubDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef<any>(null);

    // Create Hub dialog states
    const [showDialog, setShowDialog] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [password, setPassword] = useState('');

    // State for single selected tag
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const API_URL = 'http://localhost:8080/api/hubs';

    const tagOptions = [
        { label: 'Beginner', value: 'BEGINNER' },
        { label: 'Intermediate', value: 'INTERMEDIATE' },
        { label: 'Advanced', value: 'ADVANCED' }
    ];

    const navigate = useNavigate();

    // Helper function to get auth headers
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    };

    const loadHubs = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL, {
                headers: getAuthHeaders()
            });

            if (res.status === 403 || res.status === 401) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Session Expired',
                    detail: 'Please login again',
                    life: 3000
                });
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            if (!res.ok) throw new Error('Failed to fetch hubs');
            const data = await res.json();
            setHubs(data);
        } catch (error) {
            console.error('Error loading hubs:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load hubs',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHubs();
    }, []);

    const getInitials = (text: string) =>
        text
            .trim()
            .split(' ')
            .map((w) => w[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

    const createHub = async () => {
        // Validation
        if (!name.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter a hub name',
                life: 3000
            });
            return;
        }

        if (!description.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter a description',
                life: 3000
            });
            return;
        }

        if (isPrivate && !password.trim()) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please enter a password for private hub',
                life: 3000
            });
            return;
        }

        const newHub = {
            name,
            description,
            isPrivate,
            password: isPrivate ? password : null,
            tags: selectedTag ? [selectedTag] : []
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newHub),
            });

            if (res.status === 403 || res.status === 401) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Session Expired',
                    detail: 'Please login again',
                    life: 3000
                });
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Failed to create hub');
            }

            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Hub created successfully',
                life: 3000
            });

            setShowDialog(false);
            setName('');
            setDescription('');
            setIsPrivate(false);
            setPassword('');
            setSelectedTag(null);

            await loadHubs();
        } catch (error) {
            console.error('Error creating hub:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create hub: ' + (error as Error).message,
                life: 3000
            });
        }
    };

    const getTagSeverity = (tagVal: string) => {
        switch (tagVal) {
            case 'BEGINNER': return 'success';
            case 'INTERMEDIATE': return 'warning';
            case 'ADVANCED': return 'danger';
            default: return 'info';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <Toast ref={toast} />
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
                            <a href="#" className="text-white transition-colors no-underline">Hubs</a>
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

                {/* HEADER */}
                <div className="hubs-header">
                    <h2 className="text-white">Hubs</h2>
                    <Button label="Create Hub" icon="pi pi-plus" onClick={() => setShowDialog(true)} />
                </div>

                {/* HUB GRID */}
                <div className="hubs-grid">
                    {loading && <p className="text-white">Loading hubs...</p>}

                    {!loading && hubs.length === 0 && (
                        <div className="col-12 text-center py-6">
                            <i className="pi pi-inbox text-6xl text-gray-600 mb-4"></i>
                            <p className="text-gray-400 text-xl">No hubs yet. Create your first hub!</p>
                        </div>
                    )}

                    {!loading &&
                        hubs.map((hub) => (
                            <Card
                                key={hub.id}
                                className="hub-card"
                                onClick={() => navigate(`/hub/${hub.id}`)}
                            >
                                <div className="hub-card-content">
                                    <Avatar
                                        label={getInitials(hub.name)}
                                        size="xlarge"
                                        shape="square"
                                        style={{
                                            width: '8rem',
                                            height: '8rem',
                                            backgroundColor: '#6366F1',
                                            color: 'white',
                                            flexShrink: 0
                                        }}
                                    />

                                    <div className="hub-info">
                                        <h3>{hub.name}</h3>
                                        <div>
                                            <small>{hub.description}</small>
                                            {hub.isPrivate && (
                                                <i className="pi pi-lock" style={{ opacity: 0.7, marginTop: '0.25rem', display: 'block' }} />
                                            )}
                                        </div>

                                        {hub.tags && hub.tags.length > 0 && (
                                            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                                                <Tag
                                                    value={hub.tags[0]}
                                                    severity={getTagSeverity(hub.tags[0])}
                                                    style={{ fontSize: '0.7rem' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                </div>

                {/* CREATE HUB POPUP */}
                <Dialog
                    header="Create New Hub"
                    visible={showDialog}
                    style={{ width: '32rem' }}
                    modal
                    onHide={() => setShowDialog(false)}
                >
                    <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <label htmlFor="name" className="block mb-2 font-semibold">
                                Hub Name <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter hub name"
                            />
                        </div>

                        <div>
                            <label htmlFor="desc" className="block mb-2 font-semibold">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter hub description"
                            />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block mb-2 font-semibold">
                                Difficulty Level
                            </label>
                            <Dropdown
                                id="difficulty"
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.value)}
                                options={tagOptions}
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select a Level (Optional)"
                                className="w-full"
                            />
                        </div>

                        <div className="flex align-items-center gap-2">
                            <Checkbox
                                inputId="isPrivate"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.checked!)}
                            />
                            <label htmlFor="isPrivate" className="cursor-pointer">Private Hub</label>
                        </div>

                        {isPrivate && (
                            <div>
                                <label htmlFor="pass" className="block mb-2 font-semibold">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <InputText
                                    id="pass"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>
                        )}

                        <div className="flex gap-2 pt-3">
                            <Button
                                label="Cancel"
                                icon="pi pi-times"
                                onClick={() => setShowDialog(false)}
                                className="p-button-text"
                            />
                            <Button
                                label="Create"
                                icon="pi pi-check"
                                onClick={createHub}
                                className="flex-1"
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
}