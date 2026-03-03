/**
 * End-to-End Encryption Utilities using Web Crypto API.
 * Uses AES-GCM for encryption and PBKDF2 for key derivation from the room code.
 */

const ITERATIONS = 100000;
const SALT = new TextEncoder().encode("chatty-e2ee-salt"); // Static salt for simplicity in this demo

async function getKey(roomCode: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(roomCode),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: SALT,
            iterations: ITERATIONS,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encryptMessage(message: string, roomCode: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await getKey(roomCode);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(message)
    );

    // Combine IV and Ciphertext into a single string for transport
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));

    return `${ivBase64}:${encryptedBase64}`;
}

export async function decryptMessage(encryptedData: string, roomCode: string): Promise<string> {
    try {
        const [ivBase64, encryptedBase64] = encryptedData.split(":");
        if (!ivBase64 || !encryptedBase64) return encryptedData; // Fallback for plain text

        const iv = new Uint8Array(atob(ivBase64).split("").map(c => c.charCodeAt(0)));
        const encrypted = new Uint8Array(atob(encryptedBase64).split("").map(c => c.charCodeAt(0)));

        const key = await getKey(roomCode);
        const decrypted = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            key,
            encrypted
        );

        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.error("Decryption failed:", e);
        return "[Unable to decrypt message]";
    }
}
