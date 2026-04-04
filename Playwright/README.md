# App2025 Playwright tests

This folder contains Playwright end-to-end tests for the App2025 web application.

Quick start (Windows PowerShell):

1. Open PowerShell and change to this folder:

   Set-Location -Path "C:\Github\App2025\Playwright"

2. Install dependencies:

   npm install

3. (Optional) If your app is not at http://localhost:3000, set the base URL:

   $env:PLAYWRIGHT_BASE_URL = 'http://your-app-url:port'

4. Install Playwright browsers (only needed first time):

   npx playwright install

5. Run the tests:

   npm test

Notes:
- The sample test hits the configured base URL (default http://localhost:3000).
- Add more tests under the `tests/` folder.
