# jsautogui

# <a href="https://npmjs.com/package/jsautogui"><font color="red">This package is deprecated. Use the package `jsautogui` instead! Click me to view it.</font></a>

An implementation of pyautogui to node.js

[![](https://img.shields.io/badge/Discord-black?style=for-the-badge&logo=discord)](https://discord.gg/emAhrw3mvM)

# Installation

```shell
npm install jsautogui
```

## Importing

```js
const jsautogui = require("jsautogui");
```

## Waiting for JSAutoGUI to be ready

```js
jsautogui.ready().then(() => {
    console.log("JAG is ready!");
});
```

## Running a method from PYAutoGUI

```js
autogui.screenshot("test.png").then(() => {
    console.log("Saved the screenshot!");
});
```