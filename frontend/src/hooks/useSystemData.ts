// src/hooks/useSystemData.ts
import { useState, useEffect } from 'react';
import { decryptData } from '../utils/cipher';

const prewarmCache = async (items: any[]) => {
  const cache = await caches.open('k-os-asset-cache');

  const urlsToCache: string[] = [];

  items.forEach(item => {
    if (item.type === "BRAND" && item.logo) {
      urlsToCache.push(item.logo);
    }
    if (item.type === "CONTACT" && item.socials) {
      item.socials.forEach((social: any) => {
        if (social.icon_url) urlsToCache.push(social.icon_url);
      });
    }
    if (item.type === "ASSET" && item.url) {
      urlsToCache.push(item.url);
    }
    if (item.type === "RESUME" && item.url) {
      urlsToCache.push(item.url);
    }
  });

  const uniqueUrls = [...new Set(urlsToCache)];

  const imageUrls = items
    .filter(item => item.type === "BRAND" && item.logo)
    .map(item => item.logo);

  // Using Promise.all is cleaner for concurrent background tasks
  await Promise.all(
    uniqueUrls.map(async (url) => {
      const exists = await cache.match(url);
      if (!exists) await cache.add(url);
    })
  );
};

export function useSystemData() {
  const [memory, setMemory] = useState<any[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootSystem = async () => {
      // 1. Retrieve the ENCODED string from storage
      const encryptedPayload = sessionStorage.getItem("K_OS_ENCRYPTED_DISK");
      
      if (encryptedPayload) {
        const decrypted = await decryptData(encryptedPayload);
        setMemory(decrypted);
        setIsBooting(false);

        prewarmCache(decrypted);
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_URL);
        const rawEncoded = await response.text();
        
        // 2. Store the ENCODED version to disk
        sessionStorage.setItem("K_OS_ENCRYPTED_DISK", rawEncoded);
        
        // 3. Decrypt for immediate UI use
        const decrypted = await decryptData(rawEncoded);
        setMemory(decrypted);
        prewarmCache(decrypted);
      } catch (err) {
        console.error("Critical System Failure: Unable to read encrypted disk.");
      } finally {
        setIsBooting(false);
      }
    };

    bootSystem();
  }, []);

  return { memory, isBooting };
}