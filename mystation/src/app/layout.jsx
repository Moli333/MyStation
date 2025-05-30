// src/app/layout.jsx
import "./globals.css";

export const metadata = {
    title: "Spotify Dashboard",
    description: "Visualiza tu experiencia musical",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
