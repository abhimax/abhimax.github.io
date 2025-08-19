# Building a Real-Time Message Board with Node, Apollo GraphQL, React and TypeScript

## Part 01 — Sever and Client App Development

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--69daee76a957---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--69daee76a957---------------------------------------)

6 min read | Jun 19, 2024

![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*7SiUVWFSTX1c8GBxepRuPg.gif)

# Introduction

In this article, I will take you through the steps of creating a real-time message board Web application. This project demonstrates Full CRUD (Create, Read, Update, Delete) with real-time updates by using GraphQL subscriptions. We will be using Node.js and Apollo Server for the backend, and React with TypeScript and Vite for the frontend. Styling will be handled using SASS.

## Technologies Used

- Node: JavaScript run-time for the backend.
- Apollo Server: GraphQL server, used to consume queries, mutations, and subscriptions.
- React: JavaScript library for declarative UIs
- TypeScript: Java Script with Type Safety
- Vite: Next-generation front-end tooling for faster builds.
- SASS: CSS preprocessor for more flexible and maintainable styles

# Project Setup

## Backend Setup

Step 1: Initialize the Server

Create a directory for your server and initialize a Node.js project

```
mkdir server
cd server
npm init -y
```

## Step 2: Install Dependencies

Install the required dependencies

```
npm install @apollo/server graphql ws subscriptions-transport-ws express
npm install --save-dev typescript @types/node @types/ws @types/expres
```

## Step 3: Configure TypeScript

Create a `tsconfig.json` file in the server directory

```
{
    "compilerOptions": {
      "target": "ES2019",
      "module": "commonjs",
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "./dist"
    },
    "include": ["./**/*.ts"]
  }
```

## Step 4: Create the Server

Create a `src` directory and add a `server.ts` file

The code created a GraphQL server using Apollo Server and Express, that can be used by the client for subscription, and for real-time updates. It describes a schema that has types, queries, mutations, and subscriptions related to the messages. It saves messages with an in-memory array and subscription events with a PubSub instance.

The server executes the merged type definitions and resolvers into a schema and connects it with an Express application. Conticule uses WebSocket to manage subscriptions, so if you subscribe to it you will receive real-time changes in the client.

Also, middleware interfaces were added for CORS to parse JSON request bodies and listen on port 4000 for a streaming solution to persist and update messages in memory and in real-time.

2. # Frontend Setup

## Step 1: Initialize the Client

Create a directory for your client and initialize a Vite project with React and TypeScript

```
mkdir client
cd client
npm create vite@latest --template react-ts
npm install
```

## Step 2: Install Dependencies

Install the required dependencies for Apollo Client and SASS.

```
npm install @apollo/client graphql subscriptions-transport-ws
npm install sass
```

## Step 3: Configure Apollo Client

Create a `src/apolloClient.ts` file to set up Apollo Client.

This example is a final setup that will include configuring an Apollo Client for a React application and making it able to connect to a GraphQL server with HTTP and WebSocket protocols. This puts an HttpLink for regular queries/mutations by way of HTTP, in addition to a WebSocketLink for real-time subscriptions.

The split function was written such that operations are directed to the correct link based on the type of operation. These links are used to initialize an ApolloClient along with an in-memory cache for effective data management.

Then the API client and ApolloProvider are configured for the application to provide a simple and clean integration of the GraphQL into the application and to receive real-time updates as well.

## Step 4: Create the Messages Component

Create a `src/Messages.tsx` file to handle displaying, adding, updating, and deleting messages.

The purpose of this React component, Messages, is to use Apollo Client for GraphQL queries, modifications, and subscriptions in order to manage a list of messages. It maintains the state up to current with real-time updates while retrieving existing messages, adding new ones, updating old ones, and deleting messages.

The component communicates with the backend using GraphQL operations: ADD_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, and GET_MESSAGES for retrieving messages, adding new messages, and updating messages. The MESSAGE_ADDED, MESSAGE_UPDATED, and MESSAGE_DELETED subscriptions make sure that the UI updates automatically whenever changes are made to the server.

The component offers handlers for adding, editing, and removing messages in addition to maintaining the local state for error and message input.

## Step 5: Create the App Component

Update `src/App.tsx` to use Apollo Provider and include the Messages component.

The Main App component of a React application is defined by this code. It passes it to a specified Apollo Client instance and wraps the entire application using the ApolloProvider. This configuration guarantees that Messages and other child components can communicate with the GraphQL server.

Rendering inside the main application layout, the Messages component manages the real-time fetching, displaying, and updating of messages. All across the component tree, the ApolloProvider makes the Apollo Client accessible, allowing for smooth GraphQL queries, modifications, and subscriptions.

## Step 6: Style the Component

Create a `src/Messages.module.scss` file to style the `Messages` component. I used the SCSS module to style it.

```
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    .error-text{
      background-color: #dc3545;
      color: #ffffff;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .close{
        background-color: #ffffff;
        color: #dc3545;
        border: none;
        border-radius: 5px;
      }
    }
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .messageList {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #444444;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      color: #ffffff;
    }

    button {
      margin-left: 10px;
      padding: 5px 10px;
      border: none;
      border-radius: 3px;
      background-color: #007bff;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }

      &:first-of-type {
        background-color: #28a745;

        &:hover {
          background-color: #218838;
        }
      }

      &:last-of-type {
        background-color: #dc3545;

        &:hover {
          background-color: #c82333;
        }
      }
    }
  }

  .inputGroup {
    display: flex;
    margin-top: 20px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      margin-right: 10px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 3px;
      background-color: #007bff;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
```

# Optimized Component Structure and Best Practices

To make the main ideas of this project easier for you to understand, I have simplified my explanations. However, it’s critical to leverage appropriate component structures, custom hooks, and TypeScript types to increase reusability and maintainability.

## Enhancing the Basic App

# Key Enhancements

**Custom Hooks**

Encapsulated all GraphQL operations into a custom hook (`useMessages`). This ensures proper cache management and cleaner code.

**Component Division**

- **Messages:** Manages state and data flow.
- **MessageList:** Displays messages and handles updates/deletions.
- **MessageInput:** Manages input for adding messages.

**Replacing Prompt with Modal**

Replaced the edit message prompt with a reusable `Modal` component for a better user experience.

**Reusable Components:**

Developed reusable components (`Button`, `Alert`, `Modal`) and used them consistently across the app to ensure uniform styling and behavior

**Real-time update indicator with toast**

# Source Code

_I have shared the improved version with the above improvements on my Github. Please follow_ [**react-ts-graphql-real-time-message-board**](https://github.com/abhimax/react-ts-graphql-real-time-message-board)

_If you want to get the same code we practiced above, please use the “_**_basic_**_” branch of the same repository._

# Conclusion

This blog article describes how we used Node.js, Apollo Server, React, TypeScript, Vite, and SASS to create a real-time message board application. We went over how to use Apollo Client to create a React client, how to set up a GraphQL server with subscriptions, and how to use SASS to style the components. This project demonstrates how cutting-edge web technologies can be used to produce a responsive, real-time application.

_To continue with Part 2 of this article, please follow_ [**_Real-Time Message Board Testing with GraphQL Playground_**](https://medium.com/p/fa830dea6111)
