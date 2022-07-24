export type region = "us" | "eu";

export interface Key {
  [key: string]: string | boolean | string[] | undefined;
}

export interface Config {
  key: string;
  domain: string;
  region?: region;
}

export interface Message extends Key {
  to: string[] | string;
  cc?: string[] | string;
  bcc?: string[] | string;
  from: string;
  html?: string;
  text?: string;
  subject: string;
  testing?: boolean;
  tracking?: boolean;
}
