---
id: lang:typescript
title: typescript — types & functions
status: published
source: generated
linkedFiles: ["src/types.ts"]
---
TypeScript is the language most of this codebase is written in. It is JavaScript — the language of the web — plus one big idea: you write down what kind of value each thing is, and the computer checks your work as you type. This lesson teaches the handful of ideas you need to read the code here, assuming you have never programmed before. Every idea is shown against a real file from this repo.

## What TypeScript is (and why the “types”)

A program is a list of instructions for the computer, written as text in files. JavaScript is the language browsers understand; TypeScript is JavaScript with an extra safety net. When you run it, TypeScript is translated ("compiled") back into plain JavaScript — so anything JavaScript can do, TypeScript can do.

The extra idea is the "type". A type is just the KIND of a value: a piece of text, a number, a yes/no, a list, and so on. In TypeScript you write the kind down next to a value. The editor then watches you: if you try to do something that does not make sense for that kind — like multiplying a word by 3 — it underlines the mistake immediately, before you ever run the code. Think of it as a spellchecker for meaning, not just spelling.

This is why big codebases like this one use it: with hundreds of files, the type checker catches whole classes of mistakes for free and lets the editor tell you, at any point, exactly what shape of data you are holding.

The part after the colon (`: string`, `: number`, `: boolean`) is the type — the kind of value.

```
const title: string = "Lumen Pay";
const balance: number = 4200;
const isOpen: boolean = true;
```

**check yourself:** What does a "type" describe in TypeScript?
- The colour of the text in the editor
- The KIND of a value (text, number, yes/no, list, …)
- How fast the program runs
*answer: The KIND of a value (text, number, yes/no, list, …)* — A type is the kind of value; the checker uses it to catch mistakes as you type.

## Values, names, and const vs let

A value is a single piece of data: the text "hello", the number 42, the answer true. You give a value a name so you can refer to it later. Naming a value is called declaring a variable.

There are two ways to name a value. `const` means "this name will always point at this value" — it never changes. `let` means "this name may point at a different value later". Prefer `const`; reach for `let` only when something genuinely needs to change. You will see `const` far more often in this codebase, and that is on purpose: code that changes less is easier to trust.

The three most common basic types are `string` (text, always in quotes), `number` (any number, whole or decimal), and `boolean` (only `true` or `false`). Most data you meet is built out of these three.

Each `const NAME = VALUE` gives a value a permanent name.

```
const currency = "USD";
let attempts = 0;
attempts = attempts + 1;
```

**check yourself:** You have a value that must never change once set. Which do you use?
- let
- const
- either — there is no difference
*answer: const* — `const` locks the name to one value; `let` allows reassignment.

## Functions — reusable instructions

A function is a named block of instructions that takes some inputs, does some work, and hands back a result. You "call" a function by writing its name followed by parentheses with the inputs inside. Functions are how a program avoids repeating itself: write the steps once, call them anywhere.

In TypeScript you write the type of each input and the type of the result. So `function total(price: number, tax: number): number` reads as: "a function called total that takes two numbers and gives back a number." If you ever call it with the wrong kind of input, the checker complains on the spot.

You will also see the shorter "arrow" form, `const total = (price: number, tax: number): number => price + tax`. It is the same idea in fewer words, and it is everywhere in modern code — especially small one-line helpers.

Find the inputs in the parentheses and the work in the body; the type after the `)` is what it returns.

```
function total(price: number, tax: number): number {
	return price + tax;
}

const double = (n: number): number => n * 2;
```

**check yourself:** What are the values inside a function call’s parentheses?
- The function’s name
- Its inputs (arguments)
- Comments the computer ignores
*answer: Its inputs (arguments)* — The parentheses hold the inputs the function works on.

## Objects and interfaces — describing a shape

Real data usually has several parts at once. A payment has an amount, a currency, and a status. An "object" groups those parts together under one value, each part with a name: `{ amount: 4200, currency: "USD", status: "settled" }`. You read a part with a dot: `payment.amount`.

An `interface` is how you write down, once, the shape every object of some kind must have. `interface Payment { amount: number; currency: string; status: string }` says "a Payment always has these three fields, of these three types." Now anywhere the code expects a Payment, the checker guarantees those fields exist — and the editor can autocomplete them for you.

Interfaces are the backbone of a typed codebase: they are the shared vocabulary. When you want to understand what data flows through a system, finding its interfaces is usually the fastest way in.

Each line inside the braces is a field: `name: type`. This is the shape the code agrees on.

```
interface Payment {
	amount: number;
	currency: string;
	status: string;
}
```

