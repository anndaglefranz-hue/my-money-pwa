MY MONEY PWA V2 — NO IFRAME
================================

WHAT CHANGED
- The PWA now runs the actual My Money frontend directly on Netlify.
- It no longer embeds Apps Script in an iframe.
- Firebase Authentication stays the same.
- Google Sheets + Apps Script remain the data backend.
- A Netlify Function acts as the secure same-origin bridge.
- Apps Script only exposes allowlisted Secure endpoints that still verify Firebase ID tokens.

IMPORTANT
This package must be deployed through a Netlify build (for example from GitHub),
because it contains a Netlify Function. Plain drag-and-drop static deployment
will NOT activate the function.

STEP 1 — APPS SCRIPT
1. Replace your current Code.gs with:
   Code_MY_MONEY_PWA_V2.gs.txt
2. Save.
3. Deploy > Manage deployments > Edit > New version > Deploy.
4. Keep the same /exec URL.

STEP 2 — NETLIFY THROUGH GITHUB
Upload this project structure to a GitHub repository:

  netlify.toml
  site/
    index.html
    manifest.webmanifest
    service-worker.js
    icon-192.png
    icon-512.png
  netlify/
    functions/
      my-money-api.js

Then in Netlify:
1. Add new site / Import an existing project.
2. Choose GitHub.
3. Select the repository.
4. Netlify reads netlify.toml automatically.
5. Deploy.

STEP 3 — TEST
- Open the new Netlify URL.
- Log in.
- Enter/create PIN.
- Confirm dashboard/accounts load after PIN.
- Add to Home Screen / Install App.

SECURITY NOTES
- The Firebase Web API key is intentionally present in the browser app; it is not a password.
- Every Sheets operation still requires a valid Firebase ID token on the Apps Script server.
- The PIN is only a local device lock and does not replace Firebase Authentication.
