import { useState } from "react";

const ProfileEditor = ({ profile, onSave }) => {
    const [displayName, setDisplayName] = useState(profile.display_name || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ display_name: displayName });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de usuario:
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default ProfileEditor;