**check yourself:** What does an `interface` define?
- The shape (fields and their types) an object must have
- A colour theme for the app
- How many times a loop runs
*answer: The shape (fields and their types) an object must have* — An interface is a named, reusable description of an object’s fields and their types.

## Lists and the angle brackets

Often you have many of something: a list of payments, a list of names. A list is written with square brackets, and its type is the item type followed by `[]`. So `number[]` is "a list of numbers" and `Payment[]` is "a list of payments".

You will also see angle brackets, like `Array<Payment>` or `Map<string, Payment>`. The angle brackets say "a container of THESE things" — they let one general container (a list, a lookup table) work for any item type. Do not let the syntax scare you: `Map<string, Payment>` just means "a lookup table whose keys are text and whose values are Payments".

When you see a list, the next thing to look for is the code that walks through it — often `.map(...)` (make a new list by transforming each item) or `.filter(...)` (keep only the items that pass a test). Those two show up constantly.

Spot the `[]` or `<…>` — that is a collection — and any `.map`/`.filter` walking it.

```
const amounts: number[] = payments.map(p => p.amount);
const settled = payments.filter(p => p.status === "settled");
```

**check yourself:** What does `Payment[]` mean?
- A single Payment that is broken
- A Payment shown in a table
- A list of Payment values
*answer: A list of Payment values* — `[]` after a type means "a list of those".

## Missing values: optional, union, and null

Sometimes a value might not be there. A user might not have a middle name; a lookup might find nothing. TypeScript makes this explicit so you cannot forget to handle it. A question mark makes a field optional: `middleName?: string` means "a string, or absent".

A "union" type uses a bar to say "one of these": `status: "pending" | "settled" | "failed"` means status is exactly one of those three words — the checker will reject any other. Unions are a precise, readable way to pin down the handful of states something can be in.

The special values `null` and `undefined` mean "nothing here". When a value could be nothing, the checker forces you to check for it before you use it — which is exactly the bug (using something that is not there) that crashes programs most often. This is one of TypeScript’s biggest day-to-day wins.

A `?` marks an optional field; a `|` lists the allowed alternatives.

```
interface User {
	name: string;
	middleName?: string;
	role: "admin" | "member";
}
```

**check yourself:** What does `role: "admin" | "member"` allow?
- Any text at all
- Both words at the same time
- Exactly one of the two listed words
*answer: Exactly one of the two listed words* — A union with `|` restricts the value to exactly one of the listed options.

## Waiting for things: async and await

Some work takes time: fetching data over the network, reading a file, talking to a database. The program should not freeze while it waits. TypeScript handles this with a value called a Promise: a Promise is "a result that is not ready yet, but will be". Its type looks like `Promise<Payment>` — "a Payment, eventually".

To use a not-yet-ready result, you `await` it: `const payment = await loadPayment(id)`. The word `await` means "pause here until the result arrives, then continue with it." A function that awaits things is marked `async`. So `async function load(): Promise<Payment>` reads as "a function that does some waiting and will eventually give back a Payment."

When you see `async` and `await`, read the code top to bottom as normal — the `await` lines are just the points where the program is waiting on the outside world.

`async` marks a function that waits; each `await` is a point where it pauses for a result.

```
async function loadBalance(id: string): Promise<number> {
	const account = await fetchAccount(id);
	return account.balance;
}
```

**check yourself:** What is a `Promise<number>`?
- A promise never to change the number
- A number that is not ready yet but will be
- A number that is always exactly 100
*answer: A number that is not ready yet but will be* — A Promise is a result that arrives later; the `<number>` says what it will be.

## Files that share: import and export

A codebase is many files, and they need to share code. A file makes something available to others with `export`; another file pulls it in with `import`. `export function total(...)` says "other files may use total"; `import { total } from "./money"` says "give me total from the money file next door".

This is the wiring of the whole project: the imports at the top of a file tell you exactly what it depends on, and the exports tell you what it offers. When you want to trace how a codebase fits together, following imports and exports is the map. (The Atlas map you saw earlier is built from exactly these connections.)

A path starting with `./` or `../` points at another file in this project; a bare name like `react` points at an installed library. That one distinction tells you, at a glance, whether a dependency is "ours" or "someone else’s".

Imports at the top say what this file needs; exports say what it offers others.

```
import { formatMoney } from "./money";
import { useState } from "react";

export function Balance() { /* … */ }
```

**check yourself:** A file has `import { x } from "./utils"`. Where does `x` come from?
- The internet, at runtime
- An installed outside library
- Another file in this same project
*answer: Another file in this same project* — A `./` path points at a file within the project; a bare name points at an installed library.