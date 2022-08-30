/*type AutoGuiOptions = {
    extension?: "exe",
    debug?: boolean | ((text: string) => void)
};

type AutoGuiDeprecatedOptions = {
    extension?: "cmd",
    debug?: boolean | ((text: string) => void)
};*/

type MouseButton = "left" | "right" | "middle";
type KeyboardKey = "\t" | "\n" | "\r" | " " | "!" | "\"" | "#" | "$" | "%" | "&" | "\'" | "(" | ")" | "*" | "+" |
    "," | "-" | "." | "/" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | ":" | ";" | "<" | "=" |
    ">" | "?" | "@" | "[" | "\\" | "]" | "^" | "_" | "`" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" |
    "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "{" |
    "|" | "}" | "~" | "accept" | "add" | "alt" | "altleft" | "altright" | "apps" | "backspace" | "browserback" |
    "browserfavorites" | "browserforward" | "browserhome" | "browserrefresh" | "browsersearch" | "browserstop" |
    "capslock" | "clear" | "convert" | "ctrl" | "ctrlleft" | "ctrlright" | "decimal" | "del" | "delete" |
    "divide" | "down" | "end" | "enter" | "esc" | "escape" | "execute" | "f1" | "f10" | "f11" | "f12" | "f13" |
    "f14" | "f15" | "f16" | "f17" | "f18" | "f19" | "f2" | "f20" | "f21" | "f22" | "f23" | "f24" | "f3" | "f4" |
    "f5" | "f6" | "f7" | "f8" | "f9" | "final" | "fn" | "hanguel" | "hangul" | "hanja" | "help" | "home" |
    "insert" | "junja" | "kana" | "kanji" | "launchapp1" | "launchapp2" | "launchmail" | "launchmediaselect" |
    "left" | "modechange" | "multiply" | "nexttrack" | "nonconvert" | "num0" | "num1" | "num2" | "num3" | "num4" |
    "num5" | "num6" | "num7" | "num8" | "num9" | "numlock" | "pagedown" | "pageup" | "pause" | "pgdn" | "pgup" |
    "playpause" | "prevtrack" | "print" | "printscreen" | "prntscrn" | "prtsc" | "prtscr" | "return" | "right" |
    "scrolllock" | "select" | "separator" | "shift" | "shiftleft" | "shiftright" | "sleep" | "space" | "stop" |
    "subtract" | "tab" | "up" | "volumedown" | "volumemute" | "volumeup" | "win" | "winleft" | "winright" |
    "yen" | "command" | "option" | "optionleft" | "optionright";
type RectRegion = [number, number, number, number] | { left: number, top: number, width: number, height: number };
type PILImage = {
    mode: "RGB",
    size: { width: number, height: number }
};

/*export function init(options?: AutoGuiOptions): Promise<void>;
/**
 * @deprecated
 * @param options
 * /
export function init(options?: AutoGuiDeprecatedOptions): Promise<void>;*/

export function _send(action: string, object: Object): Promise<string[]>;

export function position(): Promise<{ x: number, y: number }>;

export function size(): Promise<{ width: number, height: number }>;

export function isOnScreen(x: number, y: number): Promise<boolean>;

export function setPause(seconds: number): Promise<void>;

export function setFailSafe(value: boolean): Promise<void>;

export function moveTo(x?: number | null, y?: number | null, duration?: number | null): Promise<void>;

export function move(x?: number | null, y?: number | null, duration?: number | null): Promise<void>;

export function moveRelative(x?: number | null, y?: number | null, duration?: number | null): Promise<void>;

export function click(x?: number | null, y?: number | null, clicks?: number | null, interval?: number | null, button?: MouseButton | null): Promise<void>;

export function vScroll(value: number, x?: number | null, y?: number | null): Promise<void>;

export function hScroll(value: number, x?: number | null, y?: number | null): Promise<void>;

export function mouseDown(button: MouseButton, x?: number | null, y?: number | null): Promise<void>;

export function mouseUp(button: MouseButton, x?: number | null, y?: number | null): Promise<void>;

export function typeString(text: string, interval?: number | null): Promise<void>;

export function typeKeys(keys: KeyboardKey[], interval?: number | null): Promise<void>;

export function keyDown(key: KeyboardKey): Promise<void>;

export function keyUp(key: KeyboardKey): Promise<void>;

export function press(key: KeyboardKey): Promise<void>;

export function alert(text?: string | null, title?: string | null, button?: string | null): Promise<void>;

export function confirm(text?: string | null, title?: string | null, buttons?: string[] | null): Promise<string | null>;

export function prompt(text?: string | null, title?: string | null, default_?: string | null): Promise<string | null>;

export function password(text?: string | null, title?: string | null, default_?: string | null, mask?: string | null): Promise<string | null>;

export function screenshot(file?: string | null, region?: RectRegion | null): Promise<PILImage>;

export function locateOnScreen(file?: string | null): Promise<PILImage | null>;

export function locateAllOnScreen(file?: string | null): Promise<PILImage | null>;

export function locateCenterOnScreen(file?: string | null): Promise<PILImage | null>;

export function dragTo(x?: number | null, y?: number | null, duration?: number | null, button?: MouseButton | null): Promise<void>;

export function dragRelative(x?: number | null, y?: number | null, duration?: number | null, button?: MouseButton | null): Promise<void>;

export function drag(x?: number | null, y?: number | null, duration?: number | null, button?: MouseButton | null): Promise<void>;
