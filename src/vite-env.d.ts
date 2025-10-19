/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AISENSY_API_KEY: string;
  readonly VITE_AISENSY_BASE_URL: string;
  readonly VITE_AISENSY_PARTNER_ID?: string;
  readonly VITE_SHEET_WEBAPP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}