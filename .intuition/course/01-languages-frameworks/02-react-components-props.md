---
id: fw:react
title: react — components & props
status: published
source: generated
linkedFiles: ["src/App.tsx"]
---
React is a tool for building user interfaces: the parts of an app people see and click. A codebase uses React to describe screens as small reusable pieces, then update those pieces when data changes. This lesson teaches the main ideas you need to read React files in this repo, assuming you have never programmed before.

## What React is

A user interface, often shortened to UI, is everything a person sees on the screen: buttons, text, forms, menus, and pages. React is a JavaScript library, which means a ready-made set of tools other code can use. Its main job is to help programmers describe what the screen should look like.

React code is usually split into small pieces called components. A component is a reusable screen part, like a search box, a card, or a whole page. Instead of manually changing the page step by step, React lets code say, "for this data, show this UI," and React updates the screen.

That is why React appears all through a codebase. It gives a consistent way to build screens from pieces, pass data between pieces, and re-draw the screen when something changes.

This import line shows the file is using React tools.

```
import React from "react";

export function App() {
  return <h1>Hello</h1>;
}
```

**check yourself:** What is React mainly used for?
- Drawing 3D video game graphics only
- Building the parts of an app people see and interact with
- Storing files on a hard drive
*answer: Building the parts of an app people see and interact with* — React is mainly for building user interfaces.

## Components: the basic building blocks

A component is a function that returns UI. A function is a named piece of code you can run. In React, many components are written like normal JavaScript functions, but their result is screen content instead of just a number or text.

Component names usually start with a capital letter, like `Header` or `UserCard`. That capital letter matters: it tells React this is a custom component, not a built-in HTML tag like `div` or `button`. Think of a component like a reusable recipe card: you can use it in many places.

When reading a file, look for a function or `const` with a capitalized name, then look for what it returns. That returned UI is the main purpose of the component.

A capitalized function like this is usually a React component.

```
export function Profile() {
  return <div>Profile page</div>;
}
```

**check yourself:** How can you often spot a React component name?
- It usually starts with a capital letter
- It always starts with a number
- It is always inside quotes
*answer: It usually starts with a capital letter* — React components are usually named with an initial capital letter.

## JSX: HTML-like code inside JavaScript

React components often return JSX. JSX is a syntax, meaning a way of writing code, that looks like HTML inside JavaScript. For example, `<div>Hello</div>` looks like a web page tag, but it lives inside your JavaScript file.

JSX is not a string of text. It is a description of what should appear on the screen. You can mix plain tags like `<div>` with custom components like `<ProfileCard />`. Self-closing tags, such as `<Input />`, mean the tag has no content inside it.

Inside JSX, curly braces `{}` mean "switch back into JavaScript here." That is how code inserts a value, calls a function, or chooses what to show. A useful reading trick is: angle brackets make structure, curly braces insert values.

After `return (`, you will often see JSX that describes the UI.

```
function Welcome() {
  const name = "Maya";
  return (
    <h1>Hello, {name}</h1>
  );
}
```

**check yourself:** In JSX, what do curly braces `{}` usually mean?
- Start a comment
- Make text bold
- Insert or run JavaScript here
*answer: Insert or run JavaScript here* — Curly braces inside JSX switch into normal JavaScript.

## Props: data passed into a component

Props, short for properties, are values a parent component gives to a child component. A parent component is one that uses another component inside it. Props let one component tell another what to display or how to behave.

You can think of props like arguments passed into a function. If a `Button` component receives `label="Save"`, then the button can show the word Save. When reading code, look both where a component is used and where its function receives values to understand the flow of data.

Props are read-only in normal React style. Read-only means the receiving component should use them, not rewrite them. This makes code easier to follow, because data mostly flows one way: from parent down to child.

A custom component with attributes like this is receiving props.

```
function Button(props) {
  return <button>{props.label}</button>;
}

<Button label="Save" />
```

