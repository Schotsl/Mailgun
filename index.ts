import { Config, Message } from "./types.ts";

export default class Mailgun {
  private basic: string;
  private endpoint: string;

  constructor(config: Config) {
    const base64 = btoa(`api:${config.key}`);

    this.basic = `Basic ${base64}`;
    this.endpoint =
      typeof config.region !== "undefined" && config.region === "eu"
        ? `https://api.eu.mailgun.net/v3/${config.domain}/messages`
        : `https://api.mailgun.net/v3/${config.domain}/messages`;
  }

  send(message: Message) {
    const form = new FormData();

    // For package simplicity we'll parse the reply property into the correct header
    if (message["reply"]) {
      message["h:Reply-To"] = message.reply;

      delete message["reply"];
    }

    for (const property in message) {
      if (Object.prototype.hasOwnProperty.call(message, property)) {
        const key = property as keyof Message;
        const value = message[key];

        this.mailgunStringify(key, value, form);
      }
    }

    const method = "POST";
    const headers = { Authorization: this.basic };

    return fetch(this.endpoint, { method, headers, body: form });
  }

  private mailgunStringify(
    key: keyof Message,
    value: Message[keyof Message],
    form: FormData,
  ): void {
    // Return early if the value is undefined
    if (value === undefined) {
      return;
    }

    // Handle single file
    if (value instanceof File) {
      form.append(key, value);

      return;
    }

    // Handle array of files
    const isArray = Array.isArray(value);
    const isFiles = isArray && value.every((item) => item instanceof File);

    if (isFiles) {
      value.forEach((file, index) => {
        form.append(`${key}[${index}]`, file);
      });

      return;
    }

    // Handle array of strings
    if (Array.isArray(value)) {
      const parsedValue = value.join(",");

      form.append(key, parsedValue);

      return;
    }

    // For all other types (boolean, string), convert to string and append
    const valueStringified = value.toString();

    form.append(key, valueStringified);
  }
}
