# Boost Your Real-Time App Development with GraphQL Playground

## Part 02— Real-Time Message Board Testing

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--fa830dea6111---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--fa830dea6111---------------------------------------)

3 min read | Jun 19, 2024

![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*vTa2NTQX7m-nQ8g4VQk5wg.gif)

Hey there! In our last article, we walked you through building a super cool “[**Real-Time Message Board**](https://medium.com/p/69daee76a957)” using Node.js, Apollo GraphQL, React, and TypeScript. I hope you followed along and got both the server and client up and running smoothly. Today, we’re going to dive into GraphQL Playground, which I think will help clear up any confusion you might have about how GraphQL works. So, let’s get started!

After setting up both the server and client, you can use GraphQL Playground to test the server’s queries, mutations, and subscriptions.

# Start the Server

Navigate to the server directory and start the server

```
cd server
npm start
```

The server will be running on `[http://localhost:4000/graphql](http://localhost:4000/graphql.)`[.](http://localhost:4000/graphql.)

To get a better understanding of things, you can try running both the client and the GraphQL Playground at the same time and keep them side by side. This setup lets you see updates in real time and watch how the backend and Frontend interact through the GraphQL middleware.

# Open GraphQL Playground

Open your browser and navigate to `http://localhost:4000/graphql` to open GraphQL Playground. This interactive tool allows you to write and execute queries, mutations, and subscriptions.

# Test Queries

## Fetch All Messages

````
query GetMessages {
  messages {
    id
    content
  }
}
```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*-wAurhArf54EuENVLIUNIw.gif)

Fetch a Specific Message by ID
------------------------------

````

query GetMessage {
message(id: "1") {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*1AsVp4xvVMFb2h4rjsDEkg.gif)

Test Mutations
==============

Add a New Message
-----------------

```

mutation AddMessage {
addMessage(content: "Hello, GraphQL!") {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*2pgs-CningtDncOFKYuYaA.gif)

Update an Existing Message
--------------------------

```

mutation UpdateMessage {
updateMessage(id: "1", content: "Updated content") {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*aNkburTV0xj4etpv7pCiHQ.gif)

Delete a Message
----------------

```

mutation DeleteMessage {
deleteMessage(id: "1") {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*vuzWiNJDTQW-FSomv-dpIg.gif)

Test Subscriptions
==================

Subscribe to Message Additions
------------------------------

```

subscription OnMessageAdded {
messageAdded {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*IrsmHBQCQOXiLf0UdyAgLQ.gif)

Subscribe to Message Updates
----------------------------

```

subscription OnMessageUpdated {
messageUpdated {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*INlz8fXdNwKkqyut_9dMVA.gif)

Subscribe to Message Deletions
------------------------------

```

subscription OnMessageDeleted {
messageDeleted {
id
content
}
}

```![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*gZnSmzPoaX4dpzQK2DIo1A.gif)

Now that you’ve followed this guide, you should have a solid understanding of how to use GraphQL Playground to test and debug your real-time message board application. Running both the client and GraphQL Playground side by side gives you valuable insights into how the backend and Frontend interact through GraphQL. This hands-on experience with queries, mutations, and subscriptions will help you fully grasp the power of GraphQL and improve your development workflow. Don’t be afraid to keep experimenting with different operations to deepen your knowledge and create more efficient and interactive applications. Happy coding!

Follow me on GitHub for more updates and improvements. This is the enhanced version of the article above.

[https://github.com/abhimax/react-ts-graphql-real-time-message-board](https://github.com/abhimax/react-ts-graphql-real-time-message-board)
```
