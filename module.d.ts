declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    jwtRefreshTokenKey: string;
    supabaseURL: string;
    supabaseKey: string;
    supabasePassword: string;
    AWS_BUCKET_NAME: string;
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_ENDPOINT: string;
  }
}
