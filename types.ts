export type region = "us" | "eu";

export interface Config {
  key: string;
  domain: string;
  region?: region;
}

export interface Message {
  // Recipients
  to: string[] | string;
  cc?: string[] | string;
  bcc?: string[] | string;
  reply?: string;

  // Sender and Subject
  from: string;
  subject: string;

  // Content
  text?: string;
  html?: string;
  "amp-html"?: string;

  // Attachments
  attachment?: File[] | File;
  inline?: File[] | File;

  // Template
  template?: string;
  "t:version"?: string;
  "t:text"?: boolean;
  "t:variables"?: Record<string, unknown>;

  // Testing
  testing?: boolean;

  // Options
  "o:tag"?: string;
  "o:dkim"?: boolean;
  "o:deliverytime"?: string;
  "o:deliverytime-optimize-period"?: string;
  "o:time-zone-localize"?: string;
  "o:testmode"?: boolean;
  "o:tracking"?: boolean;
  "o:tracking-clicks"?: boolean | "htmlonly";
  "o:tracking-opens"?: boolean;
  "o:require-tls"?: boolean;
  "o:skip-verification"?: boolean;

  // Custom Headers and Variables
  [header: `h:${string}`]: string;
  [variable: `v:${string}`]: Record<string, unknown>;

  // Recipient Variables
  "recipient-variables"?: Record<string, Record<string, unknown>>;
}
