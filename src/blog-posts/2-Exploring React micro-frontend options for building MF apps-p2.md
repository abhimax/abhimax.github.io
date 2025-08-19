# Exploring React micro-frontend options for building MF apps.

## Part 02 — CRA with CRACO

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--6720f36f56e4---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--6720f36f56e4---------------------------------------)

4 min read | Feb 28, 2025

![captionless image](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*qcjnA5XaNoCOnj7tpmFbPQ.png)

In the previous article, we covered how to build a basic micro-frontend application from scratch. We explored four approaches for creating React Micro Frontend applications.

- [Starting from scratch](https://medium.com/front-end-weekly/exploring-react-micro-frontend-options-for-building-mf-apps-819cc6602b80) — (Part 01 of this Article)
- **Using CRA with CRACO**
- Using create-mf-app
- Using Vite with vite-plugin-federation

This article focuses on using Create React App (CRA) and CRACO to convert a standard React application into a micro-frontend.

As always, I’ve provided my [GitHub repository](https://github.com/abhimax/react-micro-frontend-demo-series) that includes all the methods discussed, along with the full source code for reference. While I’ll keep this article brief, you can visit and check each of projects for a more detailed walkthrough. To illustrate the architecture, I’ve created two applications: **remote** and **host**. The remote application serves as a micro-frontend, exposing a simple Button component, which is then integrated into the host application.

# Benefits of CRA with CRACO:

- Quick project setup with CRA.
- Access to CRA’s optimized build process.
- Customization of Webpack for Module Federation integration.
- Flexibility in converting existing react app to a micro frontend.

# Steps to Set Remote App

1. initializes a new React app

---

First, create a new React app using [CRA](https://create-react-app.dev/). I’m going to use typescript template here.

```
npx create-react-app remote --template typescript
cd remote-app
```

2. Install CRACO

---

Install CRACO to configure and override CRA’s default configuration

```
npm install @craco/craco
```

3. Update Scripts

---

Replace the default CRA scripts with CRACO scripts in the package.json

```
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "craco eject"
  }
```

4. Configure CRACO

---

Create a CRACO configuration file in your project’s root directory and [configure](https://craco.js.org/docs/configuration/getting-started/)

```
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  mode: "development",
  devServer: {
    port: 3002,
  },
  webpack: {
    plugins: [      new ModuleFederationPlugin({
        name: "mfRemote",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/components/Button",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    configure: {
      output: {
        publicPath: "auto",
      },
    },
  },
};
```

5. Create a Button Component to Expose

---

In the src folder, create a new component called Button

```
const Button = () => {
  return <button>This is Remote Button</button>;
};
export default Button;
```

6. Start the Remote Application

---

Run the remote app using the following command

```
npm start
```

Verify that the Module Federation manifest is available at `[http://localhost:3000/remoteEntry.js](http://localhost:3000/remoteEntry.js)5`

# Steps to Set Remote App

To make the remote micro frontend you have to follow the same steps to create a react APP using CRA with app name “remote”. You are going to utilize the Button component from host micro frontend app here.

## Configure CRACO

So need to create a CRACO configuration file in your project’s root directory and add following contents.

```
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
module.exports = {
  mode: "development",
  devServer: {
    port: 3003,
  },
  webpack: {
    plugins: [      new ModuleFederationPlugin({
        name: "hostApp",
        remotes: {
          mfRemote: "mfRemote@http://localhost:3002/remoteEntry.js",
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
    ],
    configure: {
      output: {
        publicPath: "auto",
      },
    },
  },
};
```

The name of the current application is set as `"hostApp" and` This name identifies the app when it’s consumed by others. Specifies the **remote modules** that the host app will consume `mfRemote`: The remote app is named `"mfRemote"`. The remote module’s code will be fetched from `[http://localhost:3002/remoteEntry.js](http://localhost:3002/remoteEntry.js.)`[.](http://localhost:3002/remoteEntry.js.)

## Use Button component in App.tsx

Now you can use Button component (shared from remote Micro frontend) in the app.tsx like this.

```
import React, { Suspense } from "react";
import "./App.css";
const Button = React.lazy(() => import("mfRemote/Button"));
function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Button />
      </Suspense>
    </div>
  );
}
export default App;
```

Done! Now you can utilize remote microfrontend in your host app. Now it’s time to run the application. You can run the application using **npm start** command and you should be in the “host” app root on the turminal.

Please note that you have to run the host app in another terminal since the remote app should be run in the background. If you follow the steps you should see this output when you run the host app.

![captionless image](https://miro.medium.com/v2/resize:fit:1320/format:webp/1*eD__oVfrCDE5icKg7spKOA.png)

This article walked through the process of setting up a micro-frontend application using Create React App (CRA) along with CRACO and Module Federation. As I explained in [my previous artical](https://medium.com/front-end-weekly/exploring-react-micro-frontend-options-for-building-mf-apps-819cc6602b80) there are many options to start developing a Micro Friontend Application. Whether you’re starting fresh or leveraging other tools like create-mf-app or Vite, CRA paired with CRACO offers a fast and adaptable approach to micro-frontend development. For a more hands-on experience, check out my linked [GitHub repository](https://github.com/abhimax/react-micro-frontend-demo-series/tree/main/cra) . Happy coding!