**check yourself:** What are props in React?
- Only the colors a component can use
- A special kind of file on disk
- Values passed into a component from outside
*answer: Values passed into a component from outside* — Props are the input values a component receives.

## State and events: when the screen changes

State is data a component remembers over time. For example, whether a menu is open, what text a user typed, or which tab is selected. When state changes, React re-renders, which means it runs the component again and updates the screen to match the new data.

An event is something that happens, usually from the user or browser: a click, typing into a field, submitting a form. React lets you attach event handlers, which are functions that run when that event happens. You will often see names like `onClick`, `onChange`, or `onSubmit`.

A common pattern is: an event happens, a handler updates state, and the UI changes. This is one of the most important loops in React, so it is worth spotting again and again in the codebase.

These lines often show user actions causing state changes.

```
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**check yourself:** What usually happens after React state changes?
- The file is deleted
- React updates the component's UI to match the new data
- All components stop working until refresh
*answer: React updates the component's UI to match the new data* — React re-renders so the screen matches the latest state.

## Showing things conditionally and rendering lists

Real screens do not always show the same thing. Conditional rendering means showing one UI part only if some condition is true, such as showing a loading message while data is still arriving. In React, this often uses normal JavaScript tools like `if`, the `? :` operator, or `&&`.

React also often builds repeated UI from a list of data. A list might be users, products, or messages. The usual pattern is to call `.map(...)` on an array, which means "for each item in this list, create one piece of UI."

When reading list code, notice the `key` prop. A key is a stable label React uses to track each repeated item. You do not need to memorize every rule yet; just know that lists often appear as `.map(...)` plus `key=`.

A `.map(...)` call inside JSX usually means the UI is being repeated for a list of data.

```
const items = ["Tea", "Coffee"];

<ul>
  {items.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
```

**check yourself:** What does `.map(...)` often mean in React UI code?
- Create one piece of UI for each item in a list
- Rename a component file
- Pause the program for a second
*answer: Create one piece of UI for each item in a list* — In React, `.map(...)` is commonly used to render repeated items from a list.

## Hooks and `useEffect`: extra React tools inside components

A hook is a special React function that adds useful behavior to a component. `useState` is one hook. Another common hook is `useEffect`. An effect is code that should run because the component appeared or some value changed, such as fetching data from a server or setting up a timer.

You will usually see `useEffect(() => { ... }, [something])`. The first part is the work to do. The array at the end lists dependencies, meaning values React should watch. If one of those values changes, React runs the effect again.

For reading code, the big idea is simple: components describe UI, while effects handle outside work tied to that UI. If a file talks to an API, sets a timer, or listens for browser events, `useEffect` is a common place to look.

`useEffect` usually marks code that runs after rendering or when watched values change.

```
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    console.log("Page appeared");
  }, []);

  return <div>Page</div>;
}
```

**check yourself:** What is `useEffect` commonly used for?
- Creating folders in the project
- Defining CSS colors only
- Running side work like fetching data or setting timers
*answer: Running side work like fetching data or setting timers* — `useEffect` is for work tied to rendering, such as data fetching or timers.

## Imports, exports, and the component tree

React codebases are split across many files. `import` means "bring in something from another file or library so I can use it here." `export` means "make this thing available to other files." Reading imports at the top of a file is one of the fastest ways to understand what that file depends on.

Components also form a tree. A tree is a parent-and-child structure, like folders inside folders. If `App` renders `Layout`, and `Layout` renders `Sidebar` and `Content`, then `App` is higher in the tree and the others are below it.

When trying to understand a real codebase, follow the tree one step at a time. Start at the file you are reading, note which components it imports, then open those files only when needed. This keeps the project from feeling overwhelming.

Import lines show which components or tools this file uses.

```
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function App() {
  return <Header />;
}
```

**check yourself:** What does `import` do in a React file?
- Runs the whole app immediately
- Brings in code from another file or library to use here
- Deletes old components
*answer: Brings in code from another file or library to use here* — `import` lets a file use code defined elsewhere.