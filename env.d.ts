declare module NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'test' | 'prod';
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_DATABASE_NAME: string;
    DB_PASSWORD: string;
  }
}
