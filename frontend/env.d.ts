/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CIPHER_KEY: string;
  readonly VITE_INITIALIZATION_ACTION: string;
  readonly VITE_CONTACT_ACTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
