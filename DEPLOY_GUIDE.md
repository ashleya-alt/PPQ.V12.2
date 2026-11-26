# Platform Payments Quest V12.2 — Vercel Deployment Guide

This guide documents how an authorized owner can deploy package version **12.2.0**. Building this source does not deploy it, and the V12.2 preparation process performed no live deployment.

## Prerequisites

You need **`sso-vercel-member`** role (or higher) to deploy projects.
If you only have viewer access, go to LMS → Permissions → search
`sso-vercel-member` and request it.

---

## Step 1: Download the Project Files

Download and unzip `ppq-v12.2.zip`. The archive contains the `ppq-v12.2/` project folder, including source, tests, overview, and validation notes.
Put it somewhere easy to find, like your Desktop or Documents:

```
~/Desktop/platform-payments-quest/
```

---

## Step 2: Open Terminal and Navigate to the Folder

Open **Terminal** (Cmd+Space → type "Terminal" → Enter), then:

```bash
cd ~/Desktop/platform-payments-quest
```

(Adjust the path if you put it somewhere else.)

---

## Step 3: Install Dependencies

```bash
npm install
```

This creates a `node_modules/` folder with React, Vite, and TypeScript.
Takes about 30 seconds.

---

## Step 4: Test Locally (Optional but Recommended)

```bash
npm run dev
```

Open http://localhost:5173 in your browser. You should see the game!
Play through a few encounters to verify everything works.

Press **Ctrl+C** in Terminal to stop the local server when done.

---

## Updating an Existing Deployment (older build → V12.2)

Replace the old project folder contents with the V12.2 source, run the validation commands below, and only then run the authorized deployment command:

```bash
npm run test
npm run typecheck
npm run build
```

The release workspace also runs offline Deno checks, simulations, and an esbuild source-graph bundle. Those supplemental checks do **not** replace `npm run typecheck`, a real Vite production build, or browser validation at 320/375/480px and 200% zoom. Verify the wrapped header, score rows, `100`, signed values, grades, and the four-tier Roads Not Taken ladder in a browser before deployment.

Then, if you intend to deploy, run:

```bash
vercel --prod
```

Answer **Y** to "Link to existing project?" and pick `platform-payments-quest`. Same URL, new version.

---

## Step 5: Deploy to Stripe's Vercel

### Option A: Vercel CLI (Fastest — no GitHub needed)

1. **Install the Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Log in to Stripe's Vercel team:**
   ```bash
   vercel login
   ```
   - Select **Continue with SAML SSO**
   - When prompted for team slug, enter: **stripe**
   - Complete the SSO flow in your browser

3. **Deploy:**
   ```bash
   vercel
   ```
   It will ask you a few questions:
   ```
   ? Set up and deploy? → Y
   ? Which scope? → Stripe (select the Stripe team)
   ? Link to existing project? → N
   ? What's your project's name? → platform-payments-quest
   ? In which directory is your code located? → ./ (just press Enter)
   ? Want to modify these settings? → N
   ```

   Vercel auto-detects Vite and builds it. After ~60 seconds you'll see:
   ```
   ✅ Production: https://platform-payments-quest-xxxxx.vercel.app
   ```

4. **That URL is your game!** Share it with the team.

### Option B: Via GitHub (Better for Long-Term)

1. **Create a GitHub repo** (in your personal GitHub or ask WPP for a `stripe-wpp` repo):
   ```bash
   git init
   git add .
   git commit -m "Platform Payments Quest RPG V12.2"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/platform-payments-quest.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/stripe (make sure you're on the Stripe team)
   - Click **Add New → Project**
   - Import your GitHub repository
   - Framework preset will auto-detect **Vite**
   - Click **Deploy**

3. Every future `git push` auto-deploys.

---

## Step 6: Access Control

By default, Stripe Vercel projects have **Vercel Authentication** enabled.
This means only people logged into Stripe's Vercel team can view it —
perfect for an internal training tool.

If you want to make it accessible to anyone with the link (no login):
- Go to your project on vercel.com/stripe
- Settings → Deployment Protection
- Adjust as needed

---

## Troubleshooting

**"Command not found: npm"**
→ Install Node.js first: https://nodejs.org (LTS version)

**"SAML authentication failed"**
→ Make sure you accepted the Vercel invitation email (check Spam)
→ Don't be logged into a personal Vercel account when accepting

**Build fails on Vercel**
→ Run `npm run build` locally first to see the error
→ Most common: TypeScript strict errors (already handled in this project)

**Need help?**
→ Slack: #ext-stripe-vercel or #core-apps

---

## Deploying via GitHub → Vercel (recommended for V12+)

Pushing the project to GitHub lets Vercel build and deploy automatically on every push.

### A. Create the GitHub repository (one time)
1. Go to https://github.com/new → name it `platform-payments-quest` → **Private** → leave "Add a README" unchecked → **Create repository**.
2. In Terminal, from the unzipped project folder:
   ```bash
   cd ~/Desktop/platform-payments-quest   # adjust to where you unzipped ppq-v12.2
   git init
   git add .
   git commit -m "PPQ V12"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/platform-payments-quest.git
   git push -u origin main
   ```
   (`.gitignore` already excludes `node_modules/` and `dist/`, so the repo stays small.)

### B. Connect Vercel (one time)
1. https://vercel.com/new → **Import Git Repository** → pick `platform-payments-quest`.
2. Vercel auto-detects **Vite**. Confirm: Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`. No environment variables needed.
3. Click **Deploy**. First build takes ~1 minute; you'll get a `*.vercel.app` URL.

### C. Shipping future updates
```bash
git add .
git commit -m "describe the change"
git push
```
Vercel redeploys automatically; the Deployments tab shows build logs and a preview URL per commit.

### Troubleshooting
- **Build fails on type errors**: run `npx tsc --noEmit` locally to see them; `npm run build` (Vite) does not type-check, so the Vercel build should still pass.
- **Blank page after deploy**: hard-refresh (Cmd+Shift+R); confirm Output Directory is `dist`.
- **Drag-and-drop in the mini-game feels off on trackpad/touch**: use the ▲/▼ arrows; report what you saw and we'll tune it.
