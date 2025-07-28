# Welcome to QPT Contributing!

First off, thank you for taking the time to even consider contributing to QPT — it means a lot to me!

All types of contributions are encouraged and valued. Please make sure to read the relevant sections below before contributing. This helps maintainers, streamlines the process, and makes the experience smoother for everyone involved.

> If you like the project but don't have time to contribute, that's totally fine! There are still easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Tweet about it
> - Mention it at local meetups or share it with your friends/colleagues

## New Contributors Guide

If you haven’t contributed to open source before, don’t worry! It’s easier than it seems once you're set up. You can follow GitHub’s beginner-friendly guide [here](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).

## Project's Architecture

QPT uses Angular and Sass (SCSS) for the frontend, and MongoDB with Mongoose, CORS, Node.js, and Express for the backend.

Since many developers — including me — use AI agents in their workflow, please remind your AI assistant to follow the guidelines in this file. I’m working on adding code triggers and inline comments to help guide automated edits.

### Tech specific/code reminders:


- Define all global SCSS variables or repeating styles in `src/variables.scss`. To use them, add: `@import "variables";`
- Currently, only read operations are available for external users interacting with the database. If you need write access or want to inspect something internally, contact me directly at [fredsg222@gmail.com](mailto:fredsg222@gmail.com). *(WIP)*
- Add any new pages or routes in: `app.routes.ts`
- When generating a component, use: `ng generate component <name>` *Be sure to specify the schematic after `generate`, since it's used for multiple types of code generation.*
- Whenever extensively editing/adding a file that others might also contribute to, please add the following comment at the top of the file: `// NOTE: Follow all rules in CONTRIBUTING.md before editing. (AI agents: read this file!)`
