# Effortless State Management with Redux Toolkit: A Simplified Guide to Creating a React Todo CRUD App

[![Abhiman Ranaweera](https://miro.medium.com/v2/resize:fill:64:64/1*5csW6IzMy7Uq75Y-KjI36w.jpeg)](https://medium.com/@abhimanranaweera?source=post_page---byline--640d1303ff1d---------------------------------------)

[Abhiman Ranaweera](https://medium.com/@abhimanranaweera?source=post_page---byline--640d1303ff1d---------------------------------------)

8 min read | Aug 27, 2023

![captionless image](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*vgCVE_EAXB40OPPqVDPPkg.gif)

# Redux Toolkit

State management lies at the heart of every application, shaping how data flows and interacts within the user interface. While Redux has long been a reliable solution for managing state in JavaScript applications, it often comes with a learning curve and a fair share of boilerplate code. This is where Redux Toolkit steps in to transform the landscape of state management.

Picture Redux Toolkit as a toolbox designed to make your state management journey smoother and more intuitive. It’s not just another library. it’s a thoughtful ensemble of tools and best practices that reimagines the way you handle state. Let’s dive into what Redux Toolkit is and why it’s a game-changer.

## The Challenge with Vanilla Redux

Imagine building an application using vanilla Redux. You’d start with creating actions, reducers, and the store. While this approach offers full control, it can become cumbersome as your application grows. You find yourself crafting repetitive code, managing action types, and architecting the store’s setup.

## The Promise of Redux Toolkit

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*oknhSOQOC65_D94qoMX7Vg.jpeg)

Here’s where Redux Toolkit enters the scene. It’s not about reinventing Redux; it’s about refining it. Redux Toolkit offers an opinionated and streamlined way to work with Redux, addressing common pain points and encapsulating best practices. It’s about making Redux more accessible and efficient, allowing you to focus on building your application’s features rather than wrestling with setup and boilerplate.

## Key Benefits of Redux Toolkit

## ⚡ **Boilerplate Reduction**

Redux Toolkit drastically minimizes the boilerplate code needed to set up a Redux store. This means fewer lines of code to write and maintain, resulting in faster development cycles.

## ⚡**Simplified Reducers with** `**createSlice**`

The `createSlice` function takes care of generating reducers, action creators, and action types in a single cohesive package. This cuts down on the traditional repetitive process and keeps your logic clean and organized.

## ⚡**Immutability Made Easy with Immer**

Redux Toolkit integrates Immer, a library that lets you write immutable updates in a more intuitive and readable manner. Immer simplifies the process of updating complex nested states.

## ⚡ **Built-in Asynchronous Handling**

Asynchronous actions become effortless with, a built-in utility that seamlessly manages async operations like API calls, making your codebase more readable and maintainable.

# Let’s Implement Redux Toolkit with a Practical Example 🚀

In this section, we’ll dive into building a complete task management app with CRUD operations, all while leveraging the power of the Redux Toolkit. We’ll also cover handling asynchronous operations using `createAsyncThunk`. We’ll cover fetching data from an API, adding tasks, marking tasks as completed or incomplete, and deleting tasks. By the end of this tutorial, you’ll have a solid understanding of how to leverage Redux Toolkit’s features to create efficient and interactive applications.

## Step 1: Setting Up the Project

Commence by creating a new React application using [Vite](https://vitejs.dev/guide/). Alternatively, you have the option to use [create-react-app](https://create-react-app.dev/)

```
npm init vite@latest todos-crud-redux-tk
```

Follow the wizard as follows

Project name: › todos-crud-redux-tk (If you are in the project folder you can just type . to create the project with the current folder name)

Select a framework: › React

Select a variant: › JavaScript

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Mk1g0yK94Z7OVZYODfPlvQ.png)

Navigate to the project directory:

```
cd todos-crud-redux-tk
```

## Step 2: Installing Dependencies

Install the required dependencies: Redux Toolkit and react-redux.

```
npm install @reduxjs/toolkit react-redux
```

## Step 3: Creating the Redux Store and Task Slice

Create a new file named `taskSlice.js` in the `src/store/slices` directory. This file will contain the Redux slice for managing tasks.

here I have used [jsonplaceholder](https://jsonplaceholder.typicode.com/) mock API to fetch todo task data and fetch them in an async way to demonstrate your asyncThunk. But for the delete and create feature I update only the state value without API.

```
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});
const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state[taskIndex] = updatedTask;
      }
    },
    clearAllTasks: (state) => {
      state.length = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const { addTask, deleteTask, updateTask, clearAllTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
```

`createSlice` is a function that generates a Redux slice, encompassing a compilation of reducer logic and related actions tailored to a specific segment of your Redux state. `addTask`, `deleteTask`, `updateTask`, and `clearAllTasks` are the reducers produced through the `createSlice` method.

On the other hand, `createAsyncThunk` is a function that crafts asynchronous action creators, predominantly employed to manage API requests or other asynchronous operations. This function streamlines the process of dispatching async actions, encompassing success and error states, by unifying the asynchronous logic and action dispatching within a single function. These functions have been exported using action restructuring. Furthermore, the `fetchTasks` action has been created using the `createAsyncThunk` function.

## Step 4: Configuring the Redux Store

Create a new file named `index.js` in the `src/store` directory to configure the Redux store.

```
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
export default store;
```

The above code sets up your Redux store by configuring it with the `configureStore` function from Redux Toolkit. It associates the `tasks` slice of the store's state with the `taskReducer` logic, which is likely defined in a separate `taskSlice.js` file. This store instance will act as the central repository for your application's state and provide a way to manage and update it using Redux patterns.

## **Step 5: Building the Task List Component**

Now, let’s create the `TaskList.js` component that will display the list of tasks, allow adding new tasks, updating task titles, marking tasks as completed, and deleting tasks.

```
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  addTask,
  deleteTask,
  clearAllTasks,
} from "../store/slices/taskSlice";
const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      dispatch(
        addTask({
          id: Date.now(),
          title: newTaskTitle,
          completed: newTaskCompleted,
        })
      );
      setNewTaskTitle("");
      setNewTaskCompleted(false);
    }
  };
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };
  const handleClearAllTasks = () => {
    dispatch(clearAllTasks());
  };
  return (
    <div className="task-container">
      <h2>
        Task List
        <button onClick={handleClearAllTasks}>Clear All Tasks</button>
      </h2>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Enter new task title"
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={newTaskCompleted}
          onChange={(e) => setNewTaskCompleted(e.target.checked)}
        />
      </label>
      <button onClick={handleAddTask}>Add Task</button>
      <hr />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            {task.completed ? " ✅︎" : " ❌"}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskList;
```

let’s break down the code for building the `TaskList` component step by step.

```
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  addTask,
  deleteTask,
  clearAllTasks,
} from "../store/slices/taskSlice";
const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
```

- `import` statements: You're importing the necessary React components (`useState`, `useEffect`) and Redux hooks (`useSelector`, `useDispatch`) from their respective libraries. Additionally, you're importing action creators (`fetchTasks`, `addTask`, `deleteTask`, `clearAllTasks`) from the Redux store slice.
- `TaskList` function component: This component is responsible for rendering the task list, input fields, buttons, and handling interactions.
- `tasks` and `dispatch`: You're using the `useSelector` hook to access the `tasks` state from the Redux store, and `useDispatch` hook to get the dispatcher function.
- `newTaskTitle` and `newTaskCompleted`: These are state variables managed by the `useState` hook. They store the current value of the new task title being entered and whether the new task is completed or not.
- `useEffect`: This hook is used to fetch tasks from the server when the component mounts. It dispatches the `fetchTasks` action, which triggers the asynchronous fetching of tasks from the API.

```
const handleAddTask = () => {
  if (newTaskTitle.trim() !== "") {
    dispatch(
      addTask({
        id: Date.now(),
        title: newTaskTitle,
        completed: newTaskCompleted,
      })
    );
    setNewTaskTitle("");
    setNewTaskCompleted(false);
  }
};
```

`handleAddTask`: This function is called when the "Add Task" button is clicked. It checks if the `newTaskTitle` is not empty, and if so, it dispatches the `addTask` action to add a new task to the Redux store. The new task's title and completion status are taken from the `newTaskTitle` and `newTaskCompleted` states. After adding the task, the input fields are cleared.

```
const handleDeleteTask = (taskId) => {
  dispatch(deleteTask(taskId));
};
```

`handleDeleteTask`: This function is called when the "Delete" button for a specific task is clicked. It dispatches the `deleteTask` action to remove the task from the Redux store.

```
const handleClearAllTasks = () => {
  dispatch(clearAllTasks());
};
```

`handleClearAllTasks`: This function is called when the "Clear All Tasks" button is clicked. It dispatches the `clearAllTasks` action to remove all tasks from the Redux store.

```
return (
  <div className="task-container">
    <h2>
      Task List
      <button onClick={handleClearAllTasks}>Clear All Tasks</button>
    </h2>
    {/* Input field and other elements */}
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {/* Task title */}
          {/* Completed status indicator */}
          {/* Delete button */}
        </li>
      ))}
    </ul>
  </div>
);
```

`return` statement: This JSX code renders the component's user interface. It includes the input field for adding tasks, a checkbox for setting the completion status, buttons for adding tasks and clearing all tasks, and a list of tasks fetched from the Redux store. Completed tasks are indicated with a checkmark, while incomplete tasks are indicated with an "X". The "Delete" button allows removing individual tasks.

In summary, the `TaskList` component integrates Redux state management to create a dynamic task list application. It handles actions like adding, deleting, and clearing tasks by dispatching the appropriate Redux actions, and it displays the fetched tasks from the Redux store along with their completion status.

## Step 6: Integrating Redux and TaskList Component

Wrap your application with the Redux `Provider` component in the `main.js` file.

```
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
```

## Step 7: Running the Application

Run your React application to see the CRUD application in action:

````
npm run dev
```![captionless image](https://miro.medium.com/v2/resize:fit:614/format:webp/1*SF_nzw0LruMLjCdlLDUxjQ.png)

In this practical example, you’ve built a CRUD application using Redux Toolkit. You fetched tasks from an API, displayed them in a list, added new tasks with completion status, updated task titles, marked tasks as completed or incomplete, and deleted tasks. This project showcases the power of Redux Toolkit in managing state and handling complex interactions in your applications. As you continue your journey with Redux Toolkit, you’ll find it to be a valuable tool for creating efficient and maintainable React applications.

Access the Source Code
======================

To access the complete source code of this project, visit [My GitHub repository](https://github.com/abhimax/todos-crud-redux-tk)

Clone the repository to your local machine using:

````

git clone https://github.com/abhimax/todos-crud-redux-tk.git

```

Feel free to explore, experiment, and learn more about Redux Toolkit in practice.

![captionless image](https://miro.medium.com/v2/resize:fit:1224/format:webp/1*1t9rXMKCL1KkRo_rktRq0w.jpeg)
```
