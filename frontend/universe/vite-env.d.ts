/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_USER_MANAGEMENT_SERVICE_BASE_URL: string;
  // Add other env variables here as needed, for example:
  // readonly VITE_AUTH_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
