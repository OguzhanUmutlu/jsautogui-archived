// noinspection JSUnusedGlobalSymbols

const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const KeyboardKeys = ['\t', '\n', '\r', ' ', '!', '"', '#', '$', '%', '&', "'", '(',
    ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~',
    'accept', 'add', 'alt', 'altleft', 'altright', 'apps', 'backspace',
    'browserback', 'browserfavorites', 'browserforward', 'browserhome',
    'browserrefresh', 'browsersearch', 'browserstop', 'capslock', 'clear',
    'convert', 'ctrl', 'ctrlleft', 'ctrlright', 'decimal', 'del', 'delete',
    'divide', 'down', 'end', 'enter', 'esc', 'escape', 'execute', 'f1', 'f10',
    'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f2', 'f20',
    'f21', 'f22', 'f23', 'f24', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9',
    'final', 'fn', 'hanguel', 'hangul', 'hanja', 'help', 'home', 'insert', 'junja',
    'kana', 'kanji', 'launchapp1', 'launchapp2', 'launchmail',
    'launchmediaselect', 'left', 'modechange', 'multiply', 'nexttrack',
    'nonconvert', 'num0', 'num1', 'num2', 'num3', 'num4', 'num5', 'num6',
    'num7', 'num8', 'num9', 'numlock', 'pagedown', 'pageup', 'pause', 'pgdn',
    'pgup', 'playpause', 'prevtrack', 'print', 'printscreen', 'prntscrn',
    'prtsc', 'prtscr', 'return', 'right', 'scrolllock', 'select', 'separator',
    'shift', 'shiftleft', 'shiftright', 'sleep', 'space', 'stop', 'subtract', 'tab',
    'up', 'volumedown', 'volumemute', 'volumeup', 'win', 'winleft', 'winright', 'yen',
    'command', 'option', 'optionleft', 'optionright'];
