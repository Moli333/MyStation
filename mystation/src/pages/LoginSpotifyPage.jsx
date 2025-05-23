// src/pages/LoginSpotifyPage.jsx

function generateCodeVerifier(length = 128) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
    return base64Digest;
}

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
console.log("CLIENT_ID:", CLIENT_ID);

const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const SCOPES = [
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative"
];

export const loginWithSpotify = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem("spotify_code_verifier", codeVerifier);

    const args = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPES.join(" "),
        redirect_uri: REDIRECT_URI,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${args.toString()}`;
};

