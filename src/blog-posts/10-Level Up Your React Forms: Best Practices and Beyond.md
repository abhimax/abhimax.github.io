# Level Up Your React Forms: Best Practices and Beyond

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--5f4938a43a03---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--5f4938a43a03---------------------------------------)

11 min read | Oct 1, 2023

Forms are like the questionnaires of the internet. They help websites collect information from you, whether it’s signing up for a service, searching for something, or leaving a comment.

In this article, we’ll explore how React.js, a popular tool for building websites, has different ways to handle these forms. It’s a bit like having a toolbox with various tools for different jobs. We’ll also see why choosing the right tool for each task is so important.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KxW5pkEoUiSSJdir0RfNOg.png)

1.  # Controlled Components

In React, controlled components are a fundamental concept when it comes to handling forms. They are a way to maintain and control the state of form elements within your React components. In this section, we’ll explore what controlled components are, their benefits, and how to create and use them effectively.

## What Are Controlled Components and Their Benefits?

Controlled components are form elements, such as input fields and checkboxes, whose values are controlled by React’s state. Instead of relying solely on the DOM to manage form data, you keep the form element’s value in the component’s state and update it via event handlers.

⚡ **Single Source of Truth:** _The form data is stored in the component’s state, providing a single source of truth. This makes it easier to access, manipulate, and validate form values._

⚡ **Dynamic Updates:** _Since you have control over the form data, you can dynamically update and react to changes. For instance, you can show or hide elements based on user input or validate fields in real-time._

⚡ **Easy Form Reset:** _Resetting the form to its initial state becomes straightforward since you can simply revert the state to its initial values._

## How to Create Controlled Components Step-by-Step 🚀

Let’s walk through the process of creating a controlled component step by step. For this example, we’ll create a controlled input component to handle a user’s name.

**Initialize State**: _Start by initializing a state variable to hold the form data. In our case, it’s the user’s name._

```
import React, { useState } from 'react';
function ControlledForm() {
  const [name, setName] = useState('');
  // ...
}
```

**Attach Event Handler**: _Next, attach an event handler to the input element to update the state whenever the input changes._

```
function ControlledForm() {
  const [name, setName] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      {/* ... */}
    </div>
  );
}
```

**Display the Value**: _Finally, display the value from the state in the input element. The_ `_value_` _prop ensures that the input always reflects the state's value._

```
function ControlledForm() {
  const [name, setName] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
      {/* ... */}
    </div>
  );
}
```

**Controlled Components and Form Validation**

\_Controlled components play a crucial role in form validation. By controlling the form data, you can easily implement validation checks. For instance, you can prevent form submission if required fields are empty or if the data entered doesn’t meet specific criter_ia.

Here’s a simple example of how controlled components help with form validation

```
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };
  const handleSubmit = () => {
    if (isValid) {
      // Submit the form
    } else {
      // Display an error message or prevent submission
    }
  };
  // ...
}
```

In this example, we’re validating an email input and updating the `isValid` state based on whether the entered email is valid. This information can then be used to control form submission.

2. # Uncontrolled Components

While controlled components offer precise control over form elements, there are situations where uncontrolled components may be a more suitable choice. In this section, we’ll explore what uncontrolled components are, when they might be a better choice, and how to work with them using React refs.

## What Are Uncontrolled Components and When to Use Them?

Uncontrolled components, in contrast to controlled ones, allow the DOM to maintain the form element’s state. Instead of controlling the value through the React state, you rely on the DOM’s internal state. Uncontrolled components are typically used when:

⚡ **Accessing Legacy Code**: _When integrating React with existing non-React code or libraries, uncontrolled components can provide an easier way to manage form elements since they don’t rely on the React state._

⚡ **Performance Optimization**: _In situations where controlled components introduce unnecessary re-renders, uncontrolled components can offer better performance._

⚡ **Complex Forms**: _Uncontrolled components can simplify the management of complex forms with numerous input elements by reducing the need to create and manage state variables for each._

**Using Refs with Uncontrolled Components**

To work with uncontrolled components, you can use React refs to access and manipulate DOM elements directly. Here’s an example of how to use a ref with an uncontrolled input