const MouseButtons = ["left", "right", "middle"];
const methods = [
    '_send', 'position', 'size', 'isOnScreen', 'setPause', 'setFailSafe', 'moveTo', 'move', 'moveRelative',
    'click', 'vScroll', 'hScroll', 'mouseDown', 'mouseUp', 'typeString', 'typeKeys', 'keyDown', 'keyUp',
    'press', 'alert', 'confirm', 'prompt', 'password', 'screenshot', 'locateOnScreen', 'locateAllOnScreen',
    'locateCenterOnScreen', 'dragTo', 'dragRelative', 'drag'
];
(async () => {
    let _promise;
    const promise = new Promise(r => _promise = r);
    const options = {extension: "exe", debug: false};
    module.exports = {promise, ready: () => promise, options};
    await new Promise(r => process.nextTick(r));
    methods.forEach(i => module.exports[i] = async (...args) => {
        await promise;
        return await module.exports[i](...args);
    });
    const connected = {};
    const spawned = {};
    const query = {};
    const _first = {};
    const spawn = async name => {
        const file = path.join(__dirname, "main", name + "." + options.extension);
        query[file] = query[file] || [];
        if (options.extension !== "exe") fs.writeFileSync(file, {
            cmd: `@echo off\npy main\\${name}.py`,
            sh: `py main/${name}.py`
        }[options.extension]);
        spawned[file] = child_process.spawn(file);
        spawned[file].on("close", (code, signal) => {
            connected[file] = false;
            if (options.debug) {
                options.debug("Closed with the code: " + code + ", signal: " + signal);
                options.debug("Respawning...");
            }
            spawn(name);
        });
        spawned[file].on("error", err => {
            if (!_first[file]) throw err; // Probably file doesn't exist?
            if (options.debug) options.debug("error", err);
        });
        spawned[file].on("spawn", () => {
            _first[file] = true;
            connected[file] = true;
            if (options.debug) options.debug("Spawned.");
            query[file].forEach(i => spawned[file].stdin.write(i));
        });
        spawned[file].stdout.on("data", data => {
            const response = data.toString().replaceAll("\r", "").replaceAll(/\n$/g, "");
            response.split("\n").forEach(res => spawned[file].stdout.emit("_actual_data", res));
        });
        spawned[file].stdout.on("_actual_data", response => {
            const id = response.split(" ")[0];
            const message = response.split(" ").slice(1).join(" ");
            if (options.debug) console.log("-> " + message);
            if (_res[id]) {
                if (message === "success") {
                    _res[id].r(_res[id].data);
                    delete _res[id];
                } else _res[id].data.push(message);
            }
        });
    };
    let _id = 0;
    const _res = {};
    await spawn("main");
    /**
     * @param {"main"} file
     * @param {string} action
     * @param {Object} obj
     * @returns {Promise<string[]>}
     */
    const send = (file, action, obj = {}) => new Promise(r => {
        file = path.join(__dirname, "main", file + "." + options.extension);
        const id = _id++;
        _res[id] = {r, data: []};
        const pack = JSON.stringify({...obj, id, action}) + "\n";
        if (!connected[file]) return query[file].push(pack);
        spawned[file].stdin.write(pack);
    });
    const convertObject = async (a, b) => {
        a = await a;
        const obj = {};
        Object.keys(b).forEach(i => obj[i] = a[b[i]]);
        return obj;
    };
    const first = async a => (await a)[0];
    const autoSplit = async (a, b = ":") => (await a).map(i => i.split(b));
    const check = (a, ...b) => {
        const typ = x => {
            if (x === null) return "null";
            if (Array.isArray(x)) return "array";
            return typeof x;
        }
        if (!b.some(b => typ(a) === typ(b))) throw new Error("Expected " + b.map(typ).join(" or ") + ", got " + typ(a));
    };
    const checkAll = (...a) => a.forEach(a => check(...a));
    const checkArr = (a, arr, t) => {
        if (!arr.includes(a)) throw new Error("Expected " + t + ", got " + a);
    };
    const checkSubArr = (a, arr, t) => a.forEach(a => checkArr(a, arr, t));
    const pilImage = str => {
        str = str.substring(1, str.length - 1).split(" ");
        return {
            raw: str,
            mode: str[2].split("=").slice(1).join("="),
            size: {
                width: str[3].split("=").slice(1).join("=").split("x")[0] * 1,
                height: str[3].split("=").slice(1).join("=").split("x")[1] * 1
            }
        };
    };
    Object.assign(module.exports, {
        _send: send,
        position: () => convertObject(first(autoSplit(send("main", "position"))), {x: 0, y: 1}),
        size: () => convertObject(first(autoSplit(send("main", "size"))), {width: 0, height: 1}),
        isOnScreen: async (x = null, y = null) => {
            checkAll([x, 0], [y, 0]);
            return (await send("main", "on-screen", {x, y}))[0] === "True";
        },
        setPause: async (seconds = null) => {
            check(seconds, 0);
            await send("main", "PAUSE", {value: seconds});
        },
        setFailSafe: async (value = null) => {
            check(value, true);
            await send("main", "FAILSAFE", {value});
        },
        moveTo: async (x = null, y = null, duration = null) => {
            checkAll([x, 0, null], [y, 0, null], [duration, 0, null]);
            await send("main", "move-to", {x, y, duration});
        },
        move: async (x = null, y = null, duration = null) => {
            checkAll([x, 0, null], [y, 0, null], [duration, 0, null]);
            await send("main", "move", {x, y, duration});
        },
        moveRelative: async (x = null, y = null, duration = null) => {
            checkAll([x, 0, null], [y, 0, null], [duration, 0, null]);
            await send("main", "move-rel", {x, y, duration});
        },
        click: async (x = null, y = null, clicks = null, interval = null, button = null) => {
            checkAll([x, 0, null], [y, 0, null], [clicks, 0, null], [interval, 0, null], [button, "", null]);
            if (button !== null) checkArr(button, KeyboardKeys, "keyboard key");
            await send("main", "click", {x, y, clicks, interval, button});
        },
        vScroll: async (value = null, x = null, y = null) => {
            checkAll([x, 0, null], [y, 0, null], [value, 0]);
            await send("main", "v-scroll", {value, x, y});
        },
        hScroll: async (value = null, x = null, y = null) => {
            checkAll([x, 0, null], [y, 0, null], [value, 0]);
            await send("main", "v-scroll", {value, x, y});
        },
        mouseDown: async (button = null, x = null, y = null) => {
            checkAll([x, 0, null], [y, 0, null], [button, ""]);
            checkArr(button, MouseButtons, "mouse button");
            await send("main", "mouse-down", {button, x, y});
        },
        mouseUp: async (button = null, x = null, y = null) => {
            checkAll([x, 0, null], [y, 0, null], [button, ""]);
            checkArr(button, MouseButtons, "mouse button");
            await send("main", "mouse-up", {button, x, y});
        },
        typeString: async (text = null, interval = null) => {
            checkAll([text, ""], [interval, 0, null]);
            await send("main", "type-write", {text, interval});
        },
        typeKeys: async (keys = null, interval = null) => {
            checkAll([keys, []], [interval, 0, null]);
            checkSubArr(keys, KeyboardKeys, "keyboard key");
            await send("main", "hotkey", {keys, interval});
        },
        keyDown: async (key = null) => {
            check(key, "");
            checkArr(key, KeyboardKeys, "keyboard key");
            await send("main", "key-down", {key});
        },
        keyUp: async (key = null) => {
            check(key, "");
            checkArr(key, KeyboardKeys, "keyboard key");
            await send("main", "key-down", {key});
        },
        press: async (key = null) => {
            check(key, "");
            checkArr(key, KeyboardKeys, "keyboard key");
            await send("main", "press", {key});
        },
        alert: async (text = null, title = null, button = null) => {
            checkAll([text, "", null], [title, "", null], [button, "", null]);
            await send("main", title || button ? "alert" : "alert-js", {text, title, button});
        },
        confirm: async (text = null, title = null, buttons = null) => {
            checkAll([text, "", null], [title, "", null], [buttons, [], null]);
            if (buttons !== null) buttons.forEach(i => check(i, ""));
            return (await send("main", title || buttons ? "confirm" : "confirm-js", {text, title, buttons}))[0];
        },
        prompt: async (text = null, title = null, default_ = null) => {
            checkAll([text, "", null], [title, "", null], [default_, "", null]);
            return (await send("main", title || default_ ? "prompt" : "prompt-js", {text, title, default_}))[0];
        },
        password: async (text = null, title = null, default_ = null, mask = null) => {
            checkAll([text, "", null], [title, "", null], [default_, "", null], [mask, "", null]);
            return (await send("main", title || default_ || mask ? "password" : "password-js", {
                text,
                title,
                default_,
                mask
            }))[0];
        },
        screenshot: async (file = null, region = null) => {
            checkAll([file, "", null], [region, [], {}, null]);
            if (region !== null) {
                if (Array.isArray(region)) {
                    region.forEach(i => check(i, 0));
                    if (region.length !== 4) throw new Error("Expected number[4], got number[" + region.length + "]")
                } else checkAll([region.left, 0], [region.top, 0], [region.width, 0], [region.height, 0]);
            }
            return pilImage((await send("main", "screenshot", {file, region}))[0]);
        },
        locateOnScreen: async (file = null) => {
            checkAll([file, "", null]);
            return pilImage((await send("main", "locate-on-screen", {file}))[0]);
        },
        locateAllOnScreen: async (file = null) => {
            checkAll([file, "", null]);
            return pilImage((await send("main", "locate-all-on-screen", {file}))[0]);
        },
        locateCenterOnScreen: async (file = null) => {
            checkAll([file, "", null]);
            return pilImage((await send("main", "locate-center-on-screen", {file}))[0]);
        },
        dragTo: async (x = null, y = null, duration = null, button = null) => {
            checkAll([x, 0, null], [y, 0, null], [duration, 0, null], [button, "", null]);
            checkArr(button, MouseButtons, "mouse button");
            await send("main", "drag-to", {x, y, duration, button});
        },
        dragRelative: async (x = null, y = null, duration = null, button = null) => {
            checkAll([x, 0, null], [y, 0, null], [duration, 0, null], [button, "", null]);
            checkArr(button, MouseButtons, "mouse button");
            await send("main", "drag-rel", {x, y, duration, button});
        },
        drag: async (x = null, y = null, duration = null, button = null) => {
            checkAll([x, 0, null], [y, 0, null], [duration, 0, null], [button, "", null]);
            checkArr(button, MouseButtons, "mouse button");
            await send("main", "drag", {x, y, duration, button});
        },
    });
    _promise();
})();