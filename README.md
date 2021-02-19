# Ionic Framework React Monorepo

This repository is a sample Ionic Framework React Monorepo that uses [Lerna](https://lerna.js.org/) to manage multiple packages. It contains two Ionic Framework React projects and a common React library that provides shared code both projects use.

The process to create an Ionic Framework React Monorepo can be found below. Each step in this process has its own commit within the `main` branch. You can use this information to gather a general idea of the various changes needed at each step as you work your way through the guide below.

## Getting Started

First, create a directory that will serve as your monorepo - this should be the name of the repository you want to commit to source control. The name I used was `cap-react-lerna-monorepo` but throughout the guide I will be representing the Acme Company. Once the root monorepo directory has been created, initialize it as an npm project and initialize Lerna. Then add a `.gitignore` file that excludes `node_modules` from being tracked as part of the Git repository:

```
mkdir acme-company
cd acme-company
npm init
npx lerna init
touch .gitignore
```

Don't forget to add `node_modules` to the `.gitingore` file!
