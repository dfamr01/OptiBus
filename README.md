# Optibus home task

## Intro

At Optibus, we often need to manipulate, consume and present data relating to bus scheduling in many different forms for many different stakeholders. For this task, we would like you to create a small application that allows bus drivers to sign up to drive different duties (these are blocks of bus-driving work). As there are regulations to ensure safety in the bus industry, there are certain constraints on combinations of duties that we would like you to enforce.

---

## Expected effort

We only expect you to spend around two or three hours on this task (though you are welcome to spend longer, if you want to). The requirements are listed in priority order, so please implement them in that order. If you cannot complete everything, please explicitly state what was left out in this README file and give us a rough idea of how you might have achieved those requirements if you had more time.

---

## Requirements

1. When the application is opened, the driver should see an interface split into two halves.
2. On the left half, there should be a list of available duties. A JSON object listing available duties is provided further down.
3. On the right half, there will be a list of duties the driver has signed up for (initially, this will be empty).
4. In both parts of the interface, a duty should be displayed as a box containing the following information: the duty name, the depot, the date, the start time, and the end time.
5. When the driver clicks on a duty on the left side, then this should sign them up for the duty and move it to the right side, unless this would violate one of the regulations listed further down. If it would violate a regulation, a dialog should be displayed indicating which regulation was violated (a simple JS `alert()` is sufficient) and the duty should remain where it is.
6. Clicking a signed-up duty in the right side should unassign it and move it back to the left side with the available duties.

_For a visual example of what the interface might end up looking like, check the file `docs/example-interface.png`_

### Regulations

1. A driver cannot work two overlapping duties
2. A driver must have 8 hours of rest between duties

### Available duty data

The data is available in JSON data format in the `src/data.json` file.

---

## Solution delivery

Your solution can be delivered by forking this CodeSandbox and sending us the link (preferred method), or as a ZIP file attached to an email. Please send your solution to the Optibus representative you have been in contact with so far.

---

## Technology

We highly recommend you fork this CodeSandbox starter project as the basis of your solution. It already contains the project set-up for React and Typescript, an example test, and a line that imports the example data with relevant types. This will save you set-up time and enable faster review of your solution. However, it is not mandatory.

The interface should be implemented as a web application. We expect the implementation to be in Javascript or Typescript. You are free to use React.js or plain JS/TS.

### Using CodeSandbox

You can fork this starter project using the "Fork" button at the top right (we recommend you create an account too, so that you can close the project and return to it later if needed). You can then start editing the codebase - changes should be reflected immediately in the preview pane on the right. To see results from the test suite, switch from the "Browser" to the "Tests" tab in the preview pane.

---

## What are we evaluating?

When we review your solution, we’ll be evaluating:

- Whether we are able to run it (if not using CodeSandbox, documentation can be helpful here)
- _Correctness_ of the solution
- Presence and comprehensiveness of _tests_
- _Legibility_ and _extensibility_ of the code
- _Consistency_ of code style
- Basic _usability_ and _styling_ of the interface

The following topics are things that we are not evaluating and you do not need to spend time on:

- Making the interface pixel-perfect and stunningly beautiful (though we do care about this in our real day-to-day work!)
- Building a solution that scales to millions of data points or users
- Building infrastructure or deployment pipelines

You should consider documenting in this README file ideas for how you might improve your solution given more time.
