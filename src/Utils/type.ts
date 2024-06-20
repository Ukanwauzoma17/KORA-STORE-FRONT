export type AdminAttributes = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  
  export type MailOptions = {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  };

  export type ApiResponseT = {
    success: boolean;
    message: string;
    error?: any;
    data?: any;
  };
  export type BaseExceptionType = {
    message: string | null;
    error?: any;
    code: number;
  };
  declare module "express" {
    interface Request {
      admin?: AdminAttributes;
    }
  }
  export type NodeEnvironment = "development" | "test" | "production";
  