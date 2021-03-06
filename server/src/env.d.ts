declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_PASSWORD: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    GOOGLE_CAPTCHA_SECRET_KEY: string;
  }
}
