# Supercharge Your React Components with Higher-Order Components (HOCs) and React Hooks

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--454eabb17de4---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--454eabb17de4---------------------------------------)

4 min read | Aug 7, 2023

React is a popular JavaScript library for building modern, interactive user interfaces. One of its powerful features is the ability to create reusable and composable components. In this blog post, we’ll explore how to supercharge our React components using Higher-Order Components (HOCs) in combination with React Hooks. This powerful combination allows us to enhance the functionality and behavior of our components without sacrificing readability and maintainability.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cC9PQ00bv1_1CePwcttLhg.jpeg)

# **Higher-Order Components (HOCs)**

We’ll start by understanding Higher-Order Components (HOCs) and how they can extend component behavior and encapsulate common logic. HOCs are a pattern in React where a function takes a component as input and returns a new component with additional props or behavior. We’ll explore different HOC patterns and demonstrate how they can be used to share common functionality between multiple components, making it easier to reuse code and keep concerns separate.

# **Creating Reusable HOCs with React Hooks**

With the introduction of React Hooks, functional components can now manage state and lifecycle methods. In this section, we’ll explore how to use Hooks like `[useState](https://legacy.reactjs.org/docs/hooks-state.html)` and `[useEffect](https://legacy.reactjs.org/docs/hooks-effect.html)` within our HOCs to manage state and side effects efficiently. By combining HOCs with Hooks, we can build powerful and flexible abstractions that can be applied to any component in our application

# Composing HOCs and Keeping Code Clean

One of the key advantages of HOCs is their ability to compose multiple HOCs together to create complex behaviors without cluttering our component code. We’ll explore how to compose HOCs and manage their order to achieve the desired functionality. Additionally, we’ll discuss best practices for organizing and managing HOCs to keep our codebase clean and maintainable.

# Let’s Start with our First HOC 🚀

Before diving into complex examples, let’s understand the fundamentals of Higher-Order Components by creating a simple HOC. We’ll start with a basic React component and then convert it into a HOC to demonstrate how we can extend its behavior.

```
import React, { Component } from 'react';
// Our regular component
class MyComponent extends Component {
  render() {
    return <div>Hello, I am a regular component!</div>;
  }
}
// Our HOC function that takes a component as input and returns a new component
const withEnhancement = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <div style={{ border: '2px solid red', padding: '10px' }}>
          <p>This component is enhanced!</p>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};
// Using the HOC to enhance our component
const EnhancedComponent = withEnhancement(MyComponent);
// Rendering the enhanced component
const App = () => {
  return <EnhancedComponent />;
};
```

# Using HOCs in Real-World Scenarios

To demonstrate the practicality of HOCs with Hooks, we’ll apply them to real-world scenarios. We’ll see how we can use HOCs to handle internationalization, track component usage, or create a global state management system. These examples will highlight the power of HOCs and Hooks in making our components more flexible and scalable

## **Authentication HOC**

Next, we’ll implement an Authentication HOC, which handles authentication and protects certain components from unauthorized access. We’ll discuss the importance of authentication in web applications and how HOCs can provide a centralized way to handle authentication logic. The Authentication HOC will demonstrate how to secure components and manage access based on user authentication status or roles.

```
//HocAuthentication.jsx
import { checkAuthentication } from "./checkAuthentication";
// Higher-Order Component for handling authentication
function HocAuthentication(authKey, Component) {
  return function WithAuthentication(props) {
    const isLoggedIn = checkAuthentication(authKey);
    if (!isLoggedIn) {
      // You can perform redirect or other actions here if the user is not authenticated
      return <p>Please login to access this component.</p>;
    }
    // Render the original component if the user is authenticated
    return <Component {...props} />;
  };
}
export default HocAuthentication;

```

//PrivateComponent.js
// Sample component that requires authentication
function PrivateComponent() {
return <p>This is a private component that requires authentication.</p>;
}
export default PrivateComponent;

````
//checkAuthentication.js
import { useState } from "react";
// Simulated authentication check function
export const checkAuthentication = (password) => {
  const pwd = "abhiman";
  // Replace this logic with your actual authentication check (e.g., checking JWT, cookies, etc.)
  return pwd === password;
};
```

How to use it
-------------

```
import { useState } from "react";
import "./App.css";
import HocAuthentication from "./modules/Authentication/HocAuthentication";
import PrivateComponent from "./modules/Authentication/PrivateComponent";
function App() {
  const [isAuth, setAuth] = useState(false);
  function handleAuthentication(key) {
    setAuth(key);
  }
  const PrivateComponentWithAuth = HocAuthentication(isAuth, PrivateComponent);
  return (
    <>
      <button onClick={() => handleAuthentication("abhiman")}>Log in</button>
      <button onClick={() => handleAuthentication("anyfalsefwd")}>Log Out</button>
      <PrivateComponentWithAuth />
    </>
  );
}
export default App;
```

My git repo is here: [Authentication](https://github.com/abhimax/hoc-demo/tree/main/src/modules/Authentication)

Error Handling HOC
------------------

In this section, we’ll create an Error Handling HOC that catches errors occurring within components, displaying informative fallback UIs to users. We’ll explain the need for error handling in React applications and how HOCs can help provide a consistent error-handling mechanism. The Error Handling HOC will showcase how to catch and gracefully handle errors, improving user experience and simplifying error management.

You can check my git repo for the Error Handling sample code here: [ErrorHandling](https://github.com/abhimax/hoc-demo/tree/main/src/modules/ErrorHandling)

Conclusion
==========

Higher-Order Components (HOCs) and React Hooks are two powerful features in React that complement each other remarkably well. By combining HOCs and Hooks, we can build powerful and flexible abstractions, enhancing the functionality and behavior of our components. We’ve seen how HOCs can be used to extend component behavior, handle authentication, and manage errors effectively. As you explore these concepts further, you’ll find new and innovative ways to improve your React components and take your application to the next level.

Source code: [https://github.com/abhimax/hoc-demo](https://github.com/abhimax/hoc-demo)
````
