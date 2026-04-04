// Matches the logic in your backend services/utils.js
const KEY_STRING = import.meta.env.VITE_CIPHER_KEY || "CYBER_OS_SECRET";

export const decryptData = async (base64Str: string): Promise<any> => {
    try {
        const bytes = new Uint8Array(atob(base64Str).split('').map(c => c.charCodeAt(0)));

        const iv = bytes.slice(0, 12);
        const tag = bytes.slice(12, 28);
        const data = bytes.slice(28);

        const encoder = new TextEncoder();
        const keyBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(KEY_STRING));
        const keyMaterial = await crypto.subtle.importKey(
            "raw", 
            keyBuffer, 
            "AES-GCM", 
            false, 
            ["decrypt"]
        );

        // 3. Decrypt (ciphertext + tag)
        const encryptedPayload = new Uint8Array(data.length + tag.length);
        encryptedPayload.set(data);
        encryptedPayload.set(tag, data.length);

        const decryptedContent = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv, tagLength: 128 },
            keyMaterial,
            encryptedPayload
        );

        return JSON.parse(new TextDecoder().decode(decryptedContent));
    } catch (error) {
        console.error("System Failure: Decryption sequence failed.", error);
        return null;
    }
};