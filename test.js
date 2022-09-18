(async () => {
    const autogui = require("./index");
    autogui.options.extension = "cmd";
    await autogui.ready();
    console.log(await autogui.screenshot("test.png"));
})();