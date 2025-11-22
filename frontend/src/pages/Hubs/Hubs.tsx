import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
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

    // --------------------------------------------------
    // LOAD HUBS
    // --------------------------------------------------
    const loadHubs = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch hubs');
            const data = await res.json();
            setHubs(data);
        } catch (error) {
            console.error('Error loading hubs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHubs();
    }, []);

    // --------------------------------------------------
    // AVATAR INITIALS
    // --------------------------------------------------
    const getInitials = (text: string) =>
        text
            .trim()
            .split(' ')
            .map((w) => w[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();

    // --------------------------------------------------
    // CREATE HUB
    // --------------------------------------------------
    const createHub = async () => {
        if (!name.trim()) return;

        // Backend expects an Array/Set, so we wrap the single tag in brackets
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newHub),
            });

            if (!res.ok) throw new Error('Failed to create hub');

            setShowDialog(false);

            // reset fields
            setName('');
            setDescription('');
            setIsPrivate(false);
            setPassword('');
            setSelectedTag(null);

            // refresh list
            await loadHubs();
        } catch (error) {
            console.error('Error creating hub:', error);
        }
    };

    // Helper to choose Tag color
    const getTagSeverity = (tagVal: string) => {
        switch (tagVal) {
            case 'BEGINNER': return 'success';
            case 'INTERMEDIATE': return 'warning';
            case 'ADVANCED': return 'danger';
            default: return 'info';
        }
    };

    return (
        <>
            {/* HEADER */}
            <div className="hubs-header">
                <h2>Hubs</h2>
                <Button label="Create Hub" icon="pi pi-plus" onClick={() => setShowDialog(true)} />
            </div>

            {/* HUB GRID */}
            <div className="hubs-grid">
                {loading && <p>Loading hubs...</p>}

                {!loading &&
                    hubs.map((hub) => (
                        <Card
                            key={hub.id}
                            className="hub-card"
                            onClick={() => navigate(`/hub/${hub.id}`)}                        >
                            <div className="hub-card-content">
                                <Avatar
                                    label={getInitials(hub.name)}
                                    size="xlarge"
                                    shape="square"
                                    style={{
                                        width: '8rem',       // Increased width (approx 64px)
                                        height: '8rem',
                                        backgroundColor: '#6366F1',
                                        color: 'white',
                                        flexShrink: 0 // Ensures avatar stays circle
                                    }}
                                />

                                <div className="hub-info">
                                    {/* 1. Title */}
                                    <h3>{hub.name}</h3>

                                    {/* 2. Description & Lock */}
                                    <div>
                                        <small>{hub.description}</small>
                                        {hub.isPrivate && (
                                            <i className="pi pi-lock" style={{ opacity: 0.7, marginTop: '0.25rem', display: 'block' }} />
                                        )}
                                    </div>

                                    {/* 3. Tag moved to the bottom */}
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
                style={{ width: '28rem' }}
                modal
                onHide={() => setShowDialog(false)}
            >
                <div className="p-fluid" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                        <label htmlFor="name">Hub Name</label>
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="desc">Description</label>
                        <InputText id="desc" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="difficulty">Difficulty Level</label>
                        <Dropdown
                            id="difficulty"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.value)}
                            options={tagOptions}
                            optionLabel="label"
                            placeholder="Select a Level"
                        />
                    </div>

                    <div className="flex align-items-center gap-2">
                        <Checkbox inputId="isPrivate" checked={isPrivate} onChange={(e) => setIsPrivate(e.checked!)} />
                        <label htmlFor="isPrivate">Private Hub</label>
                    </div>

                    {isPrivate && (
                        <div>
                            <label htmlFor="pass">Password</label>
                            <InputText
                                id="pass"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    )}

                    <Button label="Create" icon="pi pi-check" onClick={createHub} />
                </div>
            </Dialog>
        </>
    );
}