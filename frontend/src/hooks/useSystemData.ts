// src/hooks/useSystemData.ts
import { useState, useEffect } from "react";
import { decryptData } from "../utils/cipher";

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Helper to recursively find and update asset strings
const mapAssetUrls = (data: any, baseUrl: string): any => {
  if (Array.isArray(data)) {
    return data.map((item) => mapAssetUrls(item, baseUrl));
  } else if (typeof data === "object" && data !== null) {
    const newObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (
        (key === "logo" || key === "url" || key === "icon_url") &&
        typeof value === "string" &&
        value.startsWith("?proxyAsset=")
      ) {
        // Split at the '=' to separate the key from the path
        const parts = value.split("=");
        const assetPath = parts[1];

        // Encode the path (/logos/github.svg -> %2Flogos%2Fgithub.svg)
        newObj[key] = `${baseUrl}${parts[0]}=${encodeURIComponent(assetPath)}`;
      } else {
        newObj[key] = mapAssetUrls(value, baseUrl);
      }
    }
    return newObj;
  }
  return data;
};

const prewarmCache = async (items: any[]) => {
  const cache = await caches.open("k-os-asset-cache");

  const urlsToCache: string[] = [];

  items.forEach((item) => {
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

  // Using Promise.all is cleaner for concurrent background tasks
  await Promise.all(
    uniqueUrls.map(async (url) => {
      const exists = await cache.match(url);
      if (!exists) {
        try {
          const response = await fetch(url, {
            mode: "cors",
            credentials: "omit",
          });
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (error) {
          console.error(`K-Os Cache Error`);
        }
      }
    }),
  );
};

export function useSystemData() {
  const [memory, setMemory] = useState<any[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootSystem = async () => {
      // 1. Retrieve the ENCODED string from storage
      const encryptedPayload = sessionStorage.getItem("K_OS_ENCRYPTED_DISK");

      const processDisk = async (payload: string) => {
        const decryptedRaw = await decryptData(payload);
        const decryptedJson =
          typeof decryptedRaw === "string"
            ? JSON.parse(decryptedRaw)
            : decryptedRaw;

        // HYDRATION: Replace relative proxy links with Absolute Gateway URLs
        const hydratedData = mapAssetUrls(decryptedJson, VITE_API_URL);

        setMemory(hydratedData);
        prewarmCache(hydratedData);
      };

      if (encryptedPayload) {
        await processDisk(encryptedPayload);
        setIsBooting(false);
        return;
      }

      try {
        const response = await fetch(
          `${VITE_API_URL}?action=${import.meta.env.VITE_INITIALIZATION_ACTION}`,
        );
        const rawEncoded = await response.text();

        // 2. Store the ENCODED version to disk
        sessionStorage.setItem("K_OS_ENCRYPTED_DISK", rawEncoded);

        // 3. Decrypt for immediate UI use
        await processDisk(rawEncoded);
      } catch (err) {
        console.error(
          "Critical System Failure: Unable to read encrypted disk.",
        );
      } finally {
        setIsBooting(false);
      }
    };

    bootSystem();
  }, []);

  return { memory, isBooting };
}
