declare module NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'test' | 'prod';
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_DATABASE_NAME: string;
    DB_PASSWORD: string;
    JWT_SECRET_KEY: string;
    MAILGUN_API_KEY: string;
    MAILGUN_DOMAIN_NAME: string;
    MAILGUN_FROM_EMAIL: string;
  }
}
