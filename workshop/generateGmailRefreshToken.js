#!/usr/bin/env node
import { google } from "googleapis";

const CLIENT_ID = process.env.EMAIL_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.EMAIL_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.EMAIL_OAUTH_REDIRECT_URI || "https://developers.google.com/oauthplayground";

function requireEnv(name, value) {
  if (!value) {
    console.error(`Missing env ${name}`);
    process.exit(1);
  }
}

requireEnv("EMAIL_OAUTH_CLIENT_ID", CLIENT_ID);
requireEnv("EMAIL_OAUTH_CLIENT_SECRET", CLIENT_SECRET);

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scope = ["https://mail.google.com/"];

const codeArg = process.argv.find((a) => a.startsWith("--code="));
if (!codeArg) {
  const url = oauth2Client.generateAuthUrl({ access_type: "offline", prompt: "consent", scope });
  console.log("1) Open this URL in a browser and sign into the Gmail account that will send emails:");
  console.log(url);
  console.log("\n2) After consenting, copy the 'code' from the redirected URL.");
  console.log("3) Run this script again with --code=PASTE_CODE_HERE to exchange for a refresh token.");
  process.exit(0);
}

const code = codeArg.split("=")[1];

(async () => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);
    console.log("Token Type:", tokens.token_type);
    console.log("Expiry Date:", tokens.expiry_date);
    if (!tokens.refresh_token) {
      console.warn("No refresh token returned. Ensure you used prompt=consent and access_type=offline.");
    }
  } catch (err) {
    console.error("Failed to exchange code:", err.message);
    process.exit(1);
  }
})();
