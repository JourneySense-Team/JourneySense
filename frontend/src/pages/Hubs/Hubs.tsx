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
import NavBar from '../../components/navbar/NavBar';

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
    const toast = useRef<Toast>(null);

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
                <NavBar/>

                {/* HEADER */}
                <div className="hubs-header">
                    <Button label="Create Hub" icon="pi pi-plus" onClick={() => setShowDialog(true)} />
                </div>

                {/* HUB GRID */}
               <div className="hubs-grid">
    {loading && (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading hubs...</p>
        </div>
    )}

    {!loading && hubs.length === 0 && (
        <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No hubs yet</h3>
            <p>Create your first hub to get started!</p>
        </div>
    )}

    {!loading && hubs.map((hub) => (
        <div
            key={hub.id}
            className="hub-card"
            onClick={() => navigate(`/hub/${hub.id}`)}
        >
            <div className="hub-card-avatar">
                <div className="hub-avatar">
                    {getInitials(hub.name)}
                </div>
                {hub.isPrivate && (
                    <div className="privacy-badge">
                        🔒
                    </div>
                )}
            </div>

            <div className="hub-card-content">
                <h3 className="hub-title">{hub.name}</h3>
                <p className="hub-description">{hub.description}</p>

                {hub.tags && hub.tags.length > 0 && (
                    <div className="hub-tags">
                        {hub.tags.map((tag, index) => (
                            <span key={index} className={`hub-tag tag-${tag.toLowerCase()}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="hub-card-footer">
                <span className="hub-arrow">→</span>
            </div>
        </div>
    ))}
</div>

                {/* CREATE HUB POPUP */}
                <Dialog
    visible={showDialog}
    modal
    onHide={() => setShowDialog(false)}
    className="create-hub-dialog"
    showHeader={false}
>
    <div className="dialog-content">
        {/* Header */}
        <div className="dialog-header">
            <div className="dialog-icon">
                <span className="icon-emoji">📚</span>
            </div>
            <h2 className="dialog-title">Create New Hub</h2>
            <p className="dialog-subtitle">Start your learning community</p>
        </div>

        {/* Form */}
        <div className="dialog-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">
                    Hub Name <span className="required">*</span>
                </label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Advanced JavaScript"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="desc" className="form-label">
                    Description <span className="required">*</span>
                </label>
                <InputText
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will members learn?"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="difficulty" className="form-label">
                    Difficulty Level
                </label>
                <Dropdown
                    id="difficulty"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.value)}
                    options={tagOptions}
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Select a level (Optional)"
                    className="form-input"
                />
            </div>

            <div className="form-group-checkbox">
                <div className="checkbox-wrapper">
                    <Checkbox
                        inputId="isPrivate"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.checked!)}
                    />
                    <label htmlFor="isPrivate" className="checkbox-label">
                        <span className="checkbox-icon">🔒</span>
                        <div>
                            <div className="checkbox-title">Private Hub</div>
                            <div className="checkbox-description">Require password to join</div>
                        </div>
                    </label>
                </div>
            </div>

            {isPrivate && (
                <div className="form-group password-group">
                    <label htmlFor="pass" className="form-label">
                        Password <span className="required">*</span>
                    </label>
                    <InputText
                        id="pass"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a secure password"
                        className="form-input"
                    />
                </div>
            )}
        </div>

        {/* Footer */}
        <div className="dialog-footer">
            <Button
                label="Cancel"
                onClick={() => setShowDialog(false)}
                className="btn-cancel"
            />
            <Button
                label="Create Hub"
                onClick={createHub}
                className="btn-create"
                icon="pi pi-plus"
            />
        </div>
    </div>
</Dialog>
            </div>
        </>
    );
}