(async () => {
    const autogui = require("./index");
    console.log(await autogui.screenshot("test.png"));
})();