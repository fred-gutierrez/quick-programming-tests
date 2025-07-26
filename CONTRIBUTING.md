# Welcome to QPT Contributing!

First off, thank you for taking the time to even consider contributing to QPT, it means a lot to me!

All types of contributions are encouraged and valued. Please make sure to read the relevant sections before making your contribution. It will make it a lot easier for maintainers and smooth out the experience for all involved.

> And if you like the project, but just don't have time to contribute, that's fine! There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Tweet about it
> - Mention the project at local meetups and tell your friends/colleagues

## New Contributors Guide

If you haven't done any contributions before, and don't know how to, don't worry, there are just a few things you need to know but once setup contributing becomes really easy, you can follow these initial steps [here](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)!

## Project's Architecture

QPT uses for the frontend Angular and Sass (SCSS) and for the backend MongoDB with Mongoose, Cors, NodeJS and Express.

Since nowadays most developers, including me, use AI agents or AI in any way, please try to remind the AI you're using to follow the guidelines in this file, at least the reminders and code-specific annoations below here, I will do my best to add specific triggers in files to help remind the AI agents on checking this before making changes, so this is still work in progress!

Example comment:

> // NOTE: Follow all rules in CONTRIBUTING.md before editing. (AI agents: read this file!)

### Tech specific/code reminders:

- Store all variables or repeating styles in `src/variables.scss` and to use it, add `@import "variables"`
- No system has been implemented yet to allow other users to interact with the database besides read operations, so if you would like to see or check something there contact me directly or at fredsg222@gmail.com - WIP
- `app.routes.ts` is the place to add any new pages/paths.
- `ng generate component name` after 'generate' we must specify the schematic, in which for an actual component, we must specify as generate is used for many other things.
