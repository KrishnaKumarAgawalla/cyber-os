// Matches the logic in your backend services/utils.js
const CIPHER_KEY = import.meta.env.VITE_CIPHER_KEY || "CYBER_OS_SECRET";

export const decryptData = (base64Str: string): any => {
  try {
    const ciphered = atob(base64Str);
    
    const decrypted = ciphered.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ CIPHER_KEY.charCodeAt(i % CIPHER_KEY.length))
    ).join('');
    
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failure: System integrity compromised.", error);
    return null;
  }
};