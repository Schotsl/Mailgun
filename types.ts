type region = "us" | "eu";

interface Config {
  key: string;
  domain: string;
  region?: region;
}

interface Message {
  // Will need this to index the object
  [key: string]: string;

  to: string;
  cc: string;
  bcc: string;
  html: string;
  text: string;
  from: string;
  subject: string;
}