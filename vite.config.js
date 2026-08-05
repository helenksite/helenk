import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: if you're deploying to https://<username>.github.io/<repo-name>/
// (a normal project repo), set base to "/<repo-name>/" below — e.g. "/helen-k-site/".
// If you're deploying to https://<username>.github.io/ (a repo literally named
// <username>.github.io), leave base as "/".
export default defineConfig({
  plugins: [react()],
  base: "/helen-k-site/",
});
