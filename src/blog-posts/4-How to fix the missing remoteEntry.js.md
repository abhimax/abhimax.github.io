# How to fix the missing remoteEntry.js issue in Vite-Based Micro Frontends

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--05dd93ed8750---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--05dd93ed8750---------------------------------------)

3 min read | Aug 16, 2024

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ecG1NIAGYbbqFBHb8JULiw.jpeg)

When developing Micro-Frontend Apps using Vite and module federation, you might face the challenge of the remoteEntry.js file being unavailable during local development. This file is essential for sharing components in different parts of your app, and without it you cannot effectively test your setup. See how I solved that here and everything was fine. Here’s how I resolved this issue and got everything working smoothly.

Here I put both remote and host micro Fronends vite.config files. From this, you will see what I was trying to do.

## remote micro frontend App — `vite.config.ts`

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
export default defineConfig({
  plugins: [    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

## host micro frontend App — `vite.config.ts`

```
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [    react(),
    federation({
      name: "app",
      remotes: {
        remoteApp: "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

# The Issue

When dealing with a Micro-Frontends architecture in Vite, you expect the remoteEntry.js file to be available for your host app to load components from the remote app. However, when running the remote app in development mode (npm run dev), this file wasn’t being generated or served. Actually, it’s no error being displayed, which makes the issue seem rather unusual. This made it impossible to test my micro frontend locally.

# Why It Happens

Vite’s dev server is optimized for speed and It does not build artifacts like remoteEntry.js during development. These files do not actually exist, they are only created during the production build process (thus you see them when running npm run preview and npm run build).

# The Solution

To work around this I have created a custom script that will build the remote app and serve it using Vite’s preview server. This approach lets me test the micro frontend as it would behave in production.

Here’s how you can set it up

1. Update the Remote App’s `package.json`

---

Add a custom script called start-mf to run both the build and preview steps

```
{
  "name": "remote",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite --port 5001 --strictPort",
    "build": "vite build",
    "preview": "vite preview --port 5001 --strictPort",
    "start-mf": "npm run build && npm run preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.5",
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

2. Running the Solution

---

To test everything locally, run: npm run start-mf

this command builds the remote app and then serves it, making the remoteEntry.js file available for the host app to load.

# Conclusion

If you’re working with micro frontends and Vite, and you run into issues with missing remoteEntry.js during development, try this approach. It allows you to test your setup locally in a way that closely resembles the production environment, avoiding the frustration of missing files.
