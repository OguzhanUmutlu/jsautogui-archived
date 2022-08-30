(async () => {
    const autogui = require("./index");
    autogui.position().then(console.log);
    autogui.moveTo(100, 100, 2).then(console.log);
})();