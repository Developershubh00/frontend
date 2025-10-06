/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AISENSY_API_KEY: string;
  readonly VITE_AISENSY_BASE_URL: string;
  readonly VITE_AISENSY_PARTNER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}