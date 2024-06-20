export type UserAttributes = {
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

  
  export type NodeEnvironment = "development" | "test" | "production";
  