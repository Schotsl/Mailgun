import { initializeEnv } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/v1.0.0/helper.ts";
import { region } from "./types.ts";

import Mailgun from "./index.ts";

initializeEnv([
  "MAILGUN_TO",
  "MAILGUN_KEY",
  "MAILGUN_REGION",
  "MAILGUN_DOMAIN",
]);

const to = Deno.env.get("MAILGUN_TO")!;
const key = Deno.env.get("MAILGUN_KEY")!;
const domain = Deno.env.get("MAILGUN_DOMAIN")!;
const region = Deno.env.get("MAILGUN_REGION")! as region;

const mailgun = new Mailgun({ key, region, domain });

Deno.test("check for status 200", async () => {
  const text = "This is a test email";
  const from = "testing@mailgun.sjorsvanholst.nl";

  const subject = "Testing Mailgun";
  const testing = true;

  const response = await mailgun.send({ to, text, from, subject, testing });

  // If the Mailgun API returns a 200 OK will consider the test as passed
  if (response.status !== 200) {
    throw new Error(`Mailgun API returned status code ${response.status}`);
  }

  // Cancel the body consumption to prevent memory leaks
  response.body?.cancel();
});
