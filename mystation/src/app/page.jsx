'use client';
import Player from "@/components/Player";
import ProfileEditor from "@/components/ProfileEditor";
import PlaylistGrid from "@/components/PlaylistGrid";

export default function HomePage() {
    return (
        <main  className="p-4">
            <h1 className="text-2xl font-bold mb-2">Explora tus experiencias de usuario</h1>
            <p className="text-sm text-gray-600 mb-4">Aquí puedes reproducir música mientras exploras esta sección.</p>
            <Player />
            <ProfileEditor />
            <PlaylistGrid />
        </main>
    );
}