```
import React, { useRef } from 'react';
function UncontrolledForm() {
  const inputRef = useRef(null);
  const handleSubmit = () => {
    const inputValue = inputRef.current.value;
    // Perform actions with inputValue...
  };
  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Enter data" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

In this example, we create an uncontrolled input element and attach a ref to it using `useRef`. When the "Submit" button is clicked, we access the input's value through the ref's `current` property.

**Scenarios Where Uncontrolled Components Are Useful**

⚡ **Third-party Libraries**: _When using third-party libraries that manage their state internally, such as date pickers or rich text editors, uncontrolled components can seamlessly integrate with these libraries._

⚡ **Performance-Critical Applications**: _In applications where performance is critical and you want to minimize unnecessary re-renders, uncontrolled components can be more efficient._

⚡ **Legacy Code Integration**: _When working on projects with legacy codebases or non-React parts, uncontrolled components simplify form integration without significant code changes._

⚡ **Large Forms**: _Handling large forms with numerous input fields can become cumbersome with controlled components. Uncontrolled components allow you to reduce the amount of state management code._

It’s essential to evaluate your project’s specific requirements and constraints when deciding whether to use controlled or uncontrolled components. Each approach has its advantages, and the choice should align with your application’s needs and performance considerations.

3. # Form Libraries and Hooks

In addition to native React techniques, leveraging form libraries and React hooks can streamline form handling. In this section, we’ll briefly introduce two popular form libraries, Formik and React Hook Form, and explore how React hooks simplify form management.

## Formik and React Hook Form

> **Formik :** A widely used form library for React, Formik simplifies complex forms and reduces the boilerplate code required for form handling, including validation and submission.
>
> **React Hook Form**: This library leverages React hooks to efficiently manage forms with an emphasis on performance and minimal re-renders. It provides features for form validation and submission.

## Benefits of Using Form Libraries

⭐ **State Management**: _Simplifies form element state management, including validation and error handling._

⭐ **Validation**: _Provides built-in validation features for defining and enforcing rules._

⭐ **Error Handling**: _Easily displays error messages next to relevant form fields._

⭐ **Form Submission**: _Streamlines form submission, data formatting, and API requests._

⭐ **Performance**: _Designed for performance, minimizing unnecessary re-renders._

## Using Form Libraries and React Hooks in a React Application

Here’s a simplified example of how to use Formik to create a controlled form

```
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
function MyForm() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };
  const onSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <Field type="text" id="firstName" name="firstName" />
          <ErrorMessage name="firstName" component="div" />
        </div>
        {/* Repeat for lastName and email */}
        <button type="submit">Submit</button>
      </form>
    </Formik>
  );
}
```

## Simplifying Form Management with React Hooks

React hooks like `useState` and custom hooks can simplify form management without the need for external libraries. For example, here's a basic form using `useState`

```
import React, { useState } from 'react';
function SimpleForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields and event handlers */}
    </form>
  );
}
```

React hooks simplify form management by allowing you to encapsulate form state and logic within functional components, making your code more concise and readable.

4. # Form Validation

Imagine you’re a teacher checking homework. Form validation is a bit like that it’s making sure the answers are right before you accept them. In React, there are a few ways to do this.

## Client-Side Checking

This is like checking your own work. You look at the answers you’ve written on your paper and see if they make sense. In React, it means checking the answers inside your form before sending them anywhere. It’s quick but might not catch everything.

## Server-Side Checking

This is like sending your homework to the teacher. The teacher checks it thoroughly to make sure everything is perfect. In React, it means sending the answers to a server, which checks them carefully. It takes more time but is very reliable.

## Examples of How to Check and Correct Forms

Here are some simple examples of checking and correcting forms in React

```
// Client-Side Checking
function ClientSideValidation() {
  // Check the answers as you go
  // Show error messages if something is wrong
  // ...
}
// Server-Side Checking
function ServerSideValidation() {
  // Send your answers to the teacher (server)
  // Wait for the teacher's feedback (response)
  // Show error messages based on the feedback
  // ...
}
```

By using these methods, you can make sure that the answers on your forms are just right.

5. # Form Submission

When you’ve completed your homework, you need to turn it in. In web development, that’s called form submission. In React, it’s like sending your homework to the teacher.

## Steps to Handle Form Submission

👉 **Getting Ready**: _First, make sure your homework (the form) is complete. Check it one last time to be sure._

👉 **Sending to the Teacher (Server)**: _To submit your form, you send it to a teacher (the server). This teacher carefully checks your work and makes sure it’s correct._

👉 **Waiting for Feedback (Response)**: _After sending, you wait for the teacher’s feedback (response). It tells you if your work is good or if there are any mistakes._

## **Best Practices for Sending Form Data**

**Be Clear**: _When sending your homework, make sure it’s neat and organized so the teacher can understand it easily._

**Use Secure Channels**: _Just like you wouldn’t want someone to see your homework answers, make sure your form data is sent securely to the teacher (server)._

## Preventing the Homework from Getting Lost

Sometimes, you need to prevent your homework from getting lost on the way to the teacher. In React, this is like making sure your form doesn’t disappear before it’s sent.

```
// Preventing Default Submission
function handleFormSubmit(event) {
  event.preventDefault(); // Stop the form from disappearing
  // Send your homework (form) to the teacher (server)
}
```

## Handling Homework That Takes Time

If your homework takes a long time to complete, you don’t want to sit there and wait. In React, this is like doing other things while waiting for your form to be checked.

```
// Asynchronous Submission
function submitFormAsynchronously() {
  // Send your homework (form) to the teacher (server)
  // While waiting, you can do other tasks
}
```

6. # State Management and Form Reusability

## Keeping Track of Your Homework (Form State)

Imagine you have lots of different homework assignments (forms), and you need to keep track of where you left off in each one. That’s a bit like managing form state in a big web application.

## Strategies for Managing Form State

**Using a Homework Notebook (State Container)**: _It’s like having a special notebook where you jot down your progress on each homework. In React, this is a state container, like Redux or the_ `_useState_` _hook._

**Reusing Your Homework (Form Reusability):** _Sometimes, you have similar homework assignments in different classes. Instead of starting from scratch each time, you can reuse what you’ve done before. In React, this means making your forms work everywhere._

## Making Your Homework (Form) Reusable

Imagine you have a fantastic way to solve a math problem, and you want to use it for different assignments. In React, you can make your forms reusable too!

**Using React Contex**t: It’s like sharing your solution with all your math classes. React Context allows you to share the form state across different components without passing it through each one manually.

**Sharing with Friends (Props)**: When you share your solution with a friend, they can use it in their assignments. In React, you can pass the form state as props to other components, so they can use it too.

```
// Using React Context
const FormContext = React.createContext();
// You can then provide and use the form state in any component
// Sharing with Friends (Props)
function FriendComponent(props) {
  const { formState } = props;
  // You can now use the form state in this component
}
```

# Highlights 🏎

We’ve reached the end of our journey through the world of form handling in React. Let’s summarize what we’ve learned.

👉 **Forms are Like Questions**: Just like answering questions in a class, forms are how we interact with websites. They collect information from us, and it’s essential to handle them well.

👉 **Control and Flexibility with Controlled Components**: Controlled components give us control, like having a remote control for our forms. We can easily manage what goes in and out, making them great for validation.

👉 **Sometimes Uncontrolled Components Make Sense**: Uncontrolled components are like letting the form elements do their thing. They’re handy when you want to integrate with non-React code or keep things simple.

👉 **Form Libraries and Hooks are Tools in Your Toolbox**: Form libraries like Formik and React Hook Form, along with React hooks like `useState`, offer different tools to make form handling more manageable. Choose the right tool for the job.

👉 **Validation is Like Checking Homework**: Just like checking homework, form validation ensures the answers are correct. It’s essential for a smooth user experience.

👉 **Submission and State Management**: Submitting forms is like turning in your homework. Ensure it reaches the right place. Managing form state is like keeping track of all your assignments; choose the best strategy for your application.

👉 **Reusability**: Just as you can reuse solutions for similar homework, make your forms reusable across your app. Use React Context and props to share form state.

Remember, there’s no one-size-fits-all solution for form handling in React. The right approach depends on your project’s needs.

![captionless image](https://miro.medium.com/v2/resize:fit:930/format:webp/1*-TsCLk82r-iMXcjOjThQaw.png)

Thank you for taking the time to explore the world of form handling in React through this article. Happy coding, and may your React forms be both efficient and user-friendly in all your web development endeavors!

References

1.  React Forms - w3school — [https://reactjs.org/docs/forms.html](https://www.w3schools.com/react/react_forms.asp)
2.  React Hook Form Documentation — [https://react-hook-form.com/get-started](https://react-hook-form.com/docs)
3.  “How to use Forms in React” by Robin Wieruch — [https://www.robinwieruch.de/react-form-validation](https://www.robinwieruch.de/react-form/)
