"use client";
import { useUser } from "@/auth/contexts/UserProvider";

export default function ProfileEditor() {
    const { user } = useUser();

    if (!user) return <p className="text-gray-500">No se ha cargado el perfil del usuario.</p>;

    return (
        <div className="my-4 p-4 border rounded-xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">👤 Editar perfil</h2>
            <div className="flex items-center space-x-4">
                <img
                    src={user.photoURL || "/placeholder.jpg"}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <p className="text-lg font-medium">{user.displayName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
        </div>
    );
}
