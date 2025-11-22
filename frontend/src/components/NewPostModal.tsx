import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import type { TagType } from "../pages/yourWork/YourWork.tsx";

interface Props {
    onClose: () => void;
    onSave: (formData: FormData) => void;
}

const NewPostModal = ({ onClose, onSave }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState<TagType | "">("");
    const [hubId, setHubId] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const handleSave = () => {
        if (!title || !description || !file) {
            alert("All fields including file are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tag", tag ?? "BEGINNER");
        if (hubId) formData.append("hubId", hubId);
        formData.append("file", file);

        onSave(formData);
        onClose();
    };

    const tagOptions = [
        { label: "BEGINNER", value: "BEGINNER" },
        { label: "INTERMEDIATE", value: "INTERMEDIATE" },
        { label: "ADVANCED", value: "ADVANCED" },
    ];

    return (
        <Dialog header="Create New Post" visible style={{width: "400px"}} modal onHide={onClose}
                className="glass-panel">
            <div className="p-field mb-3">
                <label className="text-white">Title</label>
                <InputText value={title} onChange={(e) => setTitle(e.target.value)}
                           className="input-professional w-full"/>
            </div>
            <div className="p-field mb-3">
                <label className="text-white">Description</label>
                <InputText value={description} onChange={(e) => setDescription(e.target.value)}
                           className="input-professional w-full"/>
            </div>
            <div className="p-field mb-3">
                <label className="text-white">Tag</label>
                <Dropdown value={tag} options={tagOptions} onChange={(e) => setTag(e.value)} placeholder="Select a tag"
                          className="w-full"/>
            </div>
            <div className="p-field mb-3">
                <label className="text-white">Hub ID (optional)</label>
                <InputText value={hubId} onChange={(e) => setHubId(e.target.value)}
                           className="input-professional w-full"/>
            </div>
            <div className="p-field mb-3">
                <label className="text-white">Upload File</label>
                <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    className="text-white"
                />
                {file && <p className="text-white mt-1">Selected file: {file.name}</p>}
            </div>

            <div className="flex justify-end gap-2">
                <Button label="Cancel" className="p-button-text" onClick={onClose}/>
                <Button label="Save" className="btn-gradient" onClick={handleSave}/>
            </div>
        </Dialog>
    );
};

export default NewPostModal;
