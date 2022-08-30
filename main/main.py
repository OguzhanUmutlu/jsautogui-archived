import json
import pyautogui

while True:
    # TODO: Tween/Easing Functions
    inp = input()
    _json = json.loads(inp)
    if "id" not in _json or "action" not in _json:
        continue
    _id = _json["id"]
    action = _json["action"]


    def g(n):
        if n not in _json:
            return None
        return _json[n]


    def pr(st):
        print(f"{_id} {st}")


    def print_point(point):
        pr(":".join(map(str, point)))


    def none_int(i):
        return None if i == "None" else int(i)


    def none_str(i):
        return None if i == "None" else str(i)


    if action == "position":
        print_point(pyautogui.position())
    elif action == "size":
        print_point(pyautogui.size())
    elif action == "on-screen":
        pr(pyautogui.onScreen(g("x"), g("y")))
    elif action == "PAUSE":
        pyautogui.PAUSE = g("value")
    elif action == "FAILSAFE":
        pyautogui.FAILSAFE = g("value")
    elif action == "move-to":
        pyautogui.moveTo(g("x"), g("y"), duration=g("duration"))
    elif action == "move":
        pyautogui.move(g("x"), g("y"), duration=g("duration"))
    elif action == "move-rel":
        pyautogui.moveRel(g("x"), g("y"), duration=g("duration"))
    elif action == "click":
        pyautogui.click(x=g("x"), y=g("y"), clicks=g("clicks"), interval=g("interval"), button=g("button"))
    elif action == "v-scroll":
        pyautogui.vscroll(g("value"), x=g("x"), y=g("y"))
    elif action == "h-scroll":
        pyautogui.hscroll(g("value"), x=g("x"), y=g("y"))
    elif action == "mouse-down":
        pyautogui.mouseDown(x=g("x"), y=g("y"), button=g("button"))
    elif action == "mouse-up":
        pyautogui.mouseUp(x=g("x"), y=g("y"), button=g("button"))
    elif action == "type-write":
        pyautogui.typewrite(g("text"), interval=g("interval"))  # text can be a string or an array of strings
    elif action == "hotkey":
        pyautogui.hotkey(*g("keys"), interval=g("interval"))
    elif action == "key-down":
        pyautogui.keyDown(g("key"))
    elif action == "key-up":
        pyautogui.keyUp(g("key"))
    elif action == "press":
        pyautogui.press(g("key"))
    elif action == "alert-js":
        pyautogui.alert(g("text"))
    elif action == "alert":
        pyautogui.alert(text=g("text"), title=g("title"), button=g("button"))
    elif action == "confirm-js":
        pr(pyautogui.confirm(g("text")))
    elif action == "confirm":
        res = pyautogui.confirm(text=g("text"), title=g("title"), buttons=g("buttons"))
        if res is None:
            pr("fail:None")
        else:
            pr("success:" + res)
    elif action == "prompt-js":
        pr(pyautogui.prompt(g("text")))
    elif action == "prompt":
        res = pyautogui.prompt(text=g("text"), title=g("title"), default=g("default"))
        if res is None:
            pr("fail:None")
        else:
            pr("success:" + res)
    elif action == "password-js":
        pr(pyautogui.password(g("text")))
    elif action == "password":
        res = pyautogui.password(text=g("text"), title=g("title"), default=g("default"), mask=g("mask"))
        if res is None:
            pr("fail:None")
        else:
            pr("success:" + res)
    elif action == "screenshot":
        pr(pyautogui.screenshot(g("file"), region=g("region")))
    elif action == "locate-on-screen":
        try:
            print_point(pyautogui.locateOnScreen(g("file")))
        except:
            pr("fail")
            pass
    elif action == "locate-all-on-screen":
        try:
            for p in pyautogui.locateAllOnScreen(g("file")):
                print_point(p)
        except:
            pr("fail")
            pass
    elif action == "locate-center-on-screen":
        try:
            print_point(pyautogui.locateCenterOnScreen(g("file")))
        except:
            pr("fail")
            pass
    elif action == "drag-to":
        pyautogui.dragTo(x=g("x"), y=g("y"), duration=g("duration"), button=g("button"))
    elif action == "drag-rel":
        pyautogui.dragRel(x=g("x"), y=g("y"), duration=g("duration"), button=g("button"))
    elif action == "drag":
        pyautogui.drag(x=g("x"), y=g("y"), duration=g("duration"), button=g("button"))
    else:
        pass
    pr("success")
