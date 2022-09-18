# jsautogui

An implementation of pyautogui to node.js

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