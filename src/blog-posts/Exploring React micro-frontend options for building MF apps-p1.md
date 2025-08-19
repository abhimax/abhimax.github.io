# **Exploring React micro-frontend options for building MF apps.**

## Part 01 — Building from Scratch

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--819cc6602b80---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--819cc6602b80---------------------------------------)

4 min read

·

Jan 17, 2025

Micro frontend architecture is revolutionizing how we develop and deploy modern web apps. The main idea behind micro-frontends is to achieve scalability, flexibility, and ease in maintaining applications by breaking down gigantic applications into well-separated, autonomously deployable modules. This article will cover 4 methods for composing an MF app within React.

- Building from Scratch
- Using CRA with CRACO
- Using create-mf-app
- Using Vite with vite-plugin-federation

Let’s dive deeper into these approaches, their respective benefits, and when to use them.

I’ve shared a GitHub repository with all the methods explained [here](https://github.com/abhimax/react-micro-frontend-demo-series). You can check out the full source code there. I’ll keep this article short, but you can visit the GitHub URL for more details.

To demonstrate the architecture of each option, I have developed two applications **remote** and **host**. The **Remote** application acts as a micro frontend, exposing a simple Button component. This component is then utilized by the **host** micro frontend.

in this article, I will cover the “Building from Scratch” method as 1st Part to mark the article clean. will explain the other 3 methods in another 3 articles as part of this article.

# Building from Scratch

Building a React micro frontend app from scratch offers the most control and gives an idea of how React works and also great understanding of Webpack and Module Federation.

This means setting up the development environment manually using core tools like **React, ReactDOM, Babel, Webpack,** and **npm.** here I have explained the steps and please follow them to create the react app. After creating a react app called **remote** let's convert it to a Micro-Frontend Application. Also, Create a simple Button component to expose.

# Steps to set up the project

1. Initialize the Project

---

Run the following command to initialize a new Node.js project

```
npm init
```

This command will create a package.json file on the project folder based on your inputs.

## 2: Install React and React DOM

```
npm install react react-dom
```

Install the core dependencies for React

## 3: Install Development Dependencies

Install the necessary development dependencies for Babel and Webpack

```
npm install -D @babel/core @babel/plugin-proposal-class-properties @babel/preset-react babel-loader babel-preset-react html-webpack-plugin webpack webpack-cli webpack-dev-server
```

## 4: Create Project Structure

Create the following folders and files

```
public/
  index.html
src/
  index.js
  App.js
```

## 5: Configure Babel

Create a .babelrc file in the root directory with the following content:

```
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

Modify the webpack.config.js file to include Module Federation settings

```
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const mfObject = new ModuleFederationPlugin({
  name: "mfRemote",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/Button",
  },
});
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});
module.exports = {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 4001,
    historyApiFallback: {
      index: "/public/index.html",
    },
  },
  module: {
    rules: [      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [htmlPlugin, mfObject],
};
```

Now you have created a micro frontend application and expose button component as micro frontend. Run the application using **npm start** command to ensure that Webpack Module Federation is working and your application is exposed as a micro-frontend, open the following URL in your browser

[http://localhost:4001/remoteEntry.js](http://localhost:4001/remoteEntry.js)

You should see the module federation manifest file load successfully.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*6OlrUYKVPZzqXLNuXuNZFw.png)

## Host Micro-Frontend Configuration

You can make a simple react app call host by following the same steps as the above example. We are going to utilize a remote micro-frontend in this application.

Modify the webpack.config.js file to include Module Federation settings

```
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const mfObject = new ModuleFederationPlugin({
  name: "",
  filename: "remoteEntry.js",
  remotes: {
    mfRemote: "mfRemote@http://localhost:4001/remoteEntry.js",
    /* his is the key used to refer to the remote module in your application. It acts as an alias for the remote app and can be used in your code to import modules or components exposed by the remote app.*/
  },
});
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});
module.exports = {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 4000,
    historyApiFallback: {
      index: "/public/index.html",
    },
  },
  module: {
    rules: [      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [htmlPlugin, mfObject],
};
```

To use the Button component exposed by the remote app, update App.jsx as follows

```
import React from "react";
const MFRemoteButton = React.lazy(() => import("mfRemote/Button"));
const App = () => {
  return (
    <div className="container">
      <h1>Host MF</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <MFRemoteButton>From Remote MF</MFRemoteButton>
      </React.Suspense>
    </div>
  );
};
export default App;
```

Done! Now you can utilize remote microfrontend in your host app. Please note that you have to run the host app in another terminal since the remote app should be run in the background. If you follow the steps you should see this output when you run the host app.

![captionless image](https://miro.medium.com/v2/resize:fit:1368/format:webp/1*vFaQwJQd-9JXMJX-eca5ng.png)

This example covers the basics of React micro frontend architecture, giving you a strong foundation in the concept. If you feel like you missed anything, don’t worry! You can check out the [**basic**](https://github.com/abhimax/react-micro-frontend-demo-series/tree/main/basic) folder in my GitHub repository, where you’ll find a working application. Happy coding!!!
