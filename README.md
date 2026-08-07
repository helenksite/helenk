# Helen K — Website Project

This is a ready-to-deploy version of your storefront (`src/App.jsx` is the
same file you already have — just wired into a proper buildable project).

## 1. Push it to GitHub

If you don't already have Git set up: install it from git-scm.com, then:

```bash
cd helen-k-site
git init
git add .
git commit -m "Initial commit — Helen K storefront"
```

Create a new repository on GitHub (github.com → New repository). Name it
`helen-k-site` (or anything you like — just remember it, see step 2).
Don't add a README/gitignore there since you already have them.

Then connect and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/helen-k-site.git
git branch -M main
git push -u origin main
```

(GitHub will ask you to sign in — either via browser login or a personal
access token, which GitHub will prompt you to create if needed.)

## 2. Match the repo name in vite.config.js

Open `vite.config.js` and check the `base` line:

```js
base: "/helen-k-site/",
```

This must match your repo name exactly, with slashes on both ends. If you
named your repo something else, change this to match — e.g. repo
`my-store` → `base: "/my-store/"`.

**Exception:** if your repo is named exactly `YOUR-USERNAME.github.io`,
set `base: "/"` instead.

## 3. Turn on GitHub Pages

On GitHub: your repo → **Settings** → **Pages** (left sidebar) →
under "Build and deployment", set **Source** to **GitHub Actions**.

That's it — the workflow file already included
(`.github/workflows/deploy.yml`) will automatically build and publish the
site every time you push to `main`. Check the **Actions** tab on your repo
to watch it run (takes about a minute).

Your site will be live at:

```
https://YOUR-USERNAME.github.io/helen-k-site/
```

## 4. Making changes later

Edit `src/App.jsx` (this is your storefront code — same file as before),
then:

```bash
git add .
git commit -m "Update products"
git push
```

The site rebuilds and redeploys automatically within a minute or two.

## 5. Important: the backend needs separate hosting

GitHub Pages only serves static files — it can't run your Node.js backend
(the `helen-k-backend` folder). That still needs Railway, Render, or
similar (see that project's own README). Once it's deployed there, set
`API_BASE_URL` near the top of `src/App.jsx` to that backend's URL, commit,
and push — the live site will pick it up automatically.

Until then, the site runs fine on its own using its built-in fallback
product list — nothing breaks, you just won't have saved orders or
server-verified payments yet.

## Local preview (optional)

Want to see it on your own computer before pushing?

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.
