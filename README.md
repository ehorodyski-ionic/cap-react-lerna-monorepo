# Ionic Framework React Monorepo

This repository is a sample Ionic Framework React Monorepo that uses [Lerna](https://lerna.js.org/) to manage multiple packages. It contains two Ionic Framework React projects and a common React library that provides shared code both projects use.

The process to create an Ionic Framework React Monorepo can be found below. Each step in this process has its own commit within the `main` branch. You can use this information to gather a general idea of the various changes needed at each step as you work your way through the guide below.

## Getting Started

Create a directory that will serve as your monorepo - this should be the name of the repository you want to commit to source control. The name I used was `cap-react-lerna-monorepo` but throughout the guide I will be representing the Acme Company. Once the root monorepo directory has been created, initialize it as an npm project and initialize Lerna. Then add a `.gitignore` file that excludes `node_modules` from being tracked as part of the Git repository:

```
mkdir acme-company
cd acme-company
npm init
npx lerna init
touch .gitignore
```

Don't forget to add `node_modules` to the `.gitingore` file!

## Create the Ionic Framework React Apps

First let's initialize the monorepo such that the Ionic CLI can support a multi-app configuration:

```
npx ionic init --multi-app
```

Next we'll create the Ionic Framework React apps. We're going to have two apps, one for Acme Customers and one for Acme Employees:

```
cd ./packages
npx ionic start customer blank --type=react
npx ionic start employee blank --type=react --no-deps
```

The dependencies the Ionic Framework React apps will need will be hoisted into the root of our monorepo. Therefore, when initializing the second app we can make use of the `--no-deps` optional flag. Hoist the dependencies:

```
cd ../
npx lerna bootstrap --hoist
```

Both apps can now be run. When running a package within Lerna, use the following syntax:

```
npx lerna run start --scope=<project-name>
# <project-name> is determined by the name property within the subproject's package.json file
```

Please note the following:

- The option to `stream` has been added to `lerna.json` in this commit. This allows each command's output to be printed to the console.
- You will need to modify the ports each Ionic Framework React app serves on if you want to serve more than one at a time.

In the file changelog for this commit, I modified each project's `Home.tsx` file to change the title from `Blank` to either `Customer` or `Employee` to easily differentiate the two projects as I continue working.

## Add iOS and Android Platforms

First, we need to update the `capacitor.config.json` file of each Ionic Framework React app. Right now it only contains the `appName`. Copy the contents of `capacitor.config.json` at the root of the monorepo and paste it into each project's `capacitor.config.json`. Modify each project's `appId` and `appName`:

Example:

```json
{
  "appId": "com.acme.employee",
  "appName": "employee",
  "bundledWebRuntime": false,
  "npmClient": "npm",
  "webDir": "build",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    }
  },
  "cordova": {}
}
```

Once complete, you can delete the root `capacitor.config.json` file.

Next run the following commands starting from the root directory of the monorepo:

```
cd ./packages/customer && npm run build && npx cap add ios && npx cap add android
cd ../../
cd ./packages/employee && npm run build && npx cap add ios && npx cap add android
```

Once that is complete, you _can_ add the following convienence scripts to the `package.json` files in both the `customer` and `employee` project directories:

```json
"scripts": {
  ...snip...
  "ios": "npm run build && npx cap sync && npx cap open ios",
  "android": "npm run build && npx cap sync && npx cap open android"
}
```

At this point, you can build either project for iOS/Android or build them both at once:

```
npx lerna run ios --scope=customer
npx lerna run ios --scope=employee
npx lerna run ios   # runs all packages with an "ios" npm script
```

Note, for Android the base command would be `npx lerna run android` instead of `npx lerna run ios`.
